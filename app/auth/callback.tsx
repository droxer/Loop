import { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../src/providers/ThemeProvider';

export default function AuthCallback() {
    const router = useRouter();
    const { theme } = useTheme();

    useEffect(() => {
        // The AuthProvider will handle the session automatically
        // Just redirect to home after a short delay
        const timer = setTimeout(() => {
            router.replace('/');
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.background
        }}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={{
                color: theme.colors.text,
                marginTop: theme.spacing.md,
                fontSize: 16
            }}>
                正在登录...
            </Text>
        </View>
    );
}
