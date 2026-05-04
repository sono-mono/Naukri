const base = "http://localhost:8787";

async function request(method, path, body, token) {
  const response = await fetch(base + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  return { status: response.status, data };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  const checks = [];

  const health = await request("GET", "/health");
  assert(health.status === 200, `Health failed: ${health.status}`);
  checks.push(["GET /health", health.status]);

  const workerPhone = "9000000001";
  const employerPhone = "9000000002";

  const workerOtp = await request("POST", "/auth/request-otp", {
    phone_number: workerPhone,
  });
  assert(workerOtp.status === 200, `Worker OTP request failed: ${workerOtp.status}`);
  assert(workerOtp.data.dev_otp, "Missing worker dev_otp");
  checks.push(["POST /auth/request-otp (worker)", workerOtp.status]);

  const workerVerify = await request("POST", "/auth/verify-otp", {
    phone_number: workerPhone,
    otp: workerOtp.data.dev_otp,
    role: "WORKER",
    language_preference: "en",
  });
  assert(workerVerify.status === 200, `Worker verify failed: ${workerVerify.status}`);
  const workerToken = workerVerify.data.token;
  const workerId = workerVerify.data.user?.user_id;
  assert(workerToken && workerId, "Missing worker token or id");
  checks.push(["POST /auth/verify-otp (worker)", workerVerify.status]);

  const workerProfile = await request(
    "PUT",
    `/api/users/${workerId}/profile`,
    {
      role: "WORKER",
      language_preference: "hi",
      full_name: "Ravi Kumar",
      skills: ["plumbing", "construction"],
      experience_years: 5,
      location: { lat: 18.5204, lng: 73.8567 },
      identity_doc_url: "https://example.com/id/ravi-aadhaar.pdf",
    },
    workerToken,
  );
  assert(workerProfile.status === 200, `Worker profile update failed: ${workerProfile.status}`);
  checks.push(["PUT /api/users/:id/profile (worker)", workerProfile.status]);

  const employerOtp = await request("POST", "/auth/request-otp", {
    phone_number: employerPhone,
  });
  assert(employerOtp.status === 200, `Employer OTP request failed: ${employerOtp.status}`);
  assert(employerOtp.data.dev_otp, "Missing employer dev_otp");
  checks.push(["POST /auth/request-otp (employer)", employerOtp.status]);

  const employerVerify = await request("POST", "/auth/verify-otp", {
    phone_number: employerPhone,
    otp: employerOtp.data.dev_otp,
    role: "EMPLOYER",
    language_preference: "mr",
  });
  assert(employerVerify.status === 200, `Employer verify failed: ${employerVerify.status}`);
  const employerToken = employerVerify.data.token;
  const employerId = employerVerify.data.user?.user_id;
  assert(employerToken && employerId, "Missing employer token or id");
  checks.push(["POST /auth/verify-otp (employer)", employerVerify.status]);

  const employerProfile = await request(
    "PUT",
    `/api/users/${employerId}/profile`,
    {
      role: "EMPLOYER",
      language_preference: "en",
      company_or_individual_name: "Sharma Contractors",
      contact_email: "owner@sharma.example",
    },
    employerToken,
  );
  assert(employerProfile.status === 200, `Employer profile update failed: ${employerProfile.status}`);
  checks.push(["PUT /api/users/:id/profile (employer)", employerProfile.status]);

  const createJob = await request(
    "POST",
    "/api/jobs",
    {
      title: "Need a plumber for urgent repair",
      category: "plumbing",
      description_text: "Fix leakage in bathroom pipeline.",
      location_coordinates: { lat: 18.521, lng: 73.857 },
      payout_amount: 1200,
      payout_type: "DAILY",
    },
    employerToken,
  );
  assert(createJob.status === 201, `Create job failed: ${createJob.status}`);
  const jobId = createJob.data.job?.job_id;
  assert(jobId, "Missing job_id");
  checks.push(["POST /api/jobs", createJob.status]);

  const feed = await request("GET", "/api/jobs/feed", undefined, workerToken);
  assert(feed.status === 200, `Feed failed: ${feed.status}`);
  const foundJob = Array.isArray(feed.data.jobs)
    ? feed.data.jobs.find((item) => item.job_id === jobId)
    : null;
  assert(foundJob, "Created job not found in worker feed");
  checks.push(["GET /api/jobs/feed", feed.status]);

  const apply = await request(
    "POST",
    "/api/applications",
    { job_id: jobId },
    workerToken,
  );
  assert(apply.status === 201, `Apply failed: ${apply.status}`);
  const applicationId = apply.data.application?.application_id;
  assert(applicationId, "Missing application_id");
  checks.push(["POST /api/applications", apply.status]);

  const applicants = await request(
    "GET",
    `/api/jobs/${jobId}/applicants`,
    undefined,
    employerToken,
  );
  assert(applicants.status === 200, `Applicants fetch failed: ${applicants.status}`);
  const foundApplication = Array.isArray(applicants.data.applicants)
    ? applicants.data.applicants.find((item) => item.application_id === applicationId)
    : null;
  assert(foundApplication, "Application missing in applicants list");
  checks.push(["GET /api/jobs/:id/applicants", applicants.status]);

  const updateStatus = await request(
    "PATCH",
    `/api/applications/${applicationId}/status`,
    { status: "SHORTLISTED" },
    employerToken,
  );
  assert(updateStatus.status === 200, `Status update failed: ${updateStatus.status}`);
  assert(
    updateStatus.data.employer_contact_for_worker?.whatsapp_link,
    "Missing WhatsApp link on SHORTLISTED",
  );
  checks.push(["PATCH /api/applications/:id/status", updateStatus.status]);

  const myApplications = await request(
    "GET",
    "/api/applications/me",
    undefined,
    workerToken,
  );
  assert(myApplications.status === 200, `Worker applications failed: ${myApplications.status}`);
  const myEntry = Array.isArray(myApplications.data.applications)
    ? myApplications.data.applications.find((item) => item.application_id === applicationId)
    : null;
  assert(myEntry?.employer_contact?.whatsapp_link, "Employer contact not exposed in worker view");
  checks.push(["GET /api/applications/me", myApplications.status]);

  console.log("ALL_ROUTE_TESTS_PASSED");
  console.log(
    JSON.stringify(
      {
        worker_id: workerId,
        employer_id: employerId,
        job_id: jobId,
        application_id: applicationId,
        checks,
      },
      null,
      2,
    ),
  );
}

run().catch((error) => {
  console.error("ROUTE_TEST_FAILED");
  console.error(error?.stack || error?.message || String(error));
  process.exit(1);
});
