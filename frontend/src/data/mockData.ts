import type {
    User, Cohort, Student, TrackerEntry, AttendanceRecord,
    Session, Project, FeedbackEntry, ReviewWindow,
    LeaderboardEntry, RiskFlag, Badge
} from '../types';

// ─── Users ───────────────────────────────────────────────────
export const MOCK_USERS: User[] = [
    { id: 'u1', name: 'Aanya Sharma', email: 'aanya@yzone.in', role: 'student', cohortIds: ['c1'] },
    { id: 'u2', name: 'Rohan Mehta', email: 'rohan@yzone.in', role: 'student', cohortIds: ['c1'] },
    { id: 'u3', name: 'Priya Nair', email: 'priya@yzone.in', role: 'student', cohortIds: ['c2'] },
    { id: 'u4', name: 'Karan Singh', email: 'karan@yzone.in', role: 'student', cohortIds: ['c1'] },
    { id: 'u5', name: 'Divya Raj', email: 'divya@yzone.in', role: 'student', cohortIds: ['c1'] },
    { id: 'f1', name: 'Meera Pillai', email: 'meera@yzone.in', role: 'facilitator', cohortIds: ['c1', 'c2'] },
    { id: 'f2', name: 'Arjun Das', email: 'arjun@yzone.in', role: 'faculty', cohortIds: ['c1'] },
    { id: 'e1', name: 'Sundar Krishnan', email: 'sundar@yzone.in', role: 'executive', cohortIds: ['c1', 'c2', 'c3'] },
];

// ─── Cohorts ─────────────────────────────────────────────────
export const MOCK_COHORTS: Cohort[] = [
    {
        id: 'c1', name: 'Full Stack Batch 2025', department: 'Computer Science',
        batch: 'B.Tech 3rd Year', startDate: '2025-01-15', endDate: '2025-06-30',
        status: 'active', facilitatorId: 'f1', studentCount: 32,
        completionRate: 68, engagementScore: 82,
    },
    {
        id: 'c2', name: 'Data Science Cohort A', department: 'Information Technology',
        batch: 'B.Tech 4th Year', startDate: '2025-02-01', endDate: '2025-07-15',
        status: 'active', facilitatorId: 'f1', studentCount: 28,
        completionRate: 54, engagementScore: 74,
    },
    {
        id: 'c3', name: 'AI/ML Fundamentals', department: 'Electronics',
        batch: 'M.Tech 1st Year', startDate: '2025-03-01', endDate: '2025-08-31',
        status: 'upcoming', facilitatorId: 'f2', studentCount: 20,
        completionRate: 0, engagementScore: 0,
    },
];

// ─── Badges ──────────────────────────────────────────────────
const BADGES: Badge[] = [
    { id: 'b1', name: 'Early Bird', description: '7-day tracker streak', icon: '🌅', earnedAt: '2025-02-01', color: 'bg-amber-100 text-amber-700' },
    { id: 'b2', name: 'Code Ninja', description: 'Completed mini project', icon: '🥷', earnedAt: '2025-02-10', color: 'bg-purple-100 text-purple-700' },
    { id: 'b3', name: 'Team Player', description: 'Full attendance week', icon: '🤝', earnedAt: '2025-02-15', color: 'bg-green-100 text-green-700' },
    { id: 'b4', name: 'Deep Thinker', description: 'Quality reflections', icon: '🧠', earnedAt: '2025-02-20', color: 'bg-blue-100 text-blue-700' },
];

// ─── Students ────────────────────────────────────────────────
export const MOCK_STUDENTS: Student[] = [
    { id: 'u1', name: 'Aanya Sharma', email: 'aanya@yzone.in', cohortId: 'c1', team: 'Alpha', department: 'CS', rank: 1, badges: [BADGES[0], BADGES[1], BADGES[2], BADGES[3]], trackerStreak: 14, attendancePercent: 96, needsAttention: false },
    { id: 'u2', name: 'Rohan Mehta', email: 'rohan@yzone.in', cohortId: 'c1', team: 'Beta', department: 'CS', rank: 3, badges: [BADGES[0], BADGES[2]], trackerStreak: 7, attendancePercent: 88, needsAttention: false },
    { id: 'u3', name: 'Priya Nair', email: 'priya@yzone.in', cohortId: 'c2', team: 'Gamma', department: 'IT', rank: 2, badges: [BADGES[1], BADGES[3]], trackerStreak: 5, attendancePercent: 91, needsAttention: false },
    { id: 'u4', name: 'Karan Singh', email: 'karan@yzone.in', cohortId: 'c1', team: 'Alpha', department: 'CS', rank: 8, badges: [BADGES[0]], trackerStreak: 2, attendancePercent: 72, needsAttention: true },
    { id: 'u5', name: 'Divya Raj', email: 'divya@yzone.in', cohortId: 'c1', team: 'Delta', department: 'CS', rank: 5, badges: [BADGES[2]], trackerStreak: 3, attendancePercent: 80, needsAttention: true },
    { id: 'u6', name: 'Arnav Bose', email: 'arnav@yzone.in', cohortId: 'c1', team: 'Beta', department: 'CS', rank: 2, badges: [BADGES[0], BADGES[1], BADGES[3]], trackerStreak: 11, attendancePercent: 94, needsAttention: false },
    { id: 'u7', name: 'Tanvi Kulkarni', email: 'tanvi@yzone.in', cohortId: 'c1', team: 'Delta', department: 'CS', rank: 4, badges: [BADGES[1], BADGES[2]], trackerStreak: 9, attendancePercent: 87, needsAttention: false },
];

// ─── Sessions ────────────────────────────────────────────────
export const MOCK_SESSIONS: Session[] = [
    { id: 's1', cohortId: 'c1', title: 'React Fundamentals', date: '2025-02-17', type: 'lecture' },
    { id: 's2', cohortId: 'c1', title: 'TypeScript Deep Dive', date: '2025-02-18', type: 'lecture' },
    { id: 's3', cohortId: 'c1', title: 'API Integration Lab', date: '2025-02-19', type: 'lab' },
    { id: 's4', cohortId: 'c1', title: 'Project Review', date: '2025-02-20', type: 'review' },
    { id: 's5', cohortId: 'c1', title: 'State Management Workshop', date: '2025-02-21', type: 'workshop' },
    { id: 's6', cohortId: 'c1', title: 'Testing Strategies', date: '2025-02-24', type: 'lecture' },
    { id: 's7', cohortId: 'c1', title: 'Deployment & CI/CD', date: '2025-02-25', type: 'lab' },
    { id: 's8', cohortId: 'c1', title: 'Capstone Kick-off', date: '2025-02-26', type: 'workshop' },
];

// ─── Tracker Entries ─────────────────────────────────────────
export const MOCK_TRACKER_ENTRIES: TrackerEntry[] = [
    { id: 't1', studentId: 'u1', cohortId: 'c1', date: '2025-02-26', learnings: 'Learned about React hooks deeply, especially useCallback and useMemo for performance.', challenges: 'Understanding referential equality was tricky.', plans: 'Will practice with 3 custom hooks tomorrow.', submittedAt: '2025-02-26T18:32:00', isLate: false, remark: 'Great reflection! Very specific and actionable.', flaggedForMentor: false },
    { id: 't2', studentId: 'u1', cohortId: 'c1', date: '2025-02-25', learnings: 'TypeScript generics and utility types.', challenges: 'Mapped types syntax was confusing initially.', plans: 'Build a typed API client wrapper.', submittedAt: '2025-02-25T19:45:00', isLate: false, remark: 'Good depth. Keep it up!' },
    { id: 't3', studentId: 'u1', cohortId: 'c1', date: '2025-02-24', learnings: 'Understood REST API integration patterns.', challenges: 'CORS errors took time to debug.', plans: 'Learn about interceptors in axios.', submittedAt: '2025-02-24T23:58:00', isLate: true, remark: 'Submitted late. Please submit on time.' },
    { id: 't4', studentId: 'u1', cohortId: 'c1', date: '2025-02-21', learnings: 'Redux Toolkit slices and RTK Query.', challenges: 'Cache invalidation logic is complex.', plans: 'Review RTK Query docs thoroughly.', submittedAt: '2025-02-21T20:10:00', isLate: false },
    { id: 't5', studentId: 'u1', cohortId: 'c1', date: '2025-02-20', learnings: 'Learned CI/CD with GitHub Actions.', challenges: 'Secrets management in pipelines.', plans: 'Set up a pipeline for my project.', submittedAt: '2025-02-20T17:55:00', isLate: false, remark: 'Excellent reflection!' },
    { id: 't6', studentId: 'u2', cohortId: 'c1', date: '2025-02-26', learnings: 'CSS Grid and Flexbox layout patterns.', challenges: 'Alignment issues across browsers.', plans: 'Build a portfolio layout.', submittedAt: '2025-02-26T21:00:00', isLate: true, needsFollowUp: true },
    { id: 't7', studentId: 'u4', cohortId: 'c1', date: '2025-02-26', learnings: '', challenges: '', plans: '', submittedAt: '', isLate: false, needsFollowUp: true },
    { id: 't8', studentId: 'u5', cohortId: 'c1', date: '2025-02-26', learnings: 'Deployment on Vercel and Netlify.', challenges: 'Environment variable setup.', plans: 'Deploy my mini project.', submittedAt: '2025-02-26T22:30:00', isLate: true, needsFollowUp: false },
    { id: 't9', studentId: 'u6', cohortId: 'c1', date: '2025-02-26', learnings: 'Zustand state management.', challenges: 'Migrating from Redux was tedious.', plans: 'Refactor existing project.', submittedAt: '2025-02-26T16:20:00', isLate: false },
    { id: 't10', studentId: 'u7', cohortId: 'c1', date: '2025-02-26', learnings: 'React Query for server state.', challenges: 'Understanding stale time vs cache time.', plans: 'Build a data-heavy dashboard.', submittedAt: '2025-02-26T17:45:00', isLate: false },
];

// ─── Attendance Records ───────────────────────────────────────
export const MOCK_ATTENDANCE: AttendanceRecord[] = [
    // Session s1
    { studentId: 'u1', sessionId: 's1', date: '2025-02-17', status: 'present' },
    { studentId: 'u2', sessionId: 's1', date: '2025-02-17', status: 'present' },
    { studentId: 'u4', sessionId: 's1', date: '2025-02-17', status: 'absent' },
    { studentId: 'u5', sessionId: 's1', date: '2025-02-17', status: 'present' },
    { studentId: 'u6', sessionId: 's1', date: '2025-02-17', status: 'present' },
    { studentId: 'u7', sessionId: 's1', date: '2025-02-17', status: 'present' },
    // Session s2
    { studentId: 'u1', sessionId: 's2', date: '2025-02-18', status: 'present' },
    { studentId: 'u2', sessionId: 's2', date: '2025-02-18', status: 'absent' },
    { studentId: 'u4', sessionId: 's2', date: '2025-02-18', status: 'reason', reason: 'Medical appointment' },
    { studentId: 'u5', sessionId: 's2', date: '2025-02-18', status: 'present' },
    { studentId: 'u6', sessionId: 's2', date: '2025-02-18', status: 'present' },
    { studentId: 'u7', sessionId: 's2', date: '2025-02-18', status: 'present' },
    // Session s3
    { studentId: 'u1', sessionId: 's3', date: '2025-02-19', status: 'present' },
    { studentId: 'u2', sessionId: 's3', date: '2025-02-19', status: 'present' },
    { studentId: 'u4', sessionId: 's3', date: '2025-02-19', status: 'absent' },
    { studentId: 'u5', sessionId: 's3', date: '2025-02-19', status: 'absent' },
    { studentId: 'u6', sessionId: 's3', date: '2025-02-19', status: 'present' },
    { studentId: 'u7', sessionId: 's3', date: '2025-02-19', status: 'present' },
    // Session s4
    { studentId: 'u1', sessionId: 's4', date: '2025-02-20', status: 'present' },
    { studentId: 'u2', sessionId: 's4', date: '2025-02-20', status: 'present' },
    { studentId: 'u4', sessionId: 's4', date: '2025-02-20', status: 'present' },
    { studentId: 'u5', sessionId: 's4', date: '2025-02-20', status: 'present' },
    { studentId: 'u6', sessionId: 's4', date: '2025-02-20', status: 'present' },
    { studentId: 'u7', sessionId: 's4', date: '2025-02-20', status: 'absent' },
    // Session s5
    { studentId: 'u1', sessionId: 's5', date: '2025-02-21', status: 'present' },
    { studentId: 'u2', sessionId: 's5', date: '2025-02-21', status: 'present' },
    { studentId: 'u4', sessionId: 's5', date: '2025-02-21', status: 'absent' },
    { studentId: 'u5', sessionId: 's5', date: '2025-02-21', status: 'reason', reason: 'Family event' },
    { studentId: 'u6', sessionId: 's5', date: '2025-02-21', status: 'present' },
    { studentId: 'u7', sessionId: 's5', date: '2025-02-21', status: 'present' },
];

// ─── Projects ────────────────────────────────────────────────
export const MOCK_PROJECTS: Project[] = [
    {
        id: 'p1', studentId: 'u1', cohortId: 'c1', type: 'mini',
        title: 'Task Manager App', description: 'A full-stack task management application with real-time updates.',
        status: 'in_progress', teamName: 'Alpha',
        milestones: [
            { id: 'm1', title: 'UI Design', dueDate: '2025-02-10', completed: true },
            { id: 'm2', title: 'Backend API', dueDate: '2025-02-20', completed: true },
            { id: 'm3', title: 'Integration', dueDate: '2025-03-01', completed: false },
            { id: 'm4', title: 'Testing & Deploy', dueDate: '2025-03-10', completed: false },
        ],
    },
    {
        id: 'p2', studentId: 'u1', cohortId: 'c1', type: 'major',
        title: 'AI-Powered Study Planner', description: 'An intelligent study planner using ML to optimize learning schedules.',
        status: 'not_started', teamName: 'Alpha',
        milestones: [
            { id: 'm5', title: 'Proposal Submission', dueDate: '2025-03-01', completed: false },
            { id: 'm6', title: 'Prototype', dueDate: '2025-04-01', completed: false },
            { id: 'm7', title: 'MVP', dueDate: '2025-05-01', completed: false },
            { id: 'm8', title: 'Final Submission', dueDate: '2025-06-15', completed: false },
        ],
    },
];

// ─── Feedback ────────────────────────────────────────────────
export const MOCK_FEEDBACK: FeedbackEntry[] = [
    { id: 'fb1', fromId: 'f1', fromName: 'Meera Pillai', fromRole: 'facilitator', toStudentId: 'u1', cohortId: 'c1', message: 'Aanya, your tracker submissions are highly detailed and show strong analytical thinking. Keep maintaining the streak!', score: undefined, createdAt: '2025-02-25T10:00:00', isRead: true },
    { id: 'fb2', fromId: 'f2', fromName: 'Dr. Arjun Das', fromRole: 'faculty', toStudentId: 'u1', cohortId: 'c1', message: 'Your mini project architectural approach is sound. Consider implementing caching for the API layer to improve performance. Overall excellent progress.', score: 88, createdAt: '2025-02-22T14:30:00', isRead: true },
    { id: 'fb3', fromId: 'f1', fromName: 'Meera Pillai', fromRole: 'facilitator', toStudentId: 'u1', cohortId: 'c1', message: 'Attendance is perfect! You\'re setting a great example for your team.', score: undefined, createdAt: '2025-02-18T09:15:00', isRead: false },
];

// ─── Review Windows ──────────────────────────────────────────
export const MOCK_REVIEW_WINDOWS: ReviewWindow[] = [
    {
        id: 'rw1', cohortId: 'c1',
        startTime: '2025-02-27T09:00:00', endTime: '2025-02-28T17:00:00',
        participants: ['u1', 'u2', 'u6', 'u7'],
        rubricDimensions: ['Technical Skills', 'Problem Solving', 'Communication', 'Team Collaboration', 'Code Quality'],
        isActive: true, createdBy: 'f1',
    },
];

// ─── Leaderboard ─────────────────────────────────────────────
export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
    { studentId: 'u1', studentName: 'Aanya Sharma', cohortId: 'c1', score: 946, rank: 1, badges: 4, trackerStreak: 14, attendance: 96 },
    { studentId: 'u6', studentName: 'Arnav Bose', cohortId: 'c1', score: 912, rank: 2, badges: 3, trackerStreak: 11, attendance: 94 },
    { studentId: 'u2', studentName: 'Rohan Mehta', cohortId: 'c1', score: 876, rank: 3, badges: 2, trackerStreak: 7, attendance: 88 },
    { studentId: 'u7', studentName: 'Tanvi Kulkarni', cohortId: 'c1', score: 855, rank: 4, badges: 2, trackerStreak: 9, attendance: 87 },
    { studentId: 'u5', studentName: 'Divya Raj', cohortId: 'c1', score: 798, rank: 5, badges: 1, trackerStreak: 3, attendance: 80 },
    { studentId: 'u4', studentName: 'Karan Singh', cohortId: 'c1', score: 743, rank: 6, badges: 1, trackerStreak: 2, attendance: 72 },
];

// ─── Risk Flags ──────────────────────────────────────────────
export const MOCK_RISK_FLAGS: RiskFlag[] = [
    { studentId: 'u4', studentName: 'Karan Singh', cohortId: 'c1', cohortName: 'Full Stack Batch 2025', reason: 'Tracker submissions missing for 3+ days', severity: 'high', createdAt: '2025-02-26T08:00:00' },
    { studentId: 'u5', studentName: 'Divya Raj', cohortId: 'c1', cohortName: 'Full Stack Batch 2025', reason: 'Attendance below 80%', severity: 'medium', createdAt: '2025-02-25T08:00:00' },
];

// ─── Engagement Trend (for Executive) ────────────────────────
export const ENGAGEMENT_TREND = [
    { week: 'Wk 1', c1: 75, c2: 60, c3: 0 },
    { week: 'Wk 2', c1: 78, c2: 64, c3: 0 },
    { week: 'Wk 3', c1: 80, c2: 70, c3: 0 },
    { week: 'Wk 4', c1: 82, c2: 74, c3: 0 },
    { week: 'Wk 5', c1: 85, c2: 72, c3: 0 },
    { week: 'Wk 6', c1: 82, c2: 76, c3: 0 },
];
