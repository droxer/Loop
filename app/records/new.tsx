import { Stack } from 'expo-router';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Card } from '../../src/components/Card';
import { TextField } from '../../src/components/TextField';
import { LoopButton } from '../../src/components/LoopButton';
import { useTheme } from '../../src/providers/ThemeProvider';
import { useWrongQuestionForm } from '../../src/features/records/useWrongQuestionForm';
import { DIFFICULTY_OPTIONS, ROOT_CAUSE_OPTIONS, Difficulty, RootCause } from '../../src/features/records/types';

const OptionGroup = <T extends string>({
    label,
    options,
    value,
    onChange
}: {
    label: string;
    options: { label: string; value: T }[];
    value: T;
    onChange: (next: T) => void;
}) => {
    const { theme } = useTheme();

    return (
        <View style={{ gap: theme.spacing.sm }}>
            <Text style={{ color: theme.colors.mutedText, fontWeight: '500' }}>{label}</Text>
            <View style={styles.optionRow}>
                {options.map((option) => {
                    const selected = option.value === value;
                    return (
                        <Pressable
                            key={option.value}
                            onPress={() => onChange(option.value)}
                            style={{
                                paddingVertical: 10,
                                paddingHorizontal: 14,
                                borderRadius: theme.radius.md,
                                borderWidth: 1,
                                borderColor: selected ? theme.colors.primary : theme.colors.border,
                                backgroundColor: selected ? theme.colors.primary : theme.colors.surface
                            }}
                        >
                            <Text style={{ color: selected ? theme.colors.primaryText : theme.colors.text }}>{option.label}</Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
};

import { useLocalSearchParams } from 'expo-router';

export default function NewRecordScreen() {
    const { theme } = useTheme();
    const params = useLocalSearchParams<{
        question?: string;
        studentAnswer?: string;
        correctAnswer?: string;
        subject?: string;
        topic?: string;
    }>();

    const { form, updateField, submit, submitting, error, summary } = useWrongQuestionForm({
        question: params.question,
        studentAnswer: params.studentAnswer,
        correctAnswer: params.correctAnswer,
        subject: params.subject,
        topic: params.topic,
    });

    const handleSubmit = async () => {
        try {
            await submit();
        } catch (err) {
            // 错误已经在 hook 中处理
        }
    };

    return (
        <Screen scrollable>
            <Stack.Screen options={{ title: '记录错题', headerShown: true }} />
            <View style={{ gap: theme.spacing.lg }}>
                <Card style={{ gap: theme.spacing.md }}>
                    <Text style={styles.sectionTitle}>基础信息</Text>
                    <TextField
                        label="学科"
                        value={form.subject}
                        onChangeText={(text) => updateField('subject', text)}
                        placeholder="如：数学"
                    />
                    <TextField
                        label="知识点/章节"
                        value={form.topic}
                        onChangeText={(text) => updateField('topic', text)}
                        placeholder="如：函数与导数"
                    />
                    <OptionGroup<RootCause>
                        label="出错原因"
                        options={ROOT_CAUSE_OPTIONS}
                        value={form.rootCause}
                        onChange={(value) => updateField('rootCause', value)}
                    />
                    <OptionGroup<Difficulty>
                        label="题目难度"
                        options={DIFFICULTY_OPTIONS}
                        value={form.difficulty}
                        onChange={(value) => updateField('difficulty', value)}
                    />
                </Card>

                <Card style={{ gap: theme.spacing.md }}>
                    <Text style={styles.sectionTitle}>题目信息</Text>
                    <TextField
                        label="题干描述"
                        value={form.question}
                        onChangeText={(text) => updateField('question', text)}
                        placeholder="用 2-3 句话概述题目"
                        multiline
                        numberOfLines={4}
                    />
                    <TextField
                        label="我的答案"
                        value={form.studentAnswer}
                        onChangeText={(text) => updateField('studentAnswer', text)}
                        placeholder="写下当时的解法或答案"
                        multiline
                        numberOfLines={3}
                    />
                    <TextField
                        label="标准答案 / 解题思路"
                        value={form.correctAnswer}
                        onChangeText={(text) => updateField('correctAnswer', text)}
                        placeholder="记录正确做法，便于对比"
                        multiline
                        numberOfLines={3}
                    />
                    <TextField
                        label="标签"
                        value={form.tags}
                        onChangeText={(text) => updateField('tags', text)}
                        placeholder="用逗号分隔，如：函数,易错"
                    />
                    <TextField
                        label="反思笔记"
                        value={form.notes}
                        onChangeText={(text) => updateField('notes', text)}
                        placeholder="复盘关键步骤或下一次注意事项"
                        multiline
                        numberOfLines={4}
                    />
                </Card>

                {summary && (
                    <Card style={{ backgroundColor: theme.colors.card }}>
                        <Text style={{ color: theme.colors.success }}>已记录：{summary}</Text>
                        <Text style={{ color: theme.colors.mutedText, marginTop: 4 }}>
                            我们会根据难度为你设置下一次复习时间。
                        </Text>
                    </Card>
                )}

                {error && <Text style={{ color: theme.colors.warning }}>{error}</Text>}

                <LoopButton title="保存错题" onPress={handleSubmit} loading={submitting} />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    optionRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600'
    }
});
