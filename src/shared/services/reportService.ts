export class ReportService {
  static generateCsv(data: Record<string, any>[], headers?: { key: string; label: string }[]): string {
    if (!data || data.length === 0) return "";

    const cols = headers || Object.keys(data[0]).map((k) => ({ key: k, label: k }));
    const headerRow = cols.map((c) => `"${c.label.replace(/"/g, '""')}"`).join(",");

    const rows = data.map((item) =>
      cols
        .map((c) => {
          const val = item[c.key];
          if (val === null || val === undefined) return '""';
          if (typeof val === "object") return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
          return `"${String(val).replace(/"/g, '""')}"`;
        })
        .join(",")
    );

    return [headerRow, ...rows].join("\r\n");
  }
}
