import { TextInput, Text, View, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '../providers/ThemeProvider';

type Props = TextInputProps & {
  label: string;
  helperText?: string;
};

export const TextField = ({ label, helperText, style, ...rest }: Props) => {
  const { theme } = useTheme();

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: theme.colors.mutedText }]}>{label}</Text>
      <TextInput
        placeholderTextColor={theme.colors.mutedText}
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            color: theme.colors.text
          },
          style
        ]}
        {...rest}
      />
      {helperText ? <Text style={[styles.helper, { color: theme.colors.mutedText }]}>{helperText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 6
  },
  label: {
    fontSize: 14,
    fontWeight: '500'
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16
  },
  helper: {
    fontSize: 12
  }
});
