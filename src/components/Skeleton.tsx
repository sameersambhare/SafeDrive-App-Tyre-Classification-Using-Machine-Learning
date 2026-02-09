import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, Animated } from 'react-native';
import { colors, spacing, borderRadius } from '../styles/theme';

export interface SkeletonProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  count?: number;
  animation?: 'pulse' | 'shimmer';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = 200,
  height = 16,
  borderRadius: radius = borderRadius.md,
  style,
  count = 1,
  animation = 'pulse',
}) => {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <>
      {skeletons.map((index) => (
        <View
          key={index}
          style={[
            styles.skeleton,
            {
              width,
              height,
              borderRadius: radius,
              backgroundColor: colors.neutral[200],
            },
            index < count - 1 && { marginBottom: spacing.md },
            style,
          ]}
        />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.neutral[200],
  },
});
