-- =========================================
-- Enable UUID Extension
-- =========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- =========================================
-- TENANTS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  college_name TEXT NOT NULL,
  principal_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  address TEXT,
  status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================
-- COHORTS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS cohorts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL,
  name TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'ONGOING' CHECK (status IN ('ONGOING', 'COMPLETED', 'CANCELLED')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_cohort_tenant
    FOREIGN KEY (tenant_id)
    REFERENCES tenants(id)
    ON DELETE CASCADE
);


-- =========================================
-- TEAMS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cohort_id UUID NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_team_cohort
    FOREIGN KEY (cohort_id)
    REFERENCES cohorts(id)
    ON DELETE CASCADE
);


-- =========================================
-- PROJECTS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cohort_id UUID NOT NULL,
  team_id UUID NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('MINI', 'MAJOR')),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'PENDING'
    CHECK (status IN ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'REJECTED')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_project_cohort
    FOREIGN KEY (cohort_id)
    REFERENCES cohorts(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_project_team
    FOREIGN KEY (team_id)
    REFERENCES teams(id)
    ON DELETE CASCADE
);


-- =========================================
-- STAFF TABLE (Your Arun Kumar Structure)
-- =========================================
CREATE TABLE IF NOT EXISTS staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  designation TEXT NOT NULL,
  department TEXT,
  experience_years INTEGER CHECK (experience_years >= 0),
  office_location TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_staff_tenant
    FOREIGN KEY (tenant_id)
    REFERENCES tenants(id)
    ON DELETE CASCADE
);


-- =========================================
-- INDEXES FOR PERFORMANCE
-- =========================================
CREATE INDEX IF NOT EXISTS idx_cohorts_tenant_id 
  ON cohorts(tenant_id);

CREATE INDEX IF NOT EXISTS idx_teams_cohort_id 
  ON teams(cohort_id);

CREATE INDEX IF NOT EXISTS idx_projects_cohort_id 
  ON projects(cohort_id);

CREATE INDEX IF NOT EXISTS idx_projects_team_id 
  ON projects(team_id);

CREATE INDEX IF NOT EXISTS idx_staff_tenant_id 
  ON staff(tenant_id);

CREATE INDEX IF NOT EXISTS idx_staff_email 
  ON staff(email);