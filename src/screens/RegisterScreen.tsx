import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
} from "@/styles/theme";
import { authAPI, userAPI } from "@/utils/api";
import { useAuthStore } from "@/utils/store";

type Props = any;

const RegisterScreen = ({ navigation }: Props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const setSession = useAuthStore((state) => state.setSession);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");
      const response = await authAPI.register(fullName.trim(), email.trim(), password);
      const { user, token } = response.data;
      const profileRes = await userAPI.getProfile({ user_id: user.id, email: user.email });
      const profile = profileRes.data;

      setSession(
        {
          id: profile.id,
          name: profile.fullName || user.fullName,
          email: profile.email || user.email,
          phone: profile.phone || "",
        },
        token
      );

      navigation.replace("Dashboard");
    } catch (error: any) {
      const message =
        error?.response?.data?.error ||
        "Registration failed. Check backend URL/network and try again.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    fullName.trim() &&
    email.trim() &&
    password.trim() &&
    confirmPassword.trim() &&
    agreeToTerms &&
    password === confirmPassword;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.replace("Login")}
            style={styles.backButtonContainer}
          >
            <Text style={styles.backButton}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join SafeDrive's enterprise fleet safety network
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View
              style={[
                styles.inputWrapper,
                nameFocused && styles.inputWrapperFocused,
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor={colors.textTertiary}
                value={fullName}
                onChangeText={setFullName}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                editable={!loading}
                underlineStyle={{ display: "none" }}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View
              style={[
                styles.inputWrapper,
                emailFocused && styles.inputWrapperFocused,
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="name@company.com"
                placeholderTextColor={colors.textTertiary}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                editable={!loading}
                underlineStyle={{ display: "none" }}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View
              style={[
                styles.inputWrapper,
                passwordFocused && styles.inputWrapperFocused,
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={colors.textTertiary}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                editable={!loading}
                underlineStyle={{ display: "none" }}
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showPassword)}
                    color={colors.textSecondary}
                  />
                }
              />
            </View>
            <Text style={styles.passwordHint}>At least 6 characters</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View
              style={[
                styles.inputWrapper,
                confirmPasswordFocused && styles.inputWrapperFocused,
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                placeholderTextColor={colors.textTertiary}
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onFocus={() => setConfirmPasswordFocused(true)}
                onBlur={() => setConfirmPasswordFocused(false)}
                editable={!loading}
                underlineStyle={{ display: "none" }}
                right={
                  <TextInput.Icon
                    icon={showConfirmPassword ? "eye-off" : "eye"}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    color={colors.textSecondary}
                  />
                }
              />
            </View>
          </View>

          <View style={styles.termsContainer}>
            <TouchableOpacity
              style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}
              onPress={() => setAgreeToTerms(!agreeToTerms)}
              activeOpacity={0.7}
            >
              {agreeToTerms && <Text style={styles.checkmark}>OK</Text>}
            </TouchableOpacity>
            <Text style={styles.termsText}>
              I agree to the <Text style={styles.termsLink}>Terms & Conditions</Text>
            </Text>
          </View>

          {!!errorMessage && <Text style={styles.errorHint}>{errorMessage}</Text>}

          <TouchableOpacity
            style={[
              styles.registerButton,
              !isFormValid && styles.registerButtonDisabled,
              loading && styles.registerButtonLoading,
            ]}
            onPress={handleRegister}
            disabled={!isFormValid || loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color={colors.neutral.white} size="small" />
            ) : (
              <Text style={styles.buttonLabel}>Create Account</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace("Login")}>
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
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  header: {
    marginBottom: spacing.xxxl,
  },
  backButtonContainer: {
    width: 64,
    height: 44,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.neutral[50],
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  backButton: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.md,
    fontWeight: "700",
  },
  subtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  form: {
    flex: 1,
    marginBottom: spacing.xl,
  },
  inputGroup: {
    marginBottom: spacing.xl,
  },
  label: {
    ...typography.subtitle2,
    color: colors.text,
    fontWeight: "600",
    marginBottom: spacing.sm,
  },
  inputWrapper: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    overflow: "hidden",
    ...(shadows.sm as any),
  },
  inputWrapperFocused: {
    borderColor: colors.primary.main,
    borderWidth: 2,
  },
  input: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    ...typography.body1,
    color: colors.text,
    backgroundColor: "transparent",
  },
  passwordHint: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  errorHint: {
    ...typography.caption,
    color: colors.danger.main,
    marginBottom: spacing.sm,
    fontWeight: "500",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
    backgroundColor: colors.surface,
  },
  checkboxChecked: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  checkmark: {
    color: colors.neutral.white,
    fontSize: 10,
    fontWeight: "700",
  },
  termsText: {
    ...typography.body2,
    color: colors.text,
    flex: 1,
    lineHeight: 18,
  },
  termsLink: {
    color: colors.primary.main,
    fontWeight: "600",
  },
  registerButton: {
    backgroundColor: colors.primary.main,
    paddingVertical: 16,
    borderRadius: borderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.xl,
    ...(shadows.lg as any),
  },
  registerButtonDisabled: {
    backgroundColor: colors.neutral[300],
    opacity: 0.6,
  },
  registerButtonLoading: {
    minHeight: 56,
  },
  buttonLabel: {
    ...typography.button,
    color: colors.neutral.white,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  loginLink: {
    ...typography.body2,
    color: colors.primary.main,
    fontWeight: "700",
  },
});

export default RegisterScreen;
