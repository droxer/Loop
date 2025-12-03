import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '../providers/AuthProvider';

/**
 * Hook to protect routes and redirect based on authentication state
 * Use this in your root layout or individual screens
 */
export function useProtectedRoute() {
    const { user, loading } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;

        const segmentStrings = segments as string[];
        const inAuthGroup = segmentStrings.includes('auth') || segmentStrings.includes('login');

        if (!user && !inAuthGroup) {
            // Redirect to login if not authenticated and not in auth group
            router.replace('/login' as any);
        } else if (user && inAuthGroup) {
            // Redirect to home if authenticated and in auth group
            router.replace('/' as any);
        }
    }, [user, loading, segments]);

    return { user, loading };
}
