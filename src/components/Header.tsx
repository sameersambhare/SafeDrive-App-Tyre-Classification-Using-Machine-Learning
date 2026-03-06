import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import {
  colors,
  spacing,
  borderRadius,
  shadows,
  typography,
} from "@/styles/theme";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  variant?: "default" | "elevated" | "transparent";
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onBackPress,
  rightComponent,
  variant = "default",
}: HeaderProps) => {
  const backButtonStyle = onBackPress
    ? styles.backButtonActive
    : styles.backButtonDisabled;

  return (
    <View
      style={[
        styles.container,
        variant === "elevated" && styles.containerElevated,
        variant === "transparent" && styles.containerTransparent,
      ]}
    >
      <TouchableOpacity
        onPress={onBackPress}
        style={[styles.backButton, backButtonStyle]}
        disabled={!onBackPress}
        activeOpacity={0.6}
      >
        <Text style={styles.backButtonText}>{onBackPress ? "‹" : ""}</Text>
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.rightComponent}>{rightComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    backgroundColor: colors.surface,
  },
  containerElevated: {
    borderBottomWidth: 0,
    ...(shadows.md as any),
  },
  containerTransparent: {
    borderBottomWidth: 0,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
    borderRadius: borderRadius.lg,
  },
  backButtonActive: {
    backgroundColor: colors.neutral[50],
  },
  backButtonDisabled: {
    backgroundColor: "transparent",
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.text,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    ...typography.h5,
    color: colors.text,
    marginBottom: 2,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  rightComponent: {
    width: 44,
    justifyContent: "center",
    alignItems: "center",
  },
});
