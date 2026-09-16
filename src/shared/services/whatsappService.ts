import { env } from "../config/env";
import { logger } from "../utils/logger";
import { whatsappQueue } from "../queues";

export interface WhatsAppMessagePayload {
  to: string; // phone with country code e.g. "919876543210"
  templateName: string;
  parameters: Array<{ type: "text"; text: string }>;
}

class WhatsAppService {
  async sendMessage(payload: WhatsAppMessagePayload): Promise<boolean> {
    logger.info({ to: payload.to, template: payload.templateName }, "Dispatching WhatsApp Business notification...");

    if (env.NODE_ENV === "development" || env.WHATSAPP_ACCESS_TOKEN.includes("mock")) {
      logger.info(
        `[MOCK WHATSAPP SENT] To: ${payload.to} | Template: ${payload.templateName} | Params: ${JSON.stringify(payload.parameters)}`
      );
      return true;
    }

    try {
      const url = `${env.WHATSAPP_API_URL}/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: payload.to,
          type: "template",
          template: {
            name: payload.templateName,
            language: { code: "en_US" },
            components: [
              {
                type: "body",
                parameters: payload.parameters,
              },
            ],
          },
        }),
      });

      return res.ok;
    } catch (error) {
      logger.error({ error, to: payload.to }, "Failed to send WhatsApp message via Meta Cloud API");
      return false;
    }
  }

  async enqueueMessage(payload: WhatsAppMessagePayload) {
    await whatsappQueue.add("send_whatsapp", payload);
  }
}

export const whatsappService = new WhatsAppService();
