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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const setSession = useAuthStore((state) => state.setSession);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      const response = await authAPI.login(email.trim(), password);
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
        "Login failed. Check backend URL/network and try again.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = email.trim() && password.trim();

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
          <View style={styles.headerIcon}>
            <Icon name="shield-lock" size={40} color={colors.primary.main} />
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to your SafeDrive account to continue
          </Text>
        </View>

        <View style={styles.form}>
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
            <View style={styles.labelRow}>
              <Text style={styles.label}>Password</Text>
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot?</Text>
              </TouchableOpacity>
            </View>
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
          </View>

          {!!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

          <TouchableOpacity
            style={[
              styles.loginButton,
              !isFormValid && styles.loginButtonDisabled,
              loading && styles.loginButtonLoading,
            ]}
            onPress={handleLogin}
            disabled={!isFormValid || loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color={colors.neutral.white} size="small" />
            ) : (
              <Text style={styles.buttonLabel}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace("Register")}>
            <Text style={styles.registerLink}>Create Account</Text>
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
    alignItems: "center",
    marginBottom: spacing.xxxl,
  },
  headerIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: `${colors.primary.main}15`,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: "center",
  },
  subtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    lineHeight: 20,
    textAlign: "center",
    maxWidth: 280,
  },
  form: {
    marginBottom: spacing.xxl,
  },
  inputGroup: {
    marginBottom: spacing.xl,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.subtitle2,
    color: colors.text,
    fontWeight: "600",
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
  forgotPassword: {
    ...typography.caption,
    color: colors.primary.main,
    fontWeight: "600",
  },
  errorText: {
    ...typography.caption,
    color: colors.danger.main,
    marginBottom: spacing.md,
  },
  loginButton: {
    backgroundColor: colors.primary.main,
    paddingVertical: 16,
    borderRadius: borderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.lg,
    ...(shadows.lg as any),
  },
  loginButtonDisabled: {
    backgroundColor: colors.neutral[300],
    opacity: 0.6,
  },
  loginButtonLoading: {
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
    marginBottom: spacing.xl,
  },
  footerText: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  registerLink: {
    ...typography.body2,
    color: colors.primary.main,
    fontWeight: "700",
  },
});

export default LoginScreen;
