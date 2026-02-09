import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../styles/theme';

export interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  onPress?: () => void;
}

const variantColors = {
  primary: { bg: colors.primary[100], text: colors.primary[900] },
  secondary: { bg: colors.secondary[100], text: colors.secondary[900] },
  success: { bg: colors.success[100], text: colors.success[900] },
  warning: { bg: colors.warning[100], text: colors.warning[900] },
  danger: { bg: colors.danger[100], text: colors.danger[900] },
  info: { bg: colors.info[100], text: colors.info[900] },
};

const sizeStyles = {
  sm: { paddingVertical: spacing.xs, paddingHorizontal: spacing.sm, fontSize: 11 },
  md: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md, fontSize: 12 },
  lg: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg, fontSize: 13 },
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  icon,
  onPress,
}) => {
  const { bg, text } = variantColors[variant];
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
