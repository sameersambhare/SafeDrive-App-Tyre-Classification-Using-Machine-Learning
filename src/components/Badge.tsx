import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/theme';

export interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  onPress?: () => void;
}

const variantColors = {
  primary: { bg: colors.primary[100], text: colors.primary[900], border: colors.primary[300] },
  secondary: { bg: colors.secondary[100], text: colors.secondary[900], border: colors.secondary[300] },
  success: { bg: colors.success[100], text: colors.success[900], border: colors.success[300] },
  warning: { bg: colors.warning[100], text: colors.warning[900], border: colors.warning[300] },
  danger: { bg: colors.danger[100], text: colors.danger[900], border: colors.danger[300] },
  info: { bg: colors.info[100], text: colors.info[900], border: colors.info[300] },
  outline: { bg: 'transparent', text: colors.text, border: colors.border },
};

const sizeStyles = {
  sm: { paddingVertical: 4, paddingHorizontal: spacing.sm, fontSize: 11 },
  md: { paddingVertical: 6, paddingHorizontal: spacing.md, fontSize: 12 },
  lg: { paddingVertical: 8, paddingHorizontal: spacing.lg, fontSize: 13 },
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  icon,
  onPress,
}) => {
  const { bg, text, border } = variantColors[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[
        styles.badge,
        {
          backgroundColor: bg,
          paddingVertical: sizeStyle.paddingVertical,
          paddingHorizontal: sizeStyle.paddingHorizontal,
          borderRadius: borderRadius.full,
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: border,
        },
      ]}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={[styles.text, { color: text, fontSize: sizeStyle.fontSize }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  icon: {
    marginRight: spacing.xs,
  },
  text: {
    fontWeight: '600',
  },
});
