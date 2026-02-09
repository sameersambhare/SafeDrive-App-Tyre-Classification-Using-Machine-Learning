import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Text, Button } from 'react-native-paper';

import { colors, spacing, borderRadius } from '@/styles/theme';

type Props = any;

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);

  const slides = [
    {
      title: 'Welcome to SafeDrive',
      description: 'Your AI-powered tyre safety companion',
      icon: '🚗',
    },
    {
      title: 'Scan with AI',
      description: 'Take photos of your tyres for instant analysis',
      icon: '📸',
    },
    {
      title: 'Get Insights',
      description: 'Understand tyre conditions with detailed reports',
      icon: '📊',
    },
    {
      title: 'Stay Safe',
      description: 'Maintain your vehicle with confidence',
      icon: '✅',
    },
  ];

  const handleNext = () => {
    if (currentStep < slides.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  const slide = slides[currentStep];

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.stepIndicator}>
            {currentStep + 1} of {slides.length}
          </Text>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipButton}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.icon}>{slide.icon}</Text>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.description}>{slide.description}</Text>
        </View>

        {/* Dots Indicator */}
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentStep && styles.activeDot,
              ]}
            />
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleNext}
            style={styles.nextButton}
            labelStyle={styles.buttonLabel}
          >
            {currentStep === slides.length - 1 ? 'Get Started' : 'Next'}
          </Button>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xxl,
  },
  stepIndicator: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  skipButton: {
    fontSize: 14,
    color: colors.primary.main,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xxl,
  },
  icon: {
    fontSize: 80,
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xxl,
    gap: spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.neutral.gray200,
  },
  activeDot: {
    backgroundColor: colors.primary.main,
    width: 24,
  },
  buttonContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  nextButton: {
    backgroundColor: colors.primary.main,
    paddingVertical: spacing.md,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OnboardingScreen;
