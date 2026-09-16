const http = require('http');

const BASE_URL = 'http://localhost:3000';

function makeRequest(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        let json = null;
        try {
          json = JSON.parse(data);
        } catch {
          json = data;
        }
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: json,
        });
      });
    });

    req.on('error', reject);
    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runTestSuite() {
  console.log('================================================================');
  console.log('🚀 GQT Enterprise Backend Verification Test Suite');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ [FAIL] ${name}: ${err.message}`);
      failed++;
    }
  }

  // 1. Health Endpoints
  await test('GET /api/health - System Diagnostics', async () => {
    const res = await makeRequest('GET', '/api/health');
    if (res.statusCode !== 200 || res.data.status !== 'healthy') {
      throw new Error(`Expected healthy status, got HTTP ${res.statusCode}`);
    }
  });

  await test('GET /api/docs - OpenAPI 3.0 Documentation', async () => {
    const res = await makeRequest('GET', '/api/docs');
    if (res.statusCode !== 200 || !res.data.openapi) {
      throw new Error(`Expected OpenAPI specification, got HTTP ${res.statusCode}`);
    }
  });

  // 2. Authentication Flow
  let adminToken = '';
  let studentToken = '';

  await test('POST /api/v1/auth/login - Super Admin Login', async () => {
    const res = await makeRequest('POST', '/api/v1/auth/login', {
      email: 'admin@gqtech.in',
      password: 'Admin@123',
    });
    if (res.statusCode !== 200 || !res.data.success || !res.data.data.token) {
      throw new Error(`Admin login failed: ${JSON.stringify(res.data)}`);
    }
    adminToken = res.data.data.token;
  });

  await test('POST /api/v1/auth/login - Student Login', async () => {
    const res = await makeRequest('POST', '/api/v1/auth/login', {
      email: 'student@gqtech.in',
      password: 'Admin@123',
    });
    if (res.statusCode !== 200 || !res.data.success || !res.data.data.token) {
      throw new Error(`Student login failed: ${JSON.stringify(res.data)}`);
    }
    studentToken = res.data.data.token;
  });

  await test('POST /api/v1/auth/send-otp - Mobile / Email OTP Dispatch', async () => {
    const res = await makeRequest('POST', '/api/v1/auth/send-otp', {
      identifier: 'ananya.sharma@rvce.edu.in',
      type: 'LOGIN',
    });
    if (res.statusCode !== 200 || !res.data.success) {
      throw new Error(`Send OTP failed: ${JSON.stringify(res.data)}`);
    }
  });

  await test('POST /api/v1/auth/verify-otp - OTP Verification', async () => {
    const res = await makeRequest('POST', '/api/v1/auth/verify-otp', {
      identifier: 'ananya.sharma@rvce.edu.in',
      otp: '849201',
      type: 'LOGIN',
    });
    if (res.statusCode !== 200 || !res.data.success || !res.data.data.token) {
      throw new Error(`Verify OTP failed: ${JSON.stringify(res.data)}`);
    }
  });

  await test('GET /api/v1/auth/session - Authenticated Session with Token', async () => {
    const res = await makeRequest('GET', '/api/v1/auth/session', null, {
      Authorization: `Bearer ${adminToken}`,
    });
    if (res.statusCode !== 200 || res.data.data.user.role !== 'SUPER_ADMIN') {
      throw new Error(`Session invalid: ${JSON.stringify(res.data)}`);
    }
  });

  // 3. Internships API
  await test('GET /api/v1/internships - Public Directory with Pagination', async () => {
    const res = await makeRequest('GET', '/api/v1/internships?page=1&limit=6&mode=Hybrid');
    if (res.statusCode !== 200 || !Array.isArray(res.data.data) || res.data.data.length === 0) {
      throw new Error(`Failed to list internships: ${JSON.stringify(res.data)}`);
    }
  });

  await test('GET /api/v1/internships/gqt-int-001 - Full Role Details', async () => {
    const res = await makeRequest('GET', '/api/v1/internships/gqt-int-001');
    if (res.statusCode !== 200 || res.data.data.id !== 'gqt-int-001') {
      throw new Error(`Internship details mismatch: ${JSON.stringify(res.data)}`);
    }
  });

  await test('GET /api/v1/internships/gqt-int-001/related - Related Internships', async () => {
    const res = await makeRequest('GET', '/api/v1/internships/gqt-int-001/related');
    if (res.statusCode !== 200 || !Array.isArray(res.data.data)) {
      throw new Error(`Failed to get related internships: ${JSON.stringify(res.data)}`);
    }
  });

  // 4. Applications Pipeline & RBAC
  await test('POST /api/v1/applications - Candidate Applies with Student Token', async () => {
    const res = await makeRequest(
      'POST',
      '/api/v1/applications',
      {
        internshipId: 'gqt-int-002',
        coverLetter: 'Passionate about cloud architecture and distributed computing.',
      },
      {
        Authorization: `Bearer ${studentToken}`,
      }
    );
    if (res.statusCode !== 201 && res.statusCode !== 409) {
      throw new Error(`Apply failed: ${JSON.stringify(res.data)}`);
    }
  });

  await test('PATCH /api/v1/applications/app-001/status - Role Protection Check', async () => {
    // 1. Without token -> 401 Unauthorized
    const unauthRes = await makeRequest('PATCH', '/api/v1/applications/app-001/status', {
      status: 'SHORTLISTED',
    });
    if (unauthRes.statusCode !== 401) {
      throw new Error(`Expected 401 for unauthenticated request, got ${unauthRes.statusCode}`);
    }

    // 2. With student token -> 403 Forbidden (RBAC works!)
    const studentRes = await makeRequest(
      'PATCH',
      '/api/v1/applications/app-001/status',
      { status: 'SHORTLISTED' },
      { Authorization: `Bearer ${studentToken}` }
    );
    if (studentRes.statusCode !== 403) {
      throw new Error(`Expected 403 Forbidden for student role, got ${studentRes.statusCode}`);
    }

    // 3. With admin token -> 200 OK (Allowed!)
    const adminRes = await makeRequest(
      'PATCH',
      '/api/v1/applications/app-001/status',
      { status: 'SHORTLISTED', remarks: 'Strong DSA and React foundations.' },
      { Authorization: `Bearer ${adminToken}` }
    );
    if (adminRes.statusCode !== 200) {
      throw new Error(`Admin update status failed: ${JSON.stringify(adminRes.data)}`);
    }
  });

  // 5. Certificates & Verification
  await test('GET /api/v1/certificates/verify/:code - Public VTU Verification', async () => {
    const res = await makeRequest(
      'GET',
      '/api/v1/certificates/verify/e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    );
    if (res.statusCode !== 200 || !res.data.data.verified) {
      throw new Error(`Certificate verification failed: ${JSON.stringify(res.data)}`);
    }
  });

  // 6. Companies & Colleges
  await test('GET /api/v1/companies - Enterprise Partner Directory', async () => {
    const res = await makeRequest('GET', '/api/v1/companies?tier=Enterprise');
    if (res.statusCode !== 200 || !Array.isArray(res.data.data)) {
      throw new Error(`Companies listing failed: ${JSON.stringify(res.data)}`);
    }
  });

  await test('GET /api/v1/colleges - VTU Affiliated Colleges List', async () => {
    const res = await makeRequest('GET', '/api/v1/colleges?district=Bangalore');
    if (res.statusCode !== 200 || !Array.isArray(res.data.data)) {
      throw new Error(`Colleges listing failed: ${JSON.stringify(res.data)}`);
    }
  });

  await test('GET /api/v1/colleges/export - Student Records CSV Export', async () => {
    const res = await makeRequest('GET', '/api/v1/colleges/export');
    if (res.statusCode !== 200 || typeof res.data !== 'string' || !res.data.includes('FullName')) {
      throw new Error(`CSV Export failed`);
    }
  });

  // 7. Circulars & Notifications
  await test('GET /api/v1/circulars - VTU Directives Listing', async () => {
    const res = await makeRequest('GET', '/api/v1/circulars?category=Latest');
    if (res.statusCode !== 200 || !Array.isArray(res.data.data)) {
      throw new Error(`Circulars list failed: ${JSON.stringify(res.data)}`);
    }
  });

  await test('GET /api/v1/notifications - In-App Alerts', async () => {
    const res = await makeRequest('GET', '/api/v1/notifications');
    if (res.statusCode !== 200 || !Array.isArray(res.data.data)) {
      throw new Error(`Notifications list failed: ${JSON.stringify(res.data)}`);
    }
  });

  // 8. Global Search
  await test('GET /api/v1/search - Multi-Entity Global Search', async () => {
    const res = await makeRequest('GET', '/api/v1/search?q=Bangalore');
    if (res.statusCode !== 200 || !res.data.data.results) {
      throw new Error(`Global search failed: ${JSON.stringify(res.data)}`);
    }
  });

  // 9. Dashboard Analytics
  await test('GET /api/v1/dashboard/student - Student KPI & Timeline', async () => {
    const res = await makeRequest('GET', '/api/v1/dashboard/student', null, {
      Authorization: `Bearer ${studentToken}`,
    });
    if (res.statusCode !== 200 || !res.data.data.kpi) {
      throw new Error(`Student dashboard failed: ${JSON.stringify(res.data)}`);
    }
  });

  await test('GET /api/v1/dashboard/admin - Executive Analytics with Admin Token', async () => {
    const res = await makeRequest('GET', '/api/v1/dashboard/admin', null, {
      Authorization: `Bearer ${adminToken}`,
    });
    if (res.statusCode !== 200 || !res.data.data.charts) {
      throw new Error(`Admin dashboard failed: ${JSON.stringify(res.data)}`);
    }
  });

  // 10. Reports Engine
  await test('GET /api/v1/reports/export - Downloadable CSV Reports', async () => {
    const res = await makeRequest('GET', '/api/v1/reports/export?type=applications&format=csv', null, {
      Authorization: `Bearer ${adminToken}`,
    });
    if (res.statusCode !== 200 || typeof res.data !== 'string' || !res.data.includes('CandidateName')) {
      throw new Error(`Reports export failed`);
    }
  });

  console.log('\n================================================================');
  console.log(`📊 Test Results: ${passed} Passed, ${failed} Failed`);
  console.log('================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
