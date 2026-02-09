import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, spacing } from '@/styles/theme';

type Props = any;

const SplashScreen = ({ navigation }: Props) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🚗</Text>
        </View>
        <Text style={styles.title}>SafeDrive</Text>
        <Text style={styles.subtitle}>AI-Powered Tyre Safety</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: spacing.lg,
  },
  logo: {
    fontSize: 64,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.neutral.white,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.neutral.white,
    opacity: 0.8,
  },
});

export default SplashScreen;
