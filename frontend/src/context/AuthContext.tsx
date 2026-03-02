import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, Role } from '../types';
import { MOCK_USERS } from '../data/mockData';

interface AuthContextType {
    currentUser: User | null;
    login: (role: Role) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const ROLE_DEFAULT_USER: Record<Role, string> = {
    student: 'u1',
    facilitator: 'f1',
    faculty: 'f2',
    executive: 'e1',
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const login = useCallback((role: Role) => {
        const userId = ROLE_DEFAULT_USER[role];
        const user = MOCK_USERS.find(u => u.id === userId) ?? null;
        setCurrentUser(user);
    }, []);

    const logout = useCallback(() => {
        setCurrentUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, isAuthenticated: !!currentUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}
