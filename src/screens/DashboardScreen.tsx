import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from "@react-navigation/native";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
} from "@/styles/theme";
import { userAPI } from "@/utils/api";
import { useAuthStore } from "@/utils/store";

type Props = any;

const DashboardScreen = ({ navigation }: Props) => {
  const user = useAuthStore((state) => state.user);
  const setSession = useAuthStore((state) => state.setSession);
  const token = useAuthStore((state) => state.token);

  const [loading, setLoading] = useState(false);
  const [safetyStatus, setSafetyStatus] = useState<
    "good" | "warning" | "danger"
  >("good");
  const [scansThisMonth, setScansThisMonth] = useState(0);
  const [fleetHealth, setFleetHealth] = useState(0);
  const [alerts, setAlerts] = useState(0);

  const userName = useMemo(() => user?.name || "User", [user?.name]);

  const loadDashboard = useCallback(async () => {
    if (!user?.id && !user?.email) return;

    try {
      setLoading(true);
      const response = await userAPI.getDashboard({
        user_id: user?.id,
        email: user?.email,
      });
      const data = response.data;

      setSession(
        {
          id: data.user.id,
          name: data.user.fullName,
          email: data.user.email,
          phone: data.user.phone || "",
        },
        token
      );

      setScansThisMonth(data.stats.scans_this_month);
      setFleetHealth(data.stats.fleet_health);
      setAlerts(data.stats.alerts);

      if (data.stats.current_status === "Perfect") setSafetyStatus("good");
      else if (data.stats.current_status === "Needs Check") setSafetyStatus("warning");
      else setSafetyStatus("danger");
    } catch (error) {
      // Keep existing values on transient API errors.
    } finally {
      setLoading(false);
    }
  }, [user?.id, user?.email, setSession, token]);

  useFocusEffect(
    useCallback(() => {
      loadDashboard();

      // Near-real-time updates while dashboard screen is open.
      const intervalId = setInterval(() => {
        loadDashboard();
      }, 5000);

      return () => clearInterval(intervalId);
    }, [loadDashboard])
  );

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
      icon: "camera",
      screen: "Capture",
      color: colors.primary.main,
    },
    {
      title: "History",
      description: "Past scans",
      icon: "history",
      screen: "History",
      color: colors.secondary.main,
    },
    {
      title: "Reports",
      description: "Download",
      icon: "file-download",
      screen: "History",
      color: colors.info.main,
    },
    {
      title: "Settings",
      description: "Account",
      icon: "cog",
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
              {loading ? (
                <ActivityIndicator color={getStatusColor()} />
              ) : (
                <Icon name="check-circle" size={24} color={getStatusColor()} />
              )}
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{scansThisMonth}</Text>
            <Text style={styles.statLabel}>Scans this month</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{fleetHealth}%</Text>
            <Text style={styles.statLabel}>Fleet health</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{alerts}</Text>
            <Text style={styles.statLabel}>Alerts</Text>
          </View>
        </View>

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
                  <Icon name={item.icon} size={28} color={item.color} />
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
  sectionTitle: {
    ...typography.h5,
    color: colors.text,
    fontWeight: "700",
    marginBottom: spacing.lg,
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
});

export default DashboardScreen;
