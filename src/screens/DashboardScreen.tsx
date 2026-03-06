import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native-paper";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
} from "@/styles/theme";

type Props = any;

const DashboardScreen = ({ navigation }: Props) => {
  const [userName, setUserName] = useState("User");
  const [safetyStatus, setSafetyStatus] = useState<
    "good" | "warning" | "danger"
  >("good");
  const [scansThisMonth, setScansThisMonth] = useState(12);

  useEffect(() => {
    // Retrieve stored user name
    setUserName("John Doe");
    setSafetyStatus("good");
  }, []);

  const getStatusColor = () => {
    switch (safetyStatus) {
      case "good":
        return colors.success.main;
      case "warning":
        return colors.warning.main;
      case "danger":
        return colors.danger.main;
      default:
        return colors.success.main;
    }
  };

  const getStatusText = () => {
    switch (safetyStatus) {
      case "good":
        return "Perfect";
      case "warning":
        return "Needs Check";
      case "danger":
        return "Action Required";
      default:
        return "Good";
    }
  };

  const quickAccessItems = [
    {
      title: "Scan Tyre",
      description: "New analysis",
      icon: "📸",
      screen: "Capture",
      color: colors.primary.main,
    },
    {
      title: "History",
      description: "Past scans",
      icon: "📋",
      screen: "History",
      color: colors.secondary.main,
    },
    {
      title: "Reports",
      description: "Download",
      icon: "📄",
      screen: "History",
      color: colors.info.main,
    },
    {
      title: "Settings",
      description: "Account",
      icon: "⚙️",
      screen: "Profile",
      color: colors.warning.main,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <LinearGradient
          colors={[colors.primary.main, colors.primary[800]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.greeting}>Welcome back</Text>
              <Text style={styles.userName}>{userName}</Text>
            </View>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => navigation.navigate("Profile")}
              activeOpacity={0.7}
            >
              <Text style={styles.profileInitial}>
                {userName.charAt(0).toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Safety Status Card */}
        <View style={styles.statusCardContainer}>
          <View style={[styles.statusCard, { borderColor: getStatusColor() }]}>
            <View style={styles.statusContentRow}>
              <View style={styles.statusLeft}>
                <View
                  style={[
                    styles.statusIndicator,
                    { backgroundColor: getStatusColor() },
                  ]}
                />
                <View>
                  <Text style={styles.statusLabel}>Current Status</Text>
                  <Text
                    style={[styles.statusValue, { color: getStatusColor() }]}
                  >
                    {getStatusText()}
                  </Text>
                </View>
              </View>
              <Text style={styles.statusEmoji}>✓</Text>
            </View>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{scansThisMonth}</Text>
            <Text style={styles.statLabel}>Scans this month</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>98%</Text>
            <Text style={styles.statLabel}>Fleet health</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Alerts</Text>
          </View>
        </View>

        {/* Quick Access Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <View style={styles.gridContainer}>
            {quickAccessItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickAccessCard}
                onPress={() => navigation.navigate(item.screen)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.iconBg,
                    { backgroundColor: `${item.color}15` },
                  ]}
                >
                  <Text style={styles.cardIcon}>{item.icon}</Text>
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Scans</Text>
            <TouchableOpacity onPress={() => navigation.navigate("History")}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.activityCard}
            onPress={() => navigation.navigate("Results")}
            activeOpacity={0.7}
          >
            <View style={styles.activityLeft}>
              <View style={styles.activityIconBg}>
                <Text style={styles.activityIcon}>🔍</Text>
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Front Left Tyre</Text>
                <Text style={styles.activityDate}>Today, 2:30 PM</Text>
              </View>
            </View>
            <View
              style={[
                styles.activityBadge,
                { backgroundColor: colors.success.light },
              ]}
            >
              <Text
                style={[styles.activityStatus, { color: colors.success.main }]}
              >
                Good
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.activityCard}
            onPress={() => navigation.navigate("Results")}
            activeOpacity={0.7}
          >
            <View style={styles.activityLeft}>
              <View style={styles.activityIconBg}>
                <Text style={styles.activityIcon}>⚠️</Text>
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Rear Right Tyre</Text>
                <Text style={styles.activityDate}>Yesterday, 5:00 PM</Text>
              </View>
            </View>
            <View
              style={[
                styles.activityBadge,
                { backgroundColor: colors.warning.light },
              ]}
            >
              <Text
                style={[styles.activityStatus, { color: colors.warning.main }]}
              >
                Check
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <Text style={styles.helpIcon}>💡</Text>
          <Text style={styles.helpTitle}>
            How to get the most out of SafeDrive?
          </Text>
          <Text style={styles.helpDescription}>
            Regular scans help maintain optimal tyre health and safety
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  headerGradient: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    ...typography.caption,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: spacing.xs,
  },
  userName: {
    ...typography.h5,
    color: colors.neutral.white,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  profileInitial: {
    color: colors.neutral.white,
    ...typography.h6,
    fontWeight: "700",
  },
  statusCardContainer: {
    paddingHorizontal: spacing.lg,
    marginTop: -spacing.lg,
    marginBottom: spacing.xl,
  },
  statusCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 2,
    ...(shadows.lg as any),
  },
  statusContentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  statusIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  statusLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: "500",
    marginBottom: spacing.xs,
  },
  statusValue: {
    ...typography.h6,
    fontWeight: "700",
  },
  statusEmoji: {
    fontSize: 24,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: "center",
    ...(shadows.sm as any),
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  statValue: {
    ...typography.h5,
    color: colors.primary.main,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: "center",
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h5,
    color: colors.text,
    fontWeight: "700",
  },
  viewAll: {
    ...typography.subtitle2,
    color: colors.primary.main,
    fontWeight: "600",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    justifyContent: "space-between",
  },
  quickAccessCard: {
    width: "48%",
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: "center",
    ...(shadows.sm as any),
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  iconBg: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  cardIcon: {
    fontSize: 28,
  },
  cardTitle: {
    ...typography.subtitle2,
    color: colors.text,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  cardDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: "center",
  },
  activityCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...(shadows.sm as any),
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  activityLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  activityIconBg: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.neutral[50],
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  activityIcon: {
    fontSize: 24,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    ...typography.subtitle2,
    color: colors.text,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  activityDate: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  activityBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  activityStatus: {
    ...typography.buttonSmall,
    fontWeight: "600",
  },
  helpSection: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    backgroundColor: `${colors.primary.main}10`,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: `${colors.primary.main}30`,
    alignItems: "center",
  },
  helpIcon: {
    fontSize: 32,
    marginBottom: spacing.md,
  },
  helpTitle: {
    ...typography.subtitle2,
    color: colors.text,
    fontWeight: "600",
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  helpDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: "center",
  },
});

export default DashboardScreen;
