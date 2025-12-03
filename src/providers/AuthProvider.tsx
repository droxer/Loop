import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Session, User } from '@supabase/supabase-js';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { getSupabaseClient } from '../lib/supabase';

// Required for web browser to close properly after auth
WebBrowser.maybeCompleteAuthSession();

interface AuthContextType {
    session: Session | null;
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = getSupabaseClient();

    // Create redirect URL for OAuth
    const redirectUrl = AuthSession.makeRedirectUri({
        scheme: 'loop',
        path: 'auth/callback',
    });
    console.log('🔗 OAuth Redirect URL:', redirectUrl);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        try {
            if (Platform.OS === 'web') {
                // Web platform: use standard OAuth flow
                const { error } = await supabase.auth.signInWithOAuth({
                    provider: 'google',
                    options: {
                        redirectTo: window.location.origin,
                        queryParams: {
                            access_type: 'offline',
                            prompt: 'consent',
                        },
                    },
                });

                if (error) throw error;
            } else {
                // Native platforms: use expo-auth-session
                const { data, error } = await supabase.auth.signInWithOAuth({
                    provider: 'google',
                    options: {
                        redirectTo: redirectUrl,
                        skipBrowserRedirect: true,
                    },
                });

                if (error) throw error;

                if (!data?.url) {
                    throw new Error('No authorization URL returned');
                }

                // Open the OAuth URL in a browser
                const result = await WebBrowser.openAuthSessionAsync(
                    data.url,
                    redirectUrl,
                    {
                        presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET
                    }
                );

                if (result.type === 'success') {
                    const url = result.url;

                    // Extract tokens from the URL
                    const params = new URLSearchParams(url.split('#')[1] || url.split('?')[1]);
                    const accessToken = params.get('access_token');
                    const refreshToken = params.get('refresh_token');

                    if (accessToken) {
                        // Set the session with the tokens
                        const { error: sessionError } = await supabase.auth.setSession({
                            access_token: accessToken,
                            refresh_token: refreshToken || '',
                        });

                        if (sessionError) throw sessionError;
                    }
                } else if (result.type === 'cancel') {
                    console.log('User cancelled the authentication');
                }
            }
        } catch (error) {
            console.error('Error signing in with Google:', error);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                session,
                user,
                loading,
                signInWithGoogle,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
