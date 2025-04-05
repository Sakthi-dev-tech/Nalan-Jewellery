'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from "@/libs/supabase-client";
import { User } from '@supabase/supabase-js';
import { Toaster, toast } from 'react-hot-toast';

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    user: null
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Check initial session
        supabase.auth.getUser().then(({ data: { user } }) => {
            setIsLoggedIn(!!user);
            setUser(user);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            console.log('Auth event:', event, 'Session:', session);
            setIsLoggedIn(!!session);
            setUser(session?.user || null);

            // Show notifications based on auth events
            if (event === 'SIGNED_IN') {
                toast.success(`Welcome Back!`, {
                    duration: 3000,
                    position: 'top-center',
                    style: {
                        background: '#34758f',
                        color: '#fff',
                    },
                });
            } else if (event === 'SIGNED_OUT') {
                toast.success('Successfully Logged Out!', {
                    duration: 3000,
                    position: 'top-center',
                    style: {
                        background: '#34758f',
                        color: '#fff',
                    },
                });
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <>
            <AuthContext.Provider value={{ isLoggedIn, user }}>
                {children}
            </AuthContext.Provider>
            <Toaster />
        </>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};