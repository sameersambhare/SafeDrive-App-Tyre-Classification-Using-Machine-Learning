import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, spacing, borderRadius, typography } from '@/styles/theme';

interface ProgressBarProps {
  percentage: number;
  label?: string;
  color?: string;
  showPercentage?: boolean;
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  label,
  color = colors.primary.main,
  showPercentage = true,
  animated = true,
}: ProgressBarProps) => {
  const validPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.header}>
          <Text style={styles.label}>{label}</Text>
          {showPercentage && (
            <Text style={[styles.percentage, { color }]}>{Math.round(validPercentage)}%</Text>
          )}
        </View>
      )}
      <View style={styles.barContainer}>
        <View
          style={[
            styles.bar,
            {
              width: `${validPercentage}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.subtitle2,
    color: colors.text,
    fontWeight: '600',
  },
  percentage: {
    ...typography.subtitle2,
    fontWeight: '700',
  },
  barContainer: {
    height: 10,
    backgroundColor: colors.neutral[200],
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
});
