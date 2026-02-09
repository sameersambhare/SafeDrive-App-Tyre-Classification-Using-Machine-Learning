import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Text, Button, Card, Divider, Switch } from 'react-native-paper';

import { colors, spacing, borderRadius } from '@/styles/theme';

type Props = any;

const ProfileScreen = ({ navigation }: Props) => {
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => navigation.replace('Login'),
        style: 'destructive',
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Profile</Text>
          <View style={styles.placeholder} />
        </View>

        {/* User Card */}
        <Card style={styles.userCard}>
          <Card.Content style={styles.userContent}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>J</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.userEmail}>john.doe@email.com</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>

          <Card style={styles.settingCard}>
            <Card.Content style={styles.settingContent}>
              <View>
                <Text style={styles.settingLabel}>Full Name</Text>
                <Text style={styles.settingValue}>John Doe</Text>
              </View>
              <Text style={styles.editText}>Edit</Text>
            </Card.Content>
          </Card>

          <Card style={styles.settingCard}>
            <Card.Content style={styles.settingContent}>
              <View>
                <Text style={styles.settingLabel}>Email Address</Text>
                <Text style={styles.settingValue}>john.doe@email.com</Text>
              </View>
              <Text style={styles.editText}>Edit</Text>
            </Card.Content>
          </Card>

          <Card style={styles.settingCard}>
            <Card.Content style={styles.settingContent}>
              <View>
                <Text style={styles.settingLabel}>Phone Number</Text>
                <Text style={styles.settingValue}>+1 (555) 123-4567</Text>
              </View>
              <Text style={styles.editText}>Edit</Text>
            </Card.Content>
          </Card>

          <TouchableOpacity style={styles.changePasswordButton}>
            <Text style={styles.changePasswordText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        {/* Notifications & Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <Card style={styles.preferenceCard}>
            <Card.Content style={styles.preferenceContent}>
              <View>
                <Text style={styles.preferenceLabel}>Push Notifications</Text>
                <Text style={styles.preferenceDescription}>
                  Receive alerts about tyre conditions
                </Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                color={colors.primary.main}
              />
            </Card.Content>
          </Card>

          <Card style={styles.preferenceCard}>
            <Card.Content style={styles.preferenceContent}>
              <View>
                <Text style={styles.preferenceLabel}>Safety Reminders</Text>
                <Text style={styles.preferenceDescription}>
                  Get reminders for regular tyre checks
                </Text>
              </View>
              <Switch
                value={reminders}
                onValueChange={setReminders}
                color={colors.primary.main}
              />
            </Card.Content>
          </Card>
        </View>

        {/* App Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>

          <Card style={styles.infoCard}>
            <Card.Content style={styles.infoContent}>
              <View>
                <Text style={styles.infoLabel}>App Version</Text>
                <Text style={styles.infoValue}>1.0.0</Text>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.infoCard}>
            <Card.Content style={styles.infoContent}>
              <View>
                <Text style={styles.infoLabel}>Last Backup</Text>
                <Text style={styles.infoValue}>Today at 10:30 AM</Text>
              </View>
            </Card.Content>
          </Card>

          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Terms of Service</Text>
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Button
            mode="contained"
            onPress={handleLogout}
            style={styles.logoutButton}
            labelStyle={styles.logoutButtonLabel}
          >
            Logout
          </Button>

          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  placeholder: {
    width: 20,
  },
  userCard: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    elevation: 2,
  },
  userContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.neutral.white,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  userEmail: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  settingCard: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    elevation: 1,
  },
  settingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  settingValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  editText: {
    fontSize: 13,
    color: colors.primary.main,
    fontWeight: '500',
  },
  changePasswordButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.primary.light,
    borderRadius: borderRadius.lg,
    marginTop: spacing.md,
  },
  changePasswordText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary.main,
    textAlign: 'center',
  },
  preferenceCard: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    elevation: 1,
  },
  preferenceContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preferenceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  preferenceDescription: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  infoCard: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    elevation: 1,
  },
  infoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  linkButton: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  linkText: {
    fontSize: 14,
    color: colors.primary.main,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: colors.primary.main,
    paddingVertical: spacing.md,
    marginTop: spacing.lg,
  },
  logoutButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    paddingVertical: spacing.md,
    marginTop: spacing.md,
  },
  deleteButtonText: {
    fontSize: 14,
    color: colors.danger.main,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ProfileScreen;
