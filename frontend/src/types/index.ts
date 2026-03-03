// ─── Roles ───────────────────────────────────────────────────
export type Role = 'student' | 'facilitator' | 'faculty' | 'executive';

// ─── User ────────────────────────────────────────────────────
export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar?: string;
    cohortIds: string[];
}

// ─── Cohort ──────────────────────────────────────────────────
export interface Cohort {
    id: string;
    name: string;
    department: string;
    batch: string;
    startDate: string;
    endDate: string;
    status: 'active' | 'completed' | 'upcoming';
    facilitatorId: string;
    studentCount: number;
    completionRate: number;
    engagementScore: number;
}

// ─── Tracker ─────────────────────────────────────────────────
export interface TrackerEntry {
    id: string;
    studentId: string;
    cohortId: string;
    date: string;
    learnings: string;
    challenges: string;
    plans: string;
    submittedAt: string;
    isLate: boolean;
    remark?: string;
    flaggedForMentor?: boolean;
    needsFollowUp?: boolean;
}

// ─── Attendance ──────────────────────────────────────────────
export type AttendanceStatus = 'present' | 'absent' | 'reason';

export interface AttendanceRecord {
    studentId: string;
    sessionId: string;
    date: string;
    status: AttendanceStatus;
    reason?: string;
    lockedAt?: string;
}

export interface Session {
    id: string;
    cohortId: string;
    title: string;
    date: string;
    type: 'lecture' | 'lab' | 'review' | 'workshop';
}

// ─── Student ─────────────────────────────────────────────────
export interface Student {
    id: string;
    name: string;
    email: string;
    cohortId: string;
    team: string;
    department: string;
    rank?: number;
    badges: Badge[];
    trackerStreak: number;
    attendancePercent: number;
    needsAttention?: boolean;
}

// ─── Badge ───────────────────────────────────────────────────
export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    earnedAt: string;
    color: string;
}

// ─── Project ─────────────────────────────────────────────────
export type ProjectType = 'mini' | 'major';
export type ProjectStatus = 'not_started' | 'in_progress' | 'submitted' | 'reviewed';

export interface Milestone {
    id: string;
    title: string;
    dueDate: string;
    completed: boolean;
}

export interface Project {
    id: string;
    studentId: string;
    cohortId: string;
    type: ProjectType;
    title: string;
    description: string;
    status: ProjectStatus;
    milestones: Milestone[];
    teamName?: string;
    score?: number;
    feedback?: string;
    submittedAt?: string;
}

// ─── Feedback ────────────────────────────────────────────────
export interface FeedbackEntry {
    id: string;
    fromId: string;
    fromName: string;
    fromRole: Role;
    toStudentId: string;
    cohortId: string;
    message: string;
    score?: number;
    createdAt: string;
    isRead: boolean;
}

// ─── Review Window ───────────────────────────────────────────
export interface ReviewWindow {
    id: string;
    cohortId: string;
    startTime: string;
    endTime: string;
    participants: string[];
    rubricDimensions: string[];
    isActive: boolean;
    createdBy: string;
}

// ─── Leaderboard ─────────────────────────────────────────────
export interface LeaderboardEntry {
    studentId: string;
    studentName: string;
    cohortId: string;
    score: number;
    rank: number;
    badges: number;
    trackerStreak: number;
    attendance: number;
}

// ─── Risk Flag ───────────────────────────────────────────────
export interface RiskFlag {
    studentId: string;
    studentName: string;
    cohortId: string;
    cohortName: string;
    reason: string;
    severity: 'low' | 'medium' | 'high';
    createdAt: string;
}
