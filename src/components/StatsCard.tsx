import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../styles/theme';

export interface StatsCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  unit,
  trend,
  icon,
  style,
}) => {
  return (
    <View style={[styles.card, style]}>
      {icon && <View style={styles.icon}>{icon}</View>}

      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.valueRow}>
          <Text style={styles.value}>{value}</Text>
          {unit && <Text style={styles.unit}>{unit}</Text>}
        </View>

        {trend && (
          <Text
            style={[
              styles.trend,
              { color: trend.isPositive ? colors.success.main : colors.danger.main },
            ]}
          >
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  value: {
    ...typography.h3,
    fontWeight: '700',
    color: colors.text,
  },
  unit: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  trend: {
    ...typography.caption,
    fontWeight: '600',
  },
});
