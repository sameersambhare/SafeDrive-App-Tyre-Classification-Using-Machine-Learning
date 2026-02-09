import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

import { colors, spacing, borderRadius, typography } from '@/styles/theme';

type Props = any;

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // Simulate login API call
    setTimeout(() => {
      // Store user info
      setLoading(false);
      navigation.replace('Dashboard');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue to SafeDrive
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              editable={!loading}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
          </View>

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading || !email || !password}
            style={styles.loginButton}
            labelStyle={styles.buttonLabel}
          >
            Sign In
          </Button>
        </View>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.divider} />
        </View>

        {/* Social Login */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>G</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>f</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>A</Text>
          </TouchableOpacity>
        </View>

        {/* Register Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('Register')}>
            <Text style={styles.registerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  header: {
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  form: {
    marginBottom: spacing.xl,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  forgotPassword: {
    fontSize: 14,
    color: colors.primary.main,
    fontWeight: '500',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  loginButton: {
    backgroundColor: colors.primary.main,
    paddingVertical: spacing.md,
    marginTop: spacing.lg,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: spacing.md,
    color: colors.textSecondary,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
    marginBottom: spacing.xxl,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  registerLink: {
    fontSize: 14,
    color: colors.primary.main,
    fontWeight: '600',
  },
});

export default LoginScreen;
