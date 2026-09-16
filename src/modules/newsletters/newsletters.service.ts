import { dataStore } from "@/src/shared/config/dataStore";
import { emailService } from "@/src/shared/services/emailService";

export class NewslettersService {
  static async subscribe(email: string, source?: string) {
    const existing = dataStore.newsletters.find((n) => n.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { email, message: "You are already subscribed to GQT internship alerts." };
    }

    const newSub = {
      id: `sub_${Date.now()}`,
      email,
      source: source || "FOOTER",
      status: "SUBSCRIBED",
      createdAt: new Date().toISOString(),
    };

    dataStore.newsletters.push(newSub);

    emailService.enqueueEmail({
      to: email,
      subject: "Subscribed to GQT & VTU Internship Notifications",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Thank you for subscribing!</h2>
          <p>You will now receive instant notifications when top tech companies publish VTU-accredited engineering internships.</p>
        </div>
      `,
    });

    return newSub;
  }
}
