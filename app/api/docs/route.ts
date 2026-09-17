import { NextResponse } from "next/server";

export async function GET() {
  const openApiSpec = {
    openapi: "3.0.3",
    info: {
      title: "Global Quest Technologies (GQT) - Enterprise Internship Portal API",
      version: "1.0.0",
      description:
        "Enterprise-grade REST API powering the GQT Student & College Internship Portal (internships.gqtech.in) and GQT Executive Admin Portal (admin.gqtech.in). Features role-based access control, BullMQ background queues, cryptographic certificate verification, and real-time VTU affiliation syncing.",
      contact: {
        name: "Global Quest Technologies",
        email: "support@gqtech.in",
        url: "https://gqtech.in",
      },
    },
    servers: [
      {
        url: "/api/v1",
        description: "Next.js 15 App Router Production API Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Access token passed via Authorization: Bearer <token> header or HTTP-only cookie.",
        },
      },
      schemas: {
        ApiResponseEnvelope: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Operation successful" },
            data: { type: "object", nullable: true },
            pagination: {
              type: "object",
              nullable: true,
              properties: {
                page: { type: "integer", example: 1 },
                limit: { type: "integer", example: 10 },
                total: { type: "integer", example: 100 },
                totalPages: { type: "integer", example: 10 },
              },
            },
            errors: { type: "object", nullable: true },
            timestamp: { type: "string", format: "date-time" },
            requestId: { type: "string", example: "req_98b7c210" },
          },
        },
      },
    },
    paths: {
      "/auth/login": {
        post: {
          summary: "Authenticate user and issue JWT tokens",
          tags: ["Authentication"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: { type: "string", format: "email", example: "admin@gqtech.in" },
                    password: { type: "string", example: "Admin@123" },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "Successful login with access and refresh tokens set in cookies" },
            "401": { description: "Invalid credentials" },
          },
        },
      },
      "/auth/register": {
        post: {
          summary: "Register a new student, college placement officer, or company HR",
          tags: ["Authentication"],
          responses: {
            "201": { description: "User registered successfully" },
          },
        },
      },
      "/auth/send-otp": {
        post: {
          summary: "Generate and dispatch a 6-digit OTP code to email or WhatsApp",
          tags: ["Authentication"],
        },
      },
      "/auth/verify-otp": {
        post: {
          summary: "Verify 6-digit OTP code for passwordless login",
          tags: ["Authentication"],
        },
      },
      "/auth/session": {
        get: {
          summary: "Retrieve active authenticated session and permissions",
          tags: ["Authentication"],
          security: [{ bearerAuth: [] }],
        },
      },
      "/internships": {
        get: {
          summary: "Search, filter, and paginate verified VTU internships",
          tags: ["Internships"],
          parameters: [
            { name: "page", in: "query", schema: { type: "integer" } },
            { name: "limit", in: "query", schema: { type: "integer" } },
            { name: "category", in: "query", schema: { type: "string" } },
            { name: "mode", in: "query", schema: { type: "string" } },
            { name: "location", in: "query", schema: { type: "string" } },
            { name: "minStipend", in: "query", schema: { type: "integer" } },
            { name: "search", in: "query", schema: { type: "string" } },
          ],
          responses: {
            "200": { description: "List of internships matching filter criteria" },
          },
        },
        post: {
          summary: "Create a new corporate internship opportunity (Admin / HR)",
          tags: ["Internships"],
          security: [{ bearerAuth: [] }],
          responses: {
            "201": { description: "Internship posted and indexed" },
          },
        },
      },
      "/internships/{id}": {
        get: {
          summary: "Get full details of an internship posting",
          tags: ["Internships"],
        },
        put: {
          summary: "Update internship posting parameters",
          tags: ["Internships"],
          security: [{ bearerAuth: [] }],
        },
        delete: {
          summary: "Delete an internship opportunity (Admin only)",
          tags: ["Internships"],
          security: [{ bearerAuth: [] }],
        },
      },
      "/applications": {
        get: {
          summary: "List candidate applications with multi-filter and triage options",
          tags: ["Applications"],
          security: [{ bearerAuth: [] }],
        },
        post: {
          summary: "Submit application for an internship role (Student only)",
          tags: ["Applications"],
          security: [{ bearerAuth: [] }],
        },
      },
      "/applications/{id}/status": {
        patch: {
          summary: "Transition application status (Shortlist, Select, Reject, Offer)",
          tags: ["Applications"],
          security: [{ bearerAuth: [] }],
        },
      },
      "/certificates/verify/{code}": {
        get: {
          summary: "Public cryptographic verification of an official VTU internship certificate",
          tags: ["Certificates"],
          responses: {
            "200": { description: "Certificate authenticated with cryptographic SHA-256 hash" },
            "404": { description: "Invalid certificate code" },
          },
        },
      },
      "/search": {
        get: {
          summary: "Global search across internships, companies, colleges, and circulars",
          tags: ["Search"],
          parameters: [{ name: "q", in: "query", required: true, schema: { type: "string" } }],
        },
      },
      "/dashboard/student": {
        get: {
          summary: "Retrieve student dashboard KPI metrics, interviews, and progress",
          tags: ["Dashboard"],
          security: [{ bearerAuth: [] }],
        },
      },
      "/dashboard/admin": {
        get: {
          summary: "Retrieve GQT executive analytics, Recharts datasets, and KPI cards",
          tags: ["Dashboard"],
          security: [{ bearerAuth: [] }],
        },
      },
      "/reports/export": {
        get: {
          summary: "Download tabular datasets as CSV or JSON (Applications, Colleges, Internships)",
          tags: ["Reports"],
          security: [{ bearerAuth: [] }],
        },
      },
    },
  };

  return NextResponse.json(openApiSpec, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
