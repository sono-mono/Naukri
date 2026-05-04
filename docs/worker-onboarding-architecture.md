# BlueLink Worker Onboarding Architecture

## Objective

BlueLink's worker onboarding flow must convert first-time visitors into verified, employable worker profiles in under 5 minutes on low-end mobile devices. The flow must also satisfy StartInUP program expectations around traceability, consent capture, user safety, and readiness for government or enterprise partnerships.

## Product Principles

- Mobile-first for low bandwidth and low-memory Android devices.
- No authentication wall during early rollout. Users can enter directly as Worker or Employer.
- Progressive onboarding. Capture enough data to unlock job matching first, then deepen verification.
- Multilingual from first render. Language is selected before or during onboarding and stored as profile metadata.
- Consent and auditability by default. Every verification and onboarding milestone is traceable.
- India-scale ready. Worker discovery, matching, and verification status must support future queue-based and AI-assisted workflows.

## User Flow

### 1. Direct Entry

- Visitor lands on `/`.
- User chooses `Continue as Worker` or `Continue as Employer`.
- Server action creates a lightweight actor session cookie with the selected role.
- Worker is redirected to `/worker`.

### 2. Worker Onboarding

- If a worker profile does not exist, the worker sees the onboarding form.
- Required first-pass fields:
  - full name
  - primary phone
  - preferred language
  - current city and state
  - pincode
  - latitude and longitude
  - top skills
  - total experience
  - consent checkboxes
- Optional but recommended:
  - WhatsApp number
  - short biography
  - Aadhaar or supported ID metadata

### 3. Registration Processing

- Next.js Server Action validates form data with `zod`.
- Action creates or reuses a `PlatformUser` record for the direct-access session.
- Action writes the `WorkerProfile`.
- Action upserts `WorkerSkill` records.
- If document metadata is present, action opens a `WorkerVerificationDocument` record in `PENDING`.
- Action writes a `VerificationEvent` audit entry with source `worker_onboarding`.
- Action updates the actor cookie so the worker returns to the same profile without login.
- Worker is redirected to `/worker?welcome=1`.

### 4. Post-Onboarding Experience

- Worker sees a dashboard with:
  - onboarding status
  - verification status
  - profile completion
  - nearby open jobs
  - recommended job categories
- Matching service later enriches the worker profile with:
  - normalized skill graph
  - employability summary
  - location confidence score
  - AI match score against open jobs

## Architecture Components

### Next.js App Router

- Handles role entry, onboarding UI, worker dashboard, and employer dashboard.
- Uses Server Components for dashboard data fetching.
- Uses Server Actions for worker registration and future job posting.

### Prisma + PostgreSQL

- PostgreSQL is the system of record.
- Prisma manages:
  - worker profiles
  - employers
  - jobs
  - applications
  - verification documents
  - attendance
  - payouts
  - consent and audit events

### Python AI/Data Services

- Separate Python services handle:
  - skill normalization
  - geospatial matching
  - fraud heuristics
  - multilingual text enrichment
  - autonomous matching agents
- These services consume events asynchronously rather than blocking onboarding.

### Event-Driven Extension Path

- Registration completes synchronously for fast UX.
- Follow-up steps should run asynchronously:
  - KYC verification request dispatch
  - skill normalization
  - geohash enrichment
  - duplicate profile detection
  - job recommendations

## StartInUP Compliance Considerations

### Required Controls

- Explicit consent versioning for privacy, verification, and data retention.
- Audit trail for onboarding and verification state changes.
- Soft operational trust states via `onboarding_status` and `verification_status`.
- Masked document numbers in worker-facing or employer-facing views.
- Region-aware data collection fields to support state reporting and public-program analytics.

### Suggested Governance Rules

- PII access should be role-restricted at the API layer.
- Aadhaar numbers should never be stored in raw form once production verification is implemented.
- Verification documents should move to secure object storage with signed URLs.
- Government-program export fields should be generated from reporting views, not direct transactional tables.

## India-Scale Readiness

- Geospatial queries should use `geohash` or PostGIS in future iterations.
- Matching must degrade gracefully when GPS is approximate.
- Job feed should support vernacular skill aliases such as `mistri`, `rajmistri`, `welder`, `helper`.
- Server Actions should remain thin and deterministic; AI calls must not block core writes.
- All dashboard pages should target a sub-2 second first load on 4G-class networks.

## Worker Onboarding Data Contract

### Required Fields

- `full_name`
- `primary_phone`
- `preferred_language`
- `current_city`
- `current_state`
- `pincode`
- `latitude`
- `longitude`
- `skills[]`
- `total_experience_months`
- `consent_version`
- `privacy_consented`
- `data_retention_consented`

### Future Expansion

- Aadhaar via DigiLocker or approved KYC partner
- bank account and UPI payout preference
- work category certificates
- emergency contact
- shift availability
- attendance device binding

## Recommended Next Build Steps

1. Implement employer onboarding and job posting server actions.
2. Replace cookie-based direct access with OTP or device binding when pilot feedback is complete.
3. Add multilingual content dictionaries for Hindi and Marathi first.
4. Introduce Python matching microservice with queue-based enrichment.
5. Add verification review queue for field agents and admin operators.
