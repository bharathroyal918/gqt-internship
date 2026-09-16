import { dataStore } from "@/src/shared/config/dataStore";

export class StudentsService {
  static async getProfile(userId: string) {
    const user = dataStore.users.find((u) => u.id === userId);
    if (!user) {
      throw { statusCode: 404, message: "Student profile not found" };
    }

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      usn: user.usn || "1RV23CS041",
      college: "R.V. College of Engineering (RVCE), Bangalore",
      branch: user.branch || "Computer Science & Engineering",
      semester: user.semester || 6,
      cgpa: user.cgpa || 8.92,
      resumeUrl: user.resumeUrl || "https://res.cloudinary.com/gqt/resumes/sample_resume.pdf",
      skills: user.skills || ["React", "TypeScript", "Python", "TailwindCSS", "Node.js"],
      projects: user.projects || [
        {
          name: "VTU Smart Attendance AI",
          description: "Facial recognition attendance system using OpenCV and FastAPI.",
          link: "https://github.com/ananyasharma/vtu-attendance",
        },
      ],
      certifications: user.certifications || [
        { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: 2025 },
      ],
      profileCompletion: 85,
    };
  }

  static async updateProfile(userId: string, data: any) {
    const user = dataStore.users.find((u) => u.id === userId);
    if (!user) {
      throw { statusCode: 404, message: "Student not found" };
    }

    Object.assign(user, data);
    return this.getProfile(userId);
  }

  static async getSaved(userId: string) {
    // Return sample saved internships
    return dataStore.internships.slice(0, 3);
  }

  static async toggleSave(userId: string, internshipId: string) {
    return {
      internshipId,
      saved: true,
      message: "Internship bookmark updated",
    };
  }

  static async getCertificates(userId: string) {
    return dataStore.certificates;
  }
}
