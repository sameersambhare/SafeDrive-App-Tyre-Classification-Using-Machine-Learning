import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Text, Switch, TextInput, ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
} from "@/styles/theme";
import { useAuthStore } from "@/utils/store";
import { userAPI } from "@/utils/api";

type Props = any;

const ProfileScreen = ({ navigation }: Props) => {
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [memberSince, setMemberSince] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const user = useAuthStore((state) => state.user);
  const setSession = useAuthStore((state) => state.setSession);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const loadProfile = async () => {
    if (!user?.id && !user?.email) return;

    try {
      setLoadingProfile(true);
      const response = await userAPI.getProfile({
        user_id: user?.id,
        email: user?.email,
      });
      const profile = response.data;

      setName(profile.fullName || "");
      setEmail(profile.email || "");
      setPhone(profile.phone || "");
      setMemberSince(
        profile.created_at
          ? new Date(profile.created_at).toLocaleDateString()
          : ""
      );

      setSession(
        {
          id: profile.id,
          name: profile.fullName || "",
          email: profile.email || "",
          phone: profile.phone || "",
        },
        token
      );
    } catch (error: any) {
      const message =
        error?.response?.data?.error || "Failed to load profile from database.";
      Alert.alert("Profile Error", message);
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [user?.id, user?.email]);

  const handleSaveProfile = async () => {
    try {
      setSavingProfile(true);
      const response = await userAPI.updateProfile({
        user_id: user?.id,
        email: user?.email,
        fullName: name,
        phone,
      });
      const profile = response.data;
      setName(profile.fullName || "");
      setEmail(profile.email || "");
      setPhone(profile.phone || "");
      setSession(
        {
          id: profile.id,
          name: profile.fullName || "",
          email: profile.email || "",
          phone: profile.phone || "",
        },
        token
      );
      setIsEditing(false);
    } catch (error: any) {
      const message = error?.response?.data?.error || "Failed to update profile.";
      Alert.alert("Update Failed", message);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", onPress: () => {}, style: "cancel" },
      {
        text: "Logout",
        onPress: () => {
          logout();
          navigation.replace("Login");
        },
        style: "destructive",
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This will permanently remove your account from MongoDB. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setDeleting(true);
              await userAPI.deleteAccount({
                email: email.trim(),
                user_id: user?.id,
              });
              logout();
              Alert.alert("Deleted", "Your account has been deleted.");
              navigation.replace("Login");
            } catch (error: any) {
              const message =
                error?.response?.data?.error ||
                "Failed to delete account. Please try again.";
              Alert.alert("Delete Failed", message);
            } finally {
              setDeleting(false);
            }
          },
        },
      ]
    );
  };

  const handleBack = () => {
    if (navigation.canGoBack && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.replace("Dashboard");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButtonContainer}
          >
            <Icon name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity onPress={loadProfile} style={styles.placeholder}>
            <Text style={styles.refreshText}>Refresh</Text>
          </TouchableOpacity>
        </View>

        {loadingProfile ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <>
            <View style={styles.userCardContainer}>
              <View style={styles.userCard}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{(name || "U").charAt(0)}</Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{name || "-"}</Text>
                  <Text style={styles.userEmail}>{email || "-"}</Text>
                  <View style={styles.userMeta}>
                    <Text style={styles.userMetaText}>
                      {memberSince ? `Member since ${memberSince}` : "Member"}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.editProfileButton}
                  onPress={() => setIsEditing(true)}
                >
                  <Text style={styles.editProfileText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account Settings</Text>

              {isEditing ? (
                <View>
                  <TextInput
                    label="Full Name"
                    value={name}
                    mode="outlined"
                    onChangeText={setName}
                    style={styles.inputField}
                  />
                  <TextInput
                    label="Email Address"
                    value={email}
                    mode="outlined"
                    keyboardType="email-address"
                    disabled
                    style={styles.inputField}
                  />
                  <TextInput
                    label="Phone Number"
                    value={phone}
                    mode="outlined"
                    keyboardType="phone-pad"
                    onChangeText={setPhone}
                    style={styles.inputField}
                  />

                  <View style={styles.editActions}>
                    <TouchableOpacity
                      style={[styles.editButton, styles.saveButton]}
                      onPress={handleSaveProfile}
                      disabled={savingProfile}
                    >
                      {savingProfile ? (
                        <ActivityIndicator color={colors.neutral.white} />
                      ) : (
                        <Text style={styles.editButtonText}>Save</Text>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.editButton, styles.cancelButton]}
                      onPress={() => setIsEditing(false)}
                    >
                      <Text style={styles.editButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.settingsGroup}>
                  <View style={styles.settingItem}>
                    <View style={styles.settingIcon}>
                      <Icon name="account" size={20} color={colors.primary.main} />
                    </View>
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingLabel}>Full Name</Text>
                      <Text style={styles.settingValue}>{name || "-"}</Text>
                    </View>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.settingItem}>
                    <View style={styles.settingIcon}>
                      <Icon
                        name="email-outline"
                        size={20}
                        color={colors.primary.main}
                      />
                    </View>
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingLabel}>Email Address</Text>
                      <Text style={styles.settingValue}>{email || "-"}</Text>
                    </View>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.settingItem}>
                    <View style={styles.settingIcon}>
                      <Icon
                        name="phone-outline"
                        size={20}
                        color={colors.primary.main}
                      />
                    </View>
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingLabel}>Phone Number</Text>
                      <Text style={styles.settingValue}>{phone || "-"}</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </>
        )}

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

        <View style={styles.dangerSection}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteAccount}
            disabled={deleting}
          >
            {deleting ? (
              <ActivityIndicator color={colors.danger.main} />
            ) : (
              <Text style={styles.deleteButtonText}>Delete Account</Text>
            )}
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
  refreshText: {
    ...typography.caption,
    color: colors.primary.main,
    fontWeight: "700",
  },
  backButtonContainer: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: borderRadius.lg,
    backgroundColor: colors.neutral[50],
  },
  title: {
    ...typography.h5,
    color: colors.text,
    fontWeight: "700",
  },
  placeholder: {
    minWidth: 44,
    alignItems: "flex-end",
  },
  loadingContainer: {
    paddingVertical: spacing.xl,
    alignItems: "center",
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
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
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
  inputField: {
    marginVertical: spacing.sm,
    backgroundColor: colors.surface,
  },
  editActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.lg,
  },
  editButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: borderRadius.md,
    alignItems: "center",
    marginHorizontal: spacing.sm,
    minHeight: 48,
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: colors.primary.main,
  },
  cancelButton: {
    backgroundColor: colors.neutral[300],
  },
  editButtonText: {
    ...typography.button,
    color: colors.neutral.white,
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
    minHeight: 56,
  },
  deleteButtonText: {
    ...typography.button,
    color: colors.danger.main,
    fontWeight: "700",
  },
});

export default ProfileScreen;
