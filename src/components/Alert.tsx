import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/theme';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface AlertProps {
  type: AlertType;
  title?: string;
  message: string;
  onClose?: () => void;
  action?: {
    label: string;
    onPress: () => void;
  };
}

const alertConfig = {
  success: {
    bgColor: colors.success[50],
    borderColor: colors.success.main,
    textColor: colors.success[900],
    icon: '✓',
  },
  error: {
    bgColor: colors.danger[50],
    borderColor: colors.danger.main,
    textColor: colors.danger[900],
    icon: '✕',
  },
  warning: {
    bgColor: colors.warning[50],
    borderColor: colors.warning.main,
    textColor: colors.warning[900],
    icon: '⚠',
  },
  info: {
    bgColor: colors.info[50],
    borderColor: colors.info.main,
    textColor: colors.info[900],
    icon: 'ℹ',
  },
};

export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  onClose,
  action,
}) => {
  const config = alertConfig[type];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: config.bgColor,
          borderColor: config.borderColor,
        },
        ...shadows.sm as any,
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.icon, { color: config.textColor }]}>
          {config.icon}
        </Text>

        <View style={styles.textContainer}>
          {title && (
            <Text style={[styles.title, { color: config.textColor }]}>
              {title}
            </Text>
          )}
          <Text style={[styles.message, { color: config.textColor }]}>
            {message}
          </Text>
        </View>

        {onClose && (
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={[styles.closeIcon, { color: config.textColor }]}>×</Text>
          </TouchableOpacity>
        )}
      </View>

      {action && (
        <TouchableOpacity
          style={[styles.action, { borderColor: config.borderColor }]}
          onPress={action.onPress}
        >
          <Text style={[styles.actionText, { color: config.textColor }]}>
            {action.label}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  icon: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: spacing.xs,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...typography.subtitle2,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  message: {
    ...typography.body2,
  },
  closeButton: {
    padding: spacing.sm,
    marginTop: -spacing.sm,
    marginRight: -spacing.sm,
  },
  closeIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  action: {
    borderTopWidth: 1,
    marginTop: spacing.md,
    paddingTop: spacing.md,
    alignItems: 'center',
  },
  actionText: {
    ...typography.button,
    fontWeight: '600',
  },
});
