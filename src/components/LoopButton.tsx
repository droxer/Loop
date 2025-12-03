import { ActivityIndicator, Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { useTheme } from '../providers/ThemeProvider';

type ButtonProps = {
    title: string;
    onPress?: () => void;
    disabled?: boolean;
    loading?: boolean;
    variant?: 'primary' | 'secondary' | 'ghost';
    style?: StyleProp<ViewStyle>;
};

export const LoopButton = ({
    title,
    onPress,
    disabled,
    loading,
    variant = 'primary',
    style
}: ButtonProps) => {
    const { theme } = useTheme();
    const isPrimary = variant === 'primary';
    const isSecondary = variant === 'secondary';

    return (
        <Pressable
            accessibilityRole="button"
            onPress={onPress}
            disabled={disabled || loading}
            style={({ pressed }) => [
                styles.base,
                {
                    backgroundColor: isPrimary ? theme.colors.primary : 'transparent',
                    borderColor: isPrimary ? theme.colors.primary : (isSecondary ? theme.colors.primary : theme.colors.border),
                    borderWidth: variant === 'ghost' ? 0 : 1,
                    opacity: pressed ? 0.85 : 1
                },
                style
            ]}
        >
            {loading ? (
                <ActivityIndicator color={isPrimary ? theme.colors.primaryText : theme.colors.primary} />
            ) : (
                <Text
                    style={{
                        color: isPrimary ? theme.colors.primaryText : (isSecondary ? theme.colors.primary : theme.colors.text),
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
