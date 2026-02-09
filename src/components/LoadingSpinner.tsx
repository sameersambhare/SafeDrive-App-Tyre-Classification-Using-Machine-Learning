import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

export interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = colors.primary.main,
  text,
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {text && (
        <Text style={[styles.text, { color }]}>
          {text}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  text: {
    ...typography.body2,
    marginTop: spacing.md,
  },
});
