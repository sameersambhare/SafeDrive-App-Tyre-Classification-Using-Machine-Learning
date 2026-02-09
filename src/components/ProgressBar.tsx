import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, spacing } from '@/styles/theme';

interface ProgressBarProps {
  percentage: number;
  label?: string;
  color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  label,
  color = colors.primary.main,
}: ProgressBarProps) => {
  const validPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.header}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.percentage}>{Math.round(validPercentage)}%</Text>
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
    fontSize: 13,
    fontWeight: '500',
    color: colors.text,
  },
  percentage: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  barContainer: {
    height: 8,
    backgroundColor: colors.neutral.gray200,
    borderRadius: 4,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
});
