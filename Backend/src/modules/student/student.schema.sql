-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================
-- STUDENTS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  cohort_id UUID NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  department TEXT,
  enrollment_number TEXT UNIQUE,
  status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE','INACTIVE','GRADUATED')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- STUDENT TRACKERS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS student_trackers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  week INT NOT NULL,
  learned_today TEXT NOT NULL,
  issues TEXT,
  plan_for_tomorrow TEXT,
  status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE','INACTIVE','COMPLETED')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- SUBMISSIONS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  status TEXT DEFAULT 'SUBMITTED' CHECK (status IN ('SUBMITTED','PENDING','REJECTED')),
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- INDEXES FOR PERFORMANCE
-- =========================
-- Students
CREATE INDEX IF NOT EXISTS idx_students_cohort ON students(cohort_id);

-- Student trackers
CREATE INDEX IF NOT EXISTS idx_studenttrackers_student ON student_trackers(student_id);
CREATE INDEX IF NOT EXISTS idx_studenttrackers_project ON student_trackers(project_id);
CREATE INDEX IF NOT EXISTS idx_studenttrackers_created ON student_trackers(created_at);

-- Submissions
CREATE INDEX IF NOT EXISTS idx_submissions_student ON submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_submissions_project ON submissions(project_id);
CREATE INDEX IF NOT EXISTS idx_submissions_created ON submissions(submitted_at);-- =========================================
-- Enable UUID extension
-- =========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================
-- STUDENTS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  cohort_id UUID NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  department TEXT,
  enrollment_number TEXT UNIQUE,
  status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE','INACTIVE','GRADUATED')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- STUDENT TRACKERS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS student_trackers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  week INT NOT NULL,
  learned_today TEXT NOT NULL,
  issues TEXT,
  plan_for_tomorrow TEXT,
  status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE','INACTIVE','COMPLETED')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- SUBMISSIONS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  status TEXT DEFAULT 'SUBMITTED' CHECK (status IN ('SUBMITTED','PENDING','REJECTED')),
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- INDEXES FOR PERFORMANCE
-- =========================================
-- Students
CREATE INDEX IF NOT EXISTS idx_students_cohort ON students(cohort_id);
CREATE INDEX IF NOT EXISTS idx_students_team ON students(team_id);
CREATE INDEX IF NOT EXISTS idx_students_tenant ON students(tenant_id);

-- Student trackers
CREATE INDEX IF NOT EXISTS idx_studenttrackers_student ON student_trackers(student_id);
CREATE INDEX IF NOT EXISTS idx_studenttrackers_project ON student_trackers(project_id);
CREATE INDEX IF NOT EXISTS idx_studenttrackers_created ON student_trackers(created_at);

-- Submissions
CREATE INDEX IF NOT EXISTS idx_submissions_student ON submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_submissions_project ON submissions(project_id);
CREATE INDEX IF NOT EXISTS idx_submissions_created ON submissions(submitted_at);