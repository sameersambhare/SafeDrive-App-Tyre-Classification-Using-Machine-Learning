import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Text, Switch } from "react-native-paper";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
} from "@/styles/theme";

type Props = any;

const ProfileScreen = ({ navigation }: Props) => {
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", onPress: () => {}, style: "cancel" },
      {
        text: "Logout",
        onPress: () => navigation.replace("Login"),
        style: "destructive",
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButtonContainer}
          >
            <Text style={styles.backButton}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Profile</Text>
          <View style={styles.placeholder} />
        </View>

        {/* User Profile Section */}
        <View style={styles.userCardContainer}>
          <View style={styles.userCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.userEmail}>john.doe@email.com</Text>
              <View style={styles.userMeta}>
                <Text style={styles.userMetaText}>👤 Member since 2024</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>

          <View style={styles.settingsGroup}>
            <View style={styles.settingItem}>
              <View style={styles.settingIcon}>
                <Text>👤</Text>
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Full Name</Text>
                <Text style={styles.settingValue}>John Doe</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.settingItem}>
              <View style={styles.settingIcon}>
                <Text>📧</Text>
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Email Address</Text>
                <Text style={styles.settingValue}>john.doe@email.com</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.settingItem}>
              <View style={styles.settingIcon}>
                <Text>📱</Text>
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Phone Number</Text>
                <Text style={styles.settingValue}>+1 (555) 123-4567</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.changePasswordButton}>
            <Text style={styles.changePasswordIcon}>🔐</Text>
            <Text style={styles.changePasswordText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences & Notifications</Text>

          <View style={styles.preferenceGroup}>
            <View style={styles.preferenceItem}>
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
            </View>

            <View style={styles.divider} />

            <View style={styles.preferenceItem}>
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
            </View>

            <View style={styles.divider} />

            <View style={styles.preferenceItem}>
              <View>
                <Text style={styles.preferenceLabel}>Data Collection</Text>
                <Text style={styles.preferenceDescription}>
                  Help improve safety features
                </Text>
              </View>
              <Switch
                value={dataSharing}
                onValueChange={setDataSharing}
                color={colors.primary.main}
              />
            </View>
          </View>
        </View>

        {/* App Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>

          <View style={styles.infoGroup}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Version</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Last Backup</Text>
              <Text style={styles.infoValue}>Today, 10:30 AM</Text>
            </View>
          </View>

          <View style={styles.linkSection}>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkIcon}>📄</Text>
              <Text style={styles.linkText}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkIcon}>⚖️</Text>
              <Text style={styles.linkText}>Terms of Service</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkIcon}>ℹ️</Text>
              <Text style={styles.linkText}>About SafeDrive</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.dangerSection}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutIcon}>🚪</Text>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteIcon}>🗑️</Text>
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
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    backgroundColor: colors.surface,
  },
  backButtonContainer: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: borderRadius.lg,
    backgroundColor: colors.neutral[50],
  },
  backButton: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.text,
  },
  title: {
    ...typography.h5,
    color: colors.text,
    fontWeight: "700",
  },
  placeholder: {
    width: 44,
  },
  userCardContainer: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  userCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    ...(shadows.lg as any),
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.primary.main,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.lg,
  },
  avatarText: {
    ...typography.h5,
    fontWeight: "700",
    color: colors.neutral.white,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...typography.h6,
    color: colors.text,
    marginBottom: spacing.xs,
    fontWeight: "700",
  },
  userEmail: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  userMeta: {
    marginTop: spacing.sm,
  },
  userMetaText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  editProfileButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary[100],
    borderRadius: borderRadius.md,
  },
  editProfileText: {
    ...typography.caption,
    color: colors.primary.main,
    fontWeight: "700",
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h6,
    color: colors.text,
    fontWeight: "700",
    marginBottom: spacing.lg,
  },
  settingsGroup: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: "hidden",
    ...(shadows.sm as any),
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: spacing.lg,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    fontWeight: "600",
  },
  settingValue: {
    ...typography.body2,
    color: colors.text,
    fontWeight: "500",
  },
  chevron: {
    fontSize: 20,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
  },
  changePasswordButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary[100],
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    marginTop: spacing.lg,
  },
  changePasswordIcon: {
    fontSize: 18,
    marginRight: spacing.md,
  },
  changePasswordText: {
    ...typography.subtitle2,
    color: colors.primary.main,
    fontWeight: "700",
  },
  preferenceGroup: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: "hidden",
    ...(shadows.sm as any),
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  preferenceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  preferenceLabel: {
    ...typography.subtitle2,
    color: colors.text,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  preferenceDescription: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  infoGroup: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: "hidden",
    ...(shadows.sm as any),
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  infoLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: "600",
  },
  infoValue: {
    ...typography.body2,
    color: colors.text,
    fontWeight: "500",
  },
  linkSection: {
    marginTop: spacing.lg,
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    ...(shadows.sm as any),
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  linkIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  linkText: {
    ...typography.body2,
    color: colors.primary.main,
    fontWeight: "600",
  },
  dangerSection: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.neutral.white,
    borderWidth: 1.5,
    borderColor: colors.primary.main,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },
  logoutIcon: {
    fontSize: 18,
    marginRight: spacing.md,
  },
  logoutButtonText: {
    ...typography.button,
    color: colors.primary.main,
    fontWeight: "700",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.danger[50],
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: colors.danger.light,
  },
  deleteIcon: {
    fontSize: 18,
    marginRight: spacing.md,
  },
  deleteButtonText: {
    ...typography.button,
    color: colors.danger.main,
    fontWeight: "700",
  },
});

export default ProfileScreen;
