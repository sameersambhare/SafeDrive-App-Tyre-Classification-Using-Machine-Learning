/**
 * Professional Enterprise-Level Login Screen
 * Demonstrates best practices in form handling, validation, and UX
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
} from '@/styles/theme';
import {
  Button,
  TextField,
  LoadingSpinner,
  Card,
  Alert,
} from '@/components';
import {
  validateEmail,
  validatePassword,
  validatePasswordStrength,
} from '@/utils/validation';
import { useForm } from '@/utils/hooks';

type Props = any;

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const EnhancedLoginScreen = ({ navigation }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<
    'weak' | 'fair' | 'good' | 'strong'
  >('weak');

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldError,
  } = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: (values) => {
      const newErrors: Record<string, string> = {};

      const emailValidation = validateEmail(values.email);
      if (!emailValidation.isValid && emailValidation.error) {
        newErrors.email = emailValidation.error;
      }

      const passwordValidation = validatePassword(values.password);
      if (!passwordValidation.isValid && passwordValidation.error) {
        newErrors.password = passwordValidation.error;
      }

      return newErrors;
    },
    onSubmit: async (values) => {
      setApiError(null);
      try {
        // Simulate API call
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            // Simulate login success
            if (values.email.includes('demo')) {
              resolve({});
            } else {
              reject(new Error('Invalid credentials'));
            }
          }, 2000);
        });

        // Navigate on success
        navigation.replace('Dashboard');
      } catch (error) {
        setApiError(
          error instanceof Error ? error.message : 'Login failed. Please try again.'
        );
      }
    },
  });

  const handlePasswordChange = (text: string) => {
    handleChange('password', text);
    const strength = validatePasswordStrength(text);
    setPasswordStrength(strength.strength);
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak':
        return colors.danger.main;
      case 'fair':
        return colors.warning.main;
      case 'good':
        return colors.info.main;
      case 'strong':
        return colors.success.main;
    }
  };

  if (isSubmitting && !errors.email && !errors.password) {
    return <LoadingSpinner text="Signing in..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>🔒</Text>
            </View>
            <Text style={styles.welcomeTitle}>Welcome Back</Text>
            <Text style={styles.welcomeSubtitle}>
              Sign in to your SafeDrive account
            </Text>
          </View>

          {/* Error Alert */}
          {apiError && (
            <Alert
              type="error"
              title="Sign In Failed"
              message={apiError}
              onClose={() => setApiError(null)}
            />
          )}

          {/* Form Card */}
          <Card style={styles.formCard}>
            {/* Email Field */}
            <TextField
              label="Email Address"
              placeholder="your@email.com"
              value={values.email}
              onChangeText={(text) => handleChange('email', text)}
              onBlur={() => handleBlur('email')}
              error={touched.email ? errors.email : undefined}
              keyboardType="email-address"
              disabled={isSubmitting}
              autoCapitalize="none"
              required
              icon={<Text style={styles.fieldIcon}>✉️</Text>}
            />

            {/* Password Field */}
            <TextField
              label="Password"
              placeholder="Enter your password"
              value={values.password}
              onChangeText={handlePasswordChange}
              onBlur={() => handleBlur('password')}
              error={touched.password ? errors.password : undefined}
              secureTextEntry={!showPassword}
              disabled={isSubmitting}
              required
              icon={<Text style={styles.fieldIcon}>🔐</Text>}
              rightIcon={
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                  activeOpacity={0.6}
                >
                  <Text style={styles.eyeIcon}>
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              }
            />

            {/* Password Strength Indicator */}
            {values.password && (
              <View style={styles.passwordStrengthContainer}>
                <View style={styles.strengthBar}>
                  <View
                    style={[
                      styles.strengthFill,
                      { backgroundColor: getPasswordStrengthColor() },
                    ]}
                  />
                </View>
                <Text
                  style={[
                    styles.strengthLabel,
                    { color: getPasswordStrengthColor() },
                  ]}
                >
                  Password Strength: {passwordStrength}
                </Text>
              </View>
            )}

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={() => navigation.navigate('Dashboard')}
              disabled={isSubmitting}
              activeOpacity={0.6}
              style={styles.forgotPasswordContainer}
            >
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <Button
              label="Sign In"
              onPress={handleSubmit}
              loading={isSubmitting}
              disabled={isSubmitting || !values.email || !values.password}
              fullWidth
              variant="primary"
              size="lg"
            />
          </Card>

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              disabled={isSubmitting}
              activeOpacity={0.6}
            >
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Security Info */}
          <View style={styles.securityInfo}>
            <Text style={styles.securityIcon}>🛡️</Text>
            <Text style={styles.securityText}>
              Your password is encrypted and secure
            </Text>
          </View>

          {/* Demo Info */}
          <View style={styles.demoInfo}>
            <Text style={styles.demoLabel}>Demo Account</Text>
            <Text style={styles.demoText}>Email: demo@safedrive.com</Text>
            <Text style={styles.demoText}>Password: Demo@123</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },

  // Header Section
  headerSection: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.xxl,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...(shadows.md as any),
  },
  logo: {
    fontSize: 40,
  },
  welcomeTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
  },

  // Form Card
  formCard: {
    marginBottom: spacing.xl,
    padding: spacing.lg,
  },

  // Form Fields
  fieldIcon: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  eyeIcon: {
    fontSize: 18,
  },

  // Password Strength
  passwordStrengthContainer: {
    marginBottom: spacing.lg,
    marginTop: -spacing.md,
  },
  strengthBar: {
    height: 4,
    backgroundColor: colors.neutral[200],
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  strengthFill: {
    height: '100%',
    width: '50%',
    borderRadius: borderRadius.full,
  },
  strengthLabel: {
    ...typography.caption,
    fontWeight: '600',
  },

  // Forgot Password
  forgotPasswordContainer: {
    marginBottom: spacing.lg,
    alignItems: 'flex-end',
  },
  forgotPassword: {
    ...typography.button,
    color: colors.primary.main,
    fontWeight: '600',
  },

  // Sign Up
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  signupText: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  signupLink: {
    ...typography.body2,
    color: colors.primary.main,
    fontWeight: '700',
  },

  // Security Info
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success[50],
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.success[200],
  },
  securityIcon: {
    fontSize: 16,
    marginRight: spacing.md,
  },
  securityText: {
    ...typography.caption,
    color: colors.success[900],
    flex: 1,
  },

  // Demo Info
  demoInfo: {
    backgroundColor: colors.info[50],
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.info[200],
  },
  demoLabel: {
    ...typography.caption,
    color: colors.info[900],
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  demoText: {
    ...typography.caption,
    color: colors.info[900],
    marginBottom: spacing.xs,
  },
});

export default EnhancedLoginScreen;
