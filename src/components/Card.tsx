import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
} from "react-native";
import { colors, borderRadius, spacing, shadows } from "../styles/theme";

export interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevated?: boolean;
  padding?: number;
  onPress?: () => void;
  borderWidth?: number;
  borderColor?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  elevated = false,
  padding = spacing.lg,
  onPress,
  borderWidth = 0,
  borderColor = "transparent",
}) => {
  const shadowStyle = elevated ? shadows.xl : shadows.lg;
  const CardComponent: React.ElementType = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.8 : 1}
      style={[
        styles.card,
        {
          padding,
          backgroundColor: colors.neutral.white,
          borderRadius: borderRadius.xl,
          borderWidth,
          borderColor,
          ...(shadowStyle as any),
        },
        style,
      ]}
    >
      {children}
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.xl,
    overflow: "hidden",
  },
});
