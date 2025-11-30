import { useRouter } from 'expo-router';
import { Text } from 'react-native';
import { Screen } from '../src/components/Screen';
import { Card } from '../src/components/Card';
import { LoopButton } from '../src/components/LoopButton';
import { useTheme } from '../src/providers/ThemeProvider';

export default function HomeScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Screen>
      <Card style={{ gap: theme.spacing.md }}>
        <Text style={{ color: theme.colors.mutedText, letterSpacing: 1, textTransform: 'uppercase' }}>
          Loop · 学习闭环
        </Text>
        <Text style={{ color: theme.colors.text, fontSize: 28, fontWeight: '700' }}>
          从错题记录开启个性化复习
        </Text>
        <Text style={{ color: theme.colors.mutedText, lineHeight: 22 }}>
          目前正在搭建“错题记录” MVP，很快你就能记录错题、追踪弱点并生成复习任务。
        </Text>
        <LoopButton title="立即记录错题" onPress={() => router.push('/records/new')} />
      </Card>
    </Screen>
  );
}
