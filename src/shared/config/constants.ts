export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  OPERATIONS: "OPERATIONS",
  PLACEMENT_TEAM: "PLACEMENT_TEAM",
  HR: "HR",
  FINANCE: "FINANCE",
  CERTIFICATE_TEAM: "CERTIFICATE_TEAM",
  STUDENT: "STUDENT",
  PLACEMENT_OFFICER: "PLACEMENT_OFFICER",
  COLLEGE_COORDINATOR: "COLLEGE_COORDINATOR",
  COMPANY_HR: "COMPANY_HR",
  MENTOR: "MENTOR",
  TRAINER: "TRAINER",
} as const;

export const PERMISSIONS = {
  VIEW_INTERNSHIPS: "internships:view",
  CREATE_INTERNSHIPS: "internships:create",
  EDIT_INTERNSHIPS: "internships:edit",
  DELETE_INTERNSHIPS: "internships:delete",
  PUBLISH_INTERNSHIPS: "internships:publish",

  VIEW_APPLICATIONS: "applications:view",
  EVALUATE_APPLICATIONS: "applications:evaluate",
  SCHEDULE_INTERVIEWS: "applications:interview",
  ISSUE_OFFERS: "applications:offer",

  MANAGE_COLLEGES: "colleges:manage",
  EXPORT_STUDENTS: "students:export",
  IMPORT_STUDENTS: "students:import",

  ISSUE_CERTIFICATES: "certificates:issue",
  REVOKE_CERTIFICATES: "certificates:revoke",

  PUBLISH_CIRCULARS: "circulars:publish",
  BROADCAST_NOTIFICATIONS: "notifications:broadcast",

  MANAGE_SYSTEM_SETTINGS: "settings:manage",
  VIEW_AUDIT_LOGS: "audit:view",
} as const;

export const COOKIE_NAMES = {
  ACCESS_TOKEN: "gqt_access_token",
  REFRESH_TOKEN: "gqt_refresh_token",
} as const;
