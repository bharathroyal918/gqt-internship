import { dataStore } from "@/src/shared/config/dataStore";
import { emailService } from "@/src/shared/services/emailService";

export class ContactService {
  static async submitEnquiry(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) {
    const enquiry = {
      id: `enq_${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject,
      message: data.message,
      status: "NEW",
      createdAt: new Date().toISOString(),
    };

    dataStore.contactEnquiries.unshift(enquiry);

    // Send confirmation email
    emailService.enqueueEmail({
      to: data.email,
      subject: `Enquiry Received: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Thank you for contacting Global Quest Technologies</h2>
          <p>Hello ${data.name},</p>
          <p>We have received your message regarding: <strong>${data.subject}</strong></p>
          <p>Our academic relations and placement support team will review your query and respond within 24 business hours.</p>
        </div>
      `,
    });

    return enquiry;
  }

  static async list() {
    return dataStore.contactEnquiries;
  }
}
