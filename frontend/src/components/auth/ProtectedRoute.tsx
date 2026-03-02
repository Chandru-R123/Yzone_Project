import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { Role } from '../../types';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: Role[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { currentUser, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (currentUser && !allowedRoles.includes(currentUser.role)) {
        // Redirect to the correct home for their role
        const roleHome: Record<Role, string> = {
            student: '/student',
            facilitator: '/facilitator',
            faculty: '/faculty',
            executive: '/executive',
        };
        return <Navigate to={roleHome[currentUser.role]} replace />;
    }

    return <>{children}</>;
}
