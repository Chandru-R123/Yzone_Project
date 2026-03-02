import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { CohortProvider } from './context/CohortContext';
import { useAuth } from './context/AuthContext';

// Pages
import LoginPage from './pages/LoginPage';

// Student
import StudentDashboard from './pages/student/StudentDashboard';
import StudentTrackerHistory from './pages/student/StudentTrackerHistory';
import StudentProjects from './pages/student/StudentProjects';
import StudentFeedback from './pages/student/StudentFeedback';
import StudentLeaderboard from './pages/student/StudentLeaderboard';

// Facilitator
import FacilitatorDashboard from './pages/facilitator/FacilitatorDashboard';
import AttendanceScreen from './pages/facilitator/AttendanceScreen';
import TrackerReview from './pages/facilitator/TrackerReview';
import ReviewWindowControl from './pages/facilitator/ReviewWindowControl';
import FacilitatorStudents from './pages/facilitator/FacilitatorStudents';

// Faculty
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import FacultyStudents from './pages/faculty/FacultyStudents';

// Executive
import ExecutiveDashboard from './pages/executive/ExecutiveDashboard';
import ExecutiveCohorts from './pages/executive/ExecutiveCohorts';
import ExecutiveRisks from './pages/executive/ExecutiveRisks';
import ExecutiveStudents from './pages/executive/ExecutiveStudents';

function AppRoutes() {
    const { currentUser } = useAuth();

    const defaultRoute = currentUser
        ? { student: '/student', facilitator: '/facilitator', faculty: '/faculty', executive: '/executive' }[currentUser.role]
        : '/login';

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* Root redirect */}
            <Route path="/" element={<Navigate to={defaultRoute} replace />} />

            {/* ── Student ─────────────────────────────── */}
            <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><CohortProvider><StudentDashboard /></CohortProvider></ProtectedRoute>} />
            <Route path="/student/tracker" element={<ProtectedRoute allowedRoles={['student']}><CohortProvider><StudentTrackerHistory /></CohortProvider></ProtectedRoute>} />
            <Route path="/student/projects" element={<ProtectedRoute allowedRoles={['student']}><CohortProvider><StudentProjects /></CohortProvider></ProtectedRoute>} />
            <Route path="/student/feedback" element={<ProtectedRoute allowedRoles={['student']}><CohortProvider><StudentFeedback /></CohortProvider></ProtectedRoute>} />
            <Route path="/student/leaderboard" element={<ProtectedRoute allowedRoles={['student']}><CohortProvider><StudentLeaderboard /></CohortProvider></ProtectedRoute>} />

            {/* ── Facilitator ──────────────────────────── */}
            <Route path="/facilitator" element={<ProtectedRoute allowedRoles={['facilitator']}><CohortProvider><FacilitatorDashboard /></CohortProvider></ProtectedRoute>} />
            <Route path="/facilitator/attendance" element={<ProtectedRoute allowedRoles={['facilitator']}><CohortProvider><AttendanceScreen /></CohortProvider></ProtectedRoute>} />
            <Route path="/facilitator/trackers" element={<ProtectedRoute allowedRoles={['facilitator']}><CohortProvider><TrackerReview /></CohortProvider></ProtectedRoute>} />
            <Route path="/facilitator/review" element={<ProtectedRoute allowedRoles={['facilitator']}><CohortProvider><ReviewWindowControl /></CohortProvider></ProtectedRoute>} />
            <Route path="/facilitator/students" element={<ProtectedRoute allowedRoles={['facilitator']}><CohortProvider><FacilitatorStudents /></CohortProvider></ProtectedRoute>} />

            {/* ── Faculty ─────────────────────────────── */}
            <Route path="/faculty" element={<ProtectedRoute allowedRoles={['faculty']}><CohortProvider><FacultyDashboard /></CohortProvider></ProtectedRoute>} />
            <Route path="/faculty/students" element={<ProtectedRoute allowedRoles={['faculty']}><CohortProvider><FacultyStudents /></CohortProvider></ProtectedRoute>} />

            {/* ── Executive ────────────────────────────── */}
            <Route path="/executive" element={<ProtectedRoute allowedRoles={['executive']}><CohortProvider><ExecutiveDashboard /></CohortProvider></ProtectedRoute>} />
            <Route path="/executive/cohorts" element={<ProtectedRoute allowedRoles={['executive']}><CohortProvider><ExecutiveCohorts /></CohortProvider></ProtectedRoute>} />
            <Route path="/executive/risks" element={<ProtectedRoute allowedRoles={['executive']}><CohortProvider><ExecutiveRisks /></CohortProvider></ProtectedRoute>} />
            <Route path="/executive/students" element={<ProtectedRoute allowedRoles={['executive']}><CohortProvider><ExecutiveStudents /></CohortProvider></ProtectedRoute>} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to={defaultRoute} replace />} />
        </Routes>
    );
}

export default AppRoutes;
