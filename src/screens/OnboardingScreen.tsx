import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { Text } from "react-native-paper";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
} from "@/styles/theme";

type Props = any;

const { width } = Dimensions.get("window");

const OnboardingScreen = ({ navigation }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const scaleAnim = new Animated.Value(0.8);

  const slides = [
    {
      title: "Welcome to SafeDrive",
      description:
        "Your enterprise-grade AI-powered tyre safety companion for professional fleet management",
      icon: "🛡️",
      color: colors.primary.main,
    },
    {
      title: "Intelligent Scanning",
      description:
        "Advanced AI technology captures and analyzes tyre conditions with precision",
      icon: "🔍",
      color: colors.secondary.main,
    },
    {
      title: "Detailed Analytics",
      description:
        "Get comprehensive insights and predictive maintenance recommendations",
      icon: "📊",
      color: colors.info.main,
    },
    {
      title: "Stay Protected",
      description:
        "Maintain your fleet with confidence and real-time safety monitoring",
      icon: "✓",
      color: colors.success.main,
    },
  ];

  const handleNext = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.8,
      duration: 0,
      useNativeDriver: true,
    }).start();

    if (currentStep < slides.length - 1) {
      setCurrentStep(currentStep + 1);
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }).start();
    } else {
      navigation.replace("Login");
    }
  };

  const handleSkip = () => {
    navigation.replace("Login");
  };

  const slide = slides[currentStep];
  const progress = (currentStep + 1) / slides.length;

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Progress Bar */}
        <View style={styles.header}>
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, { width: `${progress * 100}%` }]}
            />
          </View>
          <View style={styles.headerRow}>
            <Text style={styles.stepIndicator}>
              {currentStep + 1} of {slides.length}
            </Text>
            <TouchableOpacity onPress={handleSkip}>
              <Text style={styles.skipButton}>Skip</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <Animated.View
          style={[styles.content, { transform: [{ scale: scaleAnim }] }]}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${slide.color}20` },
            ]}
          >
            <Text style={styles.icon}>{slide.icon}</Text>
          </View>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.description}>{slide.description}</Text>
        </Animated.View>

        {/* Dots Indicator */}
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                index === currentStep && [
                  styles.activeDot,
                  { backgroundColor: slide.color },
                ],
              ]}
            />
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: slide.color }]}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonLabel}>
              {currentStep === slides.length - 1 ? "Get Started" : "Continue"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: spacing.lg,
  },
  header: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xxxl,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: colors.neutral.gray200,
    borderRadius: borderRadius.full,
    overflow: "hidden",
    marginBottom: spacing.lg,
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.primary.main,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stepIndicator: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: "600",
  },
  skipButton: {
    ...typography.subtitle2,
    color: colors.primary.main,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xxxl,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  icon: {
    fontSize: 56,
  },
  title: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: "center",
  },
  description: {
    ...typography.body1,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xxl,
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.neutral.gray200,
  },
  activeDot: {
    width: 28,
    borderRadius: 4,
  },
  buttonContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  nextButton: {
    paddingVertical: 16,
    borderRadius: borderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    ...(shadows.lg as any),
  },
  buttonLabel: {
    ...typography.button,
    color: colors.neutral.white,
  },
});

export default OnboardingScreen;
