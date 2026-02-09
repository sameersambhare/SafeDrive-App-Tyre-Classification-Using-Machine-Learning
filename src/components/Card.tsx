import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors, borderRadius, spacing, shadows } from '../styles/theme';

export interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevated?: boolean;
  padding?: number;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  elevated = false,
  padding = spacing.lg,
  onPress,
}) => {
  const shadowStyle = elevated ? shadows.lg : shadows.md;

  return (
    <View
      style={[
        styles.card,
        {
          padding,
          backgroundColor: colors.neutral.white,
          borderRadius: borderRadius.lg,
          ...(shadowStyle as any),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
});
