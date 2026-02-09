import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { colors, inputStyles, spacing, typography, borderRadius, shadows } from '../styles/theme';

export interface TextFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url';
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  required?: boolean;
  maxLength?: number;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  onFocus,
  error,
  helperText,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'none',
  autoCorrect = false,
  required = false,
  maxLength,
  icon,
  rightIcon,
  onRightIconPress,
  style,
  inputStyle,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { color: error ? colors.danger.main : colors.text }]}>
            {label}
            {required && <Text style={styles.required}>*</Text>}
          </Text>
          {maxLength && (
            <Text style={styles.charCount}>
              {value.length}/{maxLength}
            </Text>
          )}
        </View>
      )}

      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          error && styles.inputWrapperError,
          disabled && styles.inputWrapperDisabled,
          ...shadows.sm as any,
        ]}
      >
        {icon && <View style={styles.leftIcon}>{icon}</View>}

        <TextInput
          style={[
            styles.input,
            { paddingLeft: icon ? 0 : spacing.lg },
            { paddingRight: rightIcon ? 0 : spacing.lg },
            disabled && styles.inputDisabled,
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          secureTextEntry={isSecure}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          maxLength={maxLength}
        />

        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIcon}
            disabled={disabled}
            activeOpacity={0.6}
          >
            {rightIcon}
          </TouchableOpacity>
        )}

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsSecure(!isSecure)}
            style={styles.rightIcon}
            disabled={disabled}
            activeOpacity={0.6}
          >
            <Text style={styles.eyeIcon}>{isSecure ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
      {helperText && !error && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.subtitle2,
    fontWeight: '600',
  },
  required: {
    color: colors.danger.main,
    marginLeft: spacing.xs,
  },
  charCount: {
    ...typography.caption,
    color: colors.textTertiary,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    backgroundColor: colors.neutral.white,
    paddingHorizontal: spacing.md,
  },
  inputWrapperFocused: {
    borderColor: colors.primary.main,
    backgroundColor: colors.neutral.white,
  },
  inputWrapperError: {
    borderColor: colors.danger.main,
  },
  inputWrapperDisabled: {
    backgroundColor: colors.neutral[100],
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    ...typography.body1,
    color: colors.text,
  },
  inputDisabled: {
    color: colors.textTertiary,
  },
  leftIcon: {
    marginRight: spacing.sm,
  },
  rightIcon: {
    padding: spacing.sm,
    marginLeft: spacing.sm,
  },
  eyeIcon: {
    fontSize: 18,
  },
  errorText: {
    ...typography.caption,
    color: colors.danger.main,
    marginTop: spacing.sm,
  },
  helperText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
});
