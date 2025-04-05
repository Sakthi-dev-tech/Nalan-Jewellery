"use client";

import { supabase } from "@/libs/supabase-client";
import { toast } from "react-hot-toast";

export class SignInSignUpLogic {
    async SignUpUsingEmail(email: string, password: string) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });
    
            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            console.error('Sign up error:', error);
            return { data: null, error };
        }
    }

    async SignInUsingEmail(email: string, password: string, rememberMe: boolean) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
    
            if (error) {
                toast.error(error.message.replace(/(^\w|\s\w)/g, m => m.toUpperCase()));
                throw error;
            }
            
            return { data, error: null };
        } catch (error) {
            console.error('Sign in error:', error);
            return { data: null, error };
        }
    }

    async SignInUsingFacebook() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'facebook',
        })

        return { data, error }
    }

    async SignOutUser() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                toast.error(error.message.replace(/(^\w|\s\w)/g, m => m.toUpperCase()));
                throw error;
            }

            return { error: null };
        } catch (error) {
            console.error('Sign out error:', error);
            return { error };
        }
    }
}
