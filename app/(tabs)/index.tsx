import { useRouter } from 'expo-router';
import { Text, View, ActivityIndicator, FlatList } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Card } from '../../src/components/Card';
import { LoopButton } from '../../src/components/LoopButton';
import { useTheme } from '../../src/providers/ThemeProvider';
import { useAuth } from '../../src/providers/AuthProvider';
import { useProtectedRoute } from '../../src/hooks/useProtectedRoute';
import { useRecords } from '../../src/features/records/useRecords';

export default function HomeScreen() {
    const { theme } = useTheme();
    const router = useRouter();
    const { user, loading } = useProtectedRoute();
    const { records } = useRecords();

    if (loading) {
        return (
            <Screen>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                </View>
            </Screen>
        );
    }

    if (!user) {
        return null; // Will redirect to login
    }

    const renderHeader = () => (
        <View style={{ gap: theme.spacing.md, marginBottom: theme.spacing.md }}>
            <Card style={{ gap: theme.spacing.md }}>
                <Text style={{ color: theme.colors.mutedText, letterSpacing: 1, textTransform: 'uppercase' }}>
                    Loop · 学习闭环
                </Text>
                <Text style={{ color: theme.colors.text, fontSize: 28, fontWeight: '700' }}>
                    从错题记录开启个性化复习
                </Text>
                <Text style={{ color: theme.colors.mutedText, lineHeight: 22 }}>
                    欢迎回来，{user.email}！
                </Text>
                <View style={{ marginTop: theme.spacing.sm, flexDirection: 'row', gap: theme.spacing.md }}>
                    <View style={{ flex: 1 }}>
                        <LoopButton title="立即记录错题" onPress={() => router.push('/records/new')} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <LoopButton
                            title="拍照识别"
                            variant="secondary"
                            onPress={() => router.push('/camera')}
                        />
                    </View>
                </View>
            </Card>

            <Text style={{
                color: theme.colors.text,
                fontSize: 18,
                fontWeight: '600',
                marginTop: theme.spacing.sm
            }}>
                最近记录 ({records.length})
            </Text>
        </View>
    );

    return (
        <Screen padding={false}>
            <FlatList
                data={records}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: theme.spacing.lg, gap: theme.spacing.md }}
                ListHeaderComponent={renderHeader}
                renderItem={({ item }) => (
                    <Card>
                        <View style={{ gap: theme.spacing.sm }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <View style={{
                                    backgroundColor: theme.colors.primary + '20',
                                    paddingHorizontal: 8,
                                    paddingVertical: 4,
                                    borderRadius: 4
                                }}>
                                    <Text style={{ color: theme.colors.primary, fontWeight: '600', fontSize: 12 }}>
                                        {item.subject}
                                    </Text>
                                </View>
                                <Text style={{ color: theme.colors.mutedText, fontSize: 12 }}>
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </Text>
                            </View>

                            <Text style={{ color: theme.colors.text, fontWeight: '500', fontSize: 16, lineHeight: 24 }} numberOfLines={3}>
                                {item.question}
                            </Text>

                            <View style={{ flexDirection: 'row', gap: theme.spacing.md, marginTop: 4 }}>
                                <Text style={{ color: theme.colors.mutedText, fontSize: 12 }}>
                                    📌 {item.topic}
                                </Text>
                                <Text style={{ color: theme.colors.mutedText, fontSize: 12 }}>
                                    🏷️ {item.tags?.join(', ') || '无标签'}
                                </Text>
                            </View>
                        </View>
                    </Card>
                )}
                ListEmptyComponent={
                    <View style={{ padding: theme.spacing.xl, alignItems: 'center' }}>
                        <Text style={{ color: theme.colors.mutedText, textAlign: 'center' }}>
                            还没有记录错题，快去添加第一道吧！
                        </Text>
                    </View>
                }
            />
        </Screen>
    );
}
