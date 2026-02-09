import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, spacing, borderRadius } from '@/styles/theme';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBackPress,
  rightComponent,
}: HeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onBackPress}
        style={styles.backButton}
        disabled={!onBackPress}
      >
        <Text style={styles.backButtonText}>
          {onBackPress ? '←' : ''}
        </Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightComponent}>{rightComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    textAlign: 'center',
  },
  rightComponent: {
    width: 40,
  },
});
