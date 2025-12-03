import { View, Text } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Card } from '../../src/components/Card';
import { LoopButton } from '../../src/components/LoopButton';
import { useTheme } from '../../src/providers/ThemeProvider';
import { useAuth } from '../../src/providers/AuthProvider';

export default function ProfileScreen() {
    const { theme } = useTheme();
    const { user, signOut } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    if (!user) return null;

    return (
        <Screen>
            <Card style={{ gap: theme.spacing.md }}>
                <View style={{ alignItems: 'center', marginBottom: theme.spacing.md }}>
                    <View style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        backgroundColor: theme.colors.primary + '20',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: theme.spacing.sm
                    }}>
                        <Text style={{ fontSize: 32 }}>👤</Text>
                    </View>
                    <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: '600' }}>
                        {user.email}
                    </Text>
                </View>

                <LoopButton
                    title="退出登录"
                    variant="ghost"
                    onPress={handleSignOut}
                />
            </Card>
        </Screen>
    );
}
