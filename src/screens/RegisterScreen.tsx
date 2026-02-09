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

import { colors, spacing, borderRadius } from '@/styles/theme';

type Props = any;

const RegisterScreen = ({ navigation }: Props) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      // Show error
      return;
    }
    setLoading(true);
    // Simulate register API call
    setTimeout(() => {
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
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join SafeDrive to protect your tyres
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              value={fullName}
              onChangeText={setFullName}
              editable={!loading}
            />
          </View>

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
              placeholder="At least 8 characters"
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

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              editable={!loading}
              right={
                <TextInput.Icon
                  icon={showConfirmPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
            />
          </View>

          {/* Terms & Conditions */}
          <View style={styles.termsContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setAgreeToTerms(!agreeToTerms)}
            >
              <View
                style={[
                  styles.checkboxBox,
                  agreeToTerms && styles.checkboxBoxChecked,
                ]}
              >
                {agreeToTerms && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
            <Text style={styles.termsText}>
              I agree to the Terms & Conditions
            </Text>
          </View>

          <Button
            mode="contained"
            onPress={handleRegister}
            loading={loading}
            disabled={
              loading ||
              !fullName ||
              !email ||
              !password ||
              !confirmPassword ||
              !agreeToTerms
            }
            style={styles.registerButton}
            labelStyle={styles.buttonLabel}
          >
            Create Account
          </Button>
        </View>

        {/* Login Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text style={styles.loginLink}>Sign In</Text>
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
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  backButton: {
    fontSize: 14,
    color: colors.primary.main,
    fontWeight: '600',
    marginBottom: spacing.md,
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
    flex: 1,
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  checkbox: {
    padding: spacing.sm,
    marginRight: spacing.md,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxBoxChecked: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  checkmark: {
    color: colors.neutral.white,
    fontSize: 14,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 13,
    color: colors.text,
    flex: 1,
    lineHeight: 18,
  },
  registerButton: {
    backgroundColor: colors.primary.main,
    paddingVertical: spacing.md,
    marginTop: spacing.lg,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
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
  loginLink: {
    fontSize: 14,
    color: colors.primary.main,
    fontWeight: '600',
  },
});

export default RegisterScreen;
