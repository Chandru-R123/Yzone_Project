-- Faculty Principal Tables

CREATE TABLE IF NOT EXISTS faculty_principals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  tenant_id UUID NOT NULL,
  designation TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS faculty_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  faculty_principal_id UUID NOT NULL,
  student_id UUID NOT NULL,
  project_id UUID NOT NULL,
  remarks TEXT,
  status TEXT DEFAULT 'APPROVED',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);