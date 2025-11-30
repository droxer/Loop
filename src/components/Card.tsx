import { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useTheme } from '../providers/ThemeProvider';

type CardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const Card = ({ children, style }: CardProps) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.md,
          borderWidth: 1,
          borderColor: theme.colors.border,
          padding: theme.spacing.md
        },
        style
      ]}
    >
      {children}
    </View>
  );
};
