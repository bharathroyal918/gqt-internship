import { dataStore } from "@/src/shared/config/dataStore";

export class DashboardService {
  static async getStudentDashboard(userId: string) {
    const studentApps = dataStore.applicants;

    const totalApplications = 4;
    const underReview = 2;
    const interviewsScheduled = 1;
    const offersReceived = 1;

    const upcomingInterview = {
      role: "Generative AI Research Intern",
      company: "Titan Company Ltd",
      round: "Technical Evaluation Round 1",
      date: "Tomorrow, Sep 17, 2026",
      time: "11:30 AM IST",
      interviewer: "Siddharth Rao (Principal AI Engineer)",
      meetLink: "https://meet.google.com/gqt-vtu-interview",
      duration: "45 Mins",
    };

    const recentActivity = [
      { id: "act-1", title: "Interview Call Letter Generated", desc: "Titan Company Ltd scheduled Technical Round 1 for tomorrow at 11:30 AM IST.", date: "Today, 10:45 AM", type: "success" },
      { id: "act-2", title: "Application Under Review", desc: "Infosys Labs talent team is screening your resume for Cloud Infrastructure Engineer role.", date: "Yesterday", type: "info" },
      { id: "act-3", title: "VTU Internship Certificate Generated", desc: "Cryptographic credential issued for Summer AI Research Internship.", date: "Aug 30, 2026", type: "success" },
    ];

    return {
      kpi: {
        totalApplications,
        underReview,
        interviewsScheduled,
        offersReceived,
      },
      upcomingInterview,
      recentActivity,
      profileReadiness: 85,
    };
  }

  static async getAdminDashboard() {
    const totalInternships = dataStore.internships.length;
    const totalApplicants = dataStore.applicants.length;
    const verifiedCompanies = dataStore.companies.length;
    const affiliatedColleges = dataStore.colleges.length;

    const chartMonthlyApplicants = [
      { month: "Jan", applicants: 420, shortlisted: 180, placed: 120 },
      { month: "Feb", applicants: 680, shortlisted: 310, placed: 240 },
      { month: "Mar", applicants: 950, shortlisted: 440, placed: 380 },
      { month: "Apr", applicants: 1200, shortlisted: 620, placed: 510 },
      { month: "May", applicants: 1850, shortlisted: 890, placed: 740 },
      { month: "Jun", applicants: 2400, shortlisted: 1150, placed: 980 },
      { month: "Jul", applicants: 3100, shortlisted: 1480, placed: 1320 },
      { month: "Aug", applicants: 3850, shortlisted: 1890, placed: 1650 },
      { month: "Sep", applicants: 4620, shortlisted: 2240, placed: 1980 },
    ];

    const chartDomainDistribution = [
      { name: "Artificial Intelligence", value: 35, color: "#0B5ED7" },
      { name: "Full Stack & Cloud", value: 25, color: "#021B49" },
      { name: "Embedded & IoT", value: 15, color: "#16A34A" },
      { name: "Cybersecurity", value: 15, color: "#F59E0B" },
      { name: "Data Engineering", value: 10, color: "#8B5CF6" },
    ];

    const chartHiringVolume = [
      { company: "Infosys Labs", hired: 142 },
      { company: "TCS Research", hired: 128 },
      { company: "Bosch Engg", hired: 94 },
      { company: "Wipro Digital", hired: 86 },
      { company: "Titan Co", hired: 72 },
    ];

    const recentApplications = dataStore.applicants.slice(0, 6);

    return {
      kpi: {
        totalInternships,
        totalApplicants: "4,620+",
        verifiedCompanies,
        affiliatedColleges,
        placementRate: "94.8%",
        certificatesIssued: "3,410+",
      },
      charts: {
        monthlyApplicants: chartMonthlyApplicants,
        domainDistribution: chartDomainDistribution,
        hiringVolume: chartHiringVolume,
      },
      recentApplications,
    };
  }
}
