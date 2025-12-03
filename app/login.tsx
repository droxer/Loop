import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { Screen } from '../src/components/Screen';
import { Card } from '../src/components/Card';
import { LoopButton } from '../src/components/LoopButton';
import { useTheme } from '../src/providers/ThemeProvider';
import { useAuth } from '../src/providers/AuthProvider';

export default function LoginScreen() {
    const { theme } = useTheme();
    const { signInWithGoogle } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            await signInWithGoogle();
        } catch (error) {
            Alert.alert(
                '登录失败',
                error instanceof Error ? error.message : '无法连接到 Google，请稍后重试'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Screen>
            <View style={styles.container}>
                <Card style={{ gap: theme.spacing.lg, alignItems: 'center' }}>
                    <View style={{ alignItems: 'center', gap: theme.spacing.sm }}>
                        <Text style={{
                            color: theme.colors.mutedText,
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                            fontSize: 12
                        }}>
                            欢迎使用
                        </Text>
                        <Text style={{
                            color: theme.colors.text,
                            fontSize: 32,
                            fontWeight: '700'
                        }}>
                            Loop · 学习闭环
                        </Text>
                    </View>

                    <Text style={{
                        color: theme.colors.mutedText,
                        lineHeight: 22,
                        textAlign: 'center'
                    }}>
                        从错题记录开启个性化复习之旅
                    </Text>

                    {loading ? (
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                    ) : (
                        <LoopButton
                            title="使用 Google 登录"
                            onPress={handleGoogleSignIn}
                            style={{ width: '100%' }}
                        />
                    )}

                    <Text style={{
                        color: theme.colors.mutedText,
                        fontSize: 12,
                        textAlign: 'center',
                        marginTop: theme.spacing.md
                    }}>
                        登录即表示您同意我们的服务条款和隐私政策
                    </Text>
                </Card>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});
