import { dataStore } from "@/src/shared/config/dataStore";

export class SearchService {
  static async globalSearch(query: string, isAdmin: boolean = false) {
    if (!query || query.trim().length < 2) {
      return {
        internships: [],
        companies: [],
        colleges: [],
        circulars: [],
        students: [],
      };
    }

    const q = query.toLowerCase().trim();

    const internships = dataStore.internships
      .filter(
        (i) =>
          i.title?.toLowerCase().includes(q) ||
          i.company?.toLowerCase().includes(q) ||
          i.location?.toLowerCase().includes(q) ||
          i.skills?.some((s: string) => s.toLowerCase().includes(q))
      )
      .slice(0, 5)
      .map((i) => ({
        type: "internship",
        id: i.id,
        title: i.title,
        subtitle: `${i.company} • ${i.location}`,
        url: `/internships/${i.id}`,
      }));

    const companies = dataStore.companies
      .filter((c) => c.name?.toLowerCase().includes(q) || c.domain?.toLowerCase().includes(q))
      .slice(0, 5)
      .map((c) => ({
        type: "company",
        id: c.id,
        title: c.name,
        subtitle: `${c.domain} • ${c.location}`,
        url: `/companies/${c.id}`,
      }));

    const colleges = dataStore.colleges
      .filter((c) => c.name?.toLowerCase().includes(q) || c.code?.toLowerCase().includes(q))
      .slice(0, 5)
      .map((c) => ({
        type: "college",
        id: c.id,
        title: c.name,
        subtitle: `${c.code} • ${c.district}`,
        url: `/colleges/${c.id}`,
      }));

    const circulars = dataStore.circulars
      .filter((c) => c.title?.toLowerCase().includes(q) || c.refNo?.toLowerCase().includes(q))
      .slice(0, 5)
      .map((c) => ({
        type: "circular",
        id: c.id,
        title: c.title,
        subtitle: `${c.refNo} • ${c.date}`,
        url: `/circulars/${c.id}`,
      }));

    let students: any[] = [];
    if (isAdmin) {
      students = dataStore.applicants
        .filter((a) => a.name?.toLowerCase().includes(q) || a.usn?.toLowerCase().includes(q))
        .slice(0, 5)
        .map((a) => ({
          type: "student",
          id: a.id,
          title: a.name,
          subtitle: `${a.usn} • ${a.college}`,
          url: `/admin/applications`,
        }));
    }

    return {
      query,
      results: {
        internships,
        companies,
        colleges,
        circulars,
        students,
      },
      totalMatches:
        internships.length + companies.length + colleges.length + circulars.length + students.length,
    };
  }
}
