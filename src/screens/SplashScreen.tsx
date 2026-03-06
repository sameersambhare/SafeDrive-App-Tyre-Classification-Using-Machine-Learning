import React, { useEffect } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import { colors, spacing, shadows } from "@/styles/theme";

type Props = any;

const SplashScreen = ({ navigation }: Props) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace("Onboarding");
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🛡️</Text>
        </View>
        <Text style={styles.title}>SafeDrive</Text>
        <Text style={styles.subtitle}>AI-Powered Tyre Safety</Text>
        <Text style={styles.description}>Enterprise-Grade Protection</Text>
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.loader}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotDelay]} />
          <View style={[styles.dot, styles.dotDelay2]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.main,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: spacing.xl,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 80,
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  logo: {
    fontSize: 64,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: colors.neutral.white,
    marginBottom: spacing.sm,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: spacing.md,
    fontWeight: "500",
  },
  description: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  footer: {
    position: "absolute",
    bottom: spacing.xxxl,
  },
  loader: {
    flexDirection: "row",
    gap: spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  dotDelay: {
    opacity: 0.6,
  },
  dotDelay2: {
    opacity: 0.3,
  },
});

export default SplashScreen;
