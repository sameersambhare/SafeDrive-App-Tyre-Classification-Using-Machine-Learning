import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";
import {
  colors,
  buttonStyles,
  spacing,
  typography,
  shadows,
} from "../styles/theme";

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "ghost"
    | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  style,
  textStyle,
}) => {
  const buttonStyle = buttonStyles.variants[variant];
  const buttonSize = buttonStyles.sizes[size];

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[
        styles.button,
        buttonSize,
        buttonStyle,
        {
          backgroundColor: isDisabled
            ? colors.neutral[100]
            : (buttonStyle as any).backgroundColor,
        },
        fullWidth && styles.fullWidth,
        ...(shadows.lg as any),
        style,
      ]}
    >
      {loading && (
        <ActivityIndicator
          color={
            variant === "ghost" || variant === "outline"
              ? colors.primary.main
              : colors.neutral.white
          }
          size="small"
          style={styles.loader}
        />
      )}

      {!loading && icon && iconPosition === "left" && <>{icon}</>}

      {!loading && (
        <Text
          style={[
            styles.text,
            {
              color: isDisabled
                ? colors.neutral[400]
                : (buttonStyle as any).color || colors.neutral.white,
            },
            textStyle,
          ]}
        >
          {label}
        </Text>
      )}

      {!loading && icon && iconPosition === "right" && <>{icon}</>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  fullWidth: {
    width: "100%",
  },
  text: {
    ...typography.button,
  },
  loader: {
    marginRight: spacing.sm,
  },
});
