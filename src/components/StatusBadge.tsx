import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, spacing, borderRadius } from '@/styles/theme';

interface StatusBadgeProps {
  status: 'good' | 'warning' | 'danger';
  label?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'good':
        return colors.success.main;
      case 'warning':
        return colors.warning.main;
      case 'danger':
        return colors.danger.main;
    }
  };

  const getStatusLabel = () => {
    return (
      label ||
      {
        good: 'Good',
        warning: 'Warning',
        danger: 'Danger',
      }[status]
    );
  };

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: getStatusColor() },
      ]}
    >
      <Text style={styles.text}>{getStatusLabel()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  text: {
    color: colors.neutral.white,
    fontSize: 12,
    fontWeight: '500',
  },
});
