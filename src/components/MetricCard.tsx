import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Card as PaperCard, Text } from 'react-native-paper';
import { colors, spacing, borderRadius, shadows } from '@/styles/theme';

interface MetricCardProps {
  label: string;
  value: string;
  unit?: string;
  icon?: string;
  style?: ViewStyle;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  icon,
  style,
}: MetricCardProps) => {
  return (
    <PaperCard style={[styles.card, style]}>
      <View style={styles.content}>
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <View>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{value}</Text>
            {unit && <Text style={styles.unit}>{unit}</Text>}
          </View>
        </View>
      </View>
    </PaperCard>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    elevation: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  icon: {
    fontSize: 32,
    marginRight: spacing.lg,
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  unit: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});
