import { ReactNode } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from '../providers/ThemeProvider';

type ScreenProps = {
  children: ReactNode;
  scrollable?: boolean;
  padding?: boolean;
};

export const Screen = ({ children, scrollable = false, padding = true }: ScreenProps) => {
  const { theme } = useTheme();
  const paddingStyle = padding ? { padding: theme.spacing.lg } : undefined;

  if (scrollable) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
        <ScrollView contentContainerStyle={[styles.content, paddingStyle]}>{children}</ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.content, paddingStyle]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  content: {
    flex: 1
  }
});
