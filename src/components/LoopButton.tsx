import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '../providers/ThemeProvider';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'ghost';
};

export const LoopButton = ({
  title,
  onPress,
  disabled,
  loading,
  variant = 'primary'
}: ButtonProps) => {
  const { theme } = useTheme();
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: isPrimary ? theme.colors.primary : 'transparent',
          borderColor: isPrimary ? theme.colors.primary : theme.colors.border,
          opacity: pressed ? 0.85 : 1
        }
      ]}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.primaryText} />
      ) : (
        <Text
          style={{
            color: isPrimary ? theme.colors.primaryText : theme.colors.text,
            fontWeight: '600'
          }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center'
  }
});
