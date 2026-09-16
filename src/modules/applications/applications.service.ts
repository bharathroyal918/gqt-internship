import { dataStore } from "@/src/shared/config/dataStore";
import { emailService } from "@/src/shared/services/emailService";
import { whatsappService } from "@/src/shared/services/whatsappService";

export class ApplicationsService {
  static async apply(data: {
    studentId: string;
    internshipId: string;
    coverLetter?: string;
    resumeSnapshotUrl?: string;
  }) {
    const internship = dataStore.internships.find((i) => i.id === data.internshipId);
    if (!internship) {
      throw { statusCode: 404, message: "Internship role not found" };
    }

    const studentUser = dataStore.users.find((u) => u.id === data.studentId);
    const existing = dataStore.applicants.find(
      (a) =>
        (a.id === data.studentId || a.name === studentUser?.fullName) &&
        a.roleApplied === internship.title
    );

    if (existing) {
      throw { statusCode: 409, message: "You have already applied for this internship" };
    }

    const newApplication = {
      id: `app_${Date.now()}`,
      name: studentUser?.fullName || "Candidate Applicant",
      usn: studentUser?.usn || "1RV23CS099",
      college: "R.V. College of Engineering (RVCE), Bangalore",
      roleApplied: internship.title,
      company: internship.company,
      appliedDate: new Date().toISOString().split("T")[0],
      status: "Under Review",
      cgpa: studentUser?.cgpa || 8.5,
      branch: studentUser?.branch || "Computer Science",
      resumeUrl: data.resumeSnapshotUrl || "https://res.cloudinary.com/gqt/resumes/mock_resume.pdf",
      coverLetter: data.coverLetter || "",
      timeline: [
        {
          status: "Applied",
          date: new Date().toISOString().split("T")[0],
          notes: "Application submitted successfully.",
        },
      ],
      interviews: [],
    };

    dataStore.applicants.unshift(newApplication);

    // Queue email confirmation
    if (studentUser?.email) {
      emailService.enqueueEmail({
        to: studentUser.email,
        subject: `Application Received: ${internship.title} at ${internship.company}`,
        html: emailService.getApplicationStatusEmailTemplate(
          studentUser.fullName,
          internship.title,
          "Under Review",
          "Your profile and resume have been submitted to the corporate recruitment team."
        ),
      });
    }

    // Queue WhatsApp alert
    if (studentUser?.phone) {
      whatsappService.enqueueMessage({
        to: studentUser.phone,
        templateName: "internship_applied_ack",
        parameters: [
          { type: "text", text: studentUser.fullName },
          { type: "text", text: internship.title },
        ],
      });
    }

    // In-app notification
    dataStore.notifications.unshift({
      id: `notif_${Date.now()}`,
      title: "Application Submitted",
      description: `Your application for ${internship.title} at ${internship.company} has been received.`,
      category: "Application",
      date: "Just now",
      read: false,
    });

    return newApplication;
  }

  static async list(params: {
    page: number;
    limit: number;
    skip: number;
    status?: string;
    search?: string;
    studentId?: string;
  }) {
    let list = [...dataStore.applicants];

    if (params.status && params.status !== "All") {
      list = list.filter((a) => a.status?.toLowerCase() === params.status?.toLowerCase());
    }

    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (a) =>
          a.name?.toLowerCase().includes(q) ||
          a.usn?.toLowerCase().includes(q) ||
          a.college?.toLowerCase().includes(q) ||
          a.roleApplied?.toLowerCase().includes(q)
      );
    }

    const total = list.length;
    const paginated = list.slice(params.skip, params.skip + params.limit);

    return {
      items: paginated,
      pagination: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages: Math.ceil(total / params.limit) || 1,
      },
    };
  }

  static async getById(id: string) {
    const app = dataStore.applicants.find((a) => a.id === id);
    if (!app) {
      throw { statusCode: 404, message: "Application record not found" };
    }
    return app;
  }

  static async updateStatus(id: string, status: string, remarks?: string, userId?: string) {
    const app = dataStore.applicants.find((a) => a.id === id);
    if (!app) {
      throw { statusCode: 404, message: "Application record not found" };
    }

    const oldStatus = app.status;
    app.status = status;
    if (!app.timeline) app.timeline = [];
    app.timeline.push({
      status,
      date: new Date().toISOString().split("T")[0],
      notes: remarks || `Status changed to ${status}`,
    });

    // Notify candidate
    dataStore.notifications.unshift({
      id: `notif_${Date.now()}`,
      title: "Application Status Updated",
      description: `Your application for ${app.roleApplied} is now ${status}.`,
      category: "Application",
      date: "Just now",
      read: false,
    });

    // Log audit
    dataStore.auditLogs.unshift({
      id: `aud_${Date.now()}`,
      entity: "Application",
      entityId: id,
      action: "STATUS_CHANGE",
      oldValue: { status: oldStatus },
      newValue: { status, remarks },
      userId,
      timestamp: new Date().toISOString(),
    });

    return app;
  }

  static async scheduleInterview(id: string, interviewData: any, userId?: string) {
    const app = dataStore.applicants.find((a) => a.id === id);
    if (!app) {
      throw { statusCode: 404, message: "Application record not found" };
    }

    const newInterview = {
      id: `int_${Date.now()}`,
      round: interviewData.roundName || "Technical Round 1",
      date: interviewData.date,
      time: interviewData.time || "11:00 AM IST",
      meetingLink: interviewData.meetingLink || "https://meet.google.com/gqt-vtu-interview",
      interviewer: interviewData.interviewerName || "Senior Engineering Lead",
      status: "Scheduled",
    };

    if (!app.interviews) app.interviews = [];
    app.interviews.push(newInterview);
    app.status = "Interview Scheduled";

    return app;
  }
}
