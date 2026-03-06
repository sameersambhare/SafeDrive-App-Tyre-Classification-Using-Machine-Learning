export const colors = {
  // Primary Brand Colors
  primary: {
    50: '#F0F4FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1',
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
    950: '#1E1B4B',
    main: '#4F46E5',
    light: '#818CF8',
    lighter: '#E0E7FF',
  },

  // Secondary Colors
  secondary: {
    50: '#F0F9FF',
    100: '#E0F2FE',
    200: '#BAE6FD',
    300: '#7DD3FC',
    400: '#38BDF8',
    500: '#0EA5E9',
    600: '#0284C7',
    700: '#0369A1',
    800: '#075985',
    900: '#0C4A6E',
    main: '#0284C7',
  },

  // Success
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#145231',
    main: '#16A34A',
    light: '#86EFAC',
  },

  // Warning
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
    main: '#F59E0B',
    light: '#FCD34D',
  },

  // Danger/Error
  danger: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    main: '#DC2626',
    light: '#FCA5A5',
  },

  // Info
  info: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
    main: '#3B82F6',
  },

  // Neutral/Gray
  neutral: {
    white: '#FFFFFF',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712',
    black: '#000000',
    light: '#F8FAFC',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',
  },

  // Semantic
  background: '#F9FAFB',
  backgroundSecondary: '#F3F4F6',
  surface: '#FFFFFF',
  surfaceHover: '#F9FAFB',
  text: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textInverse: '#FFFFFF',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowLight: 'rgba(0, 0, 0, 0.05)',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  xxxxl: 48,
};

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 28,
    fontWeight: '600' as const,
    lineHeight: 36,
    letterSpacing: -0.25,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
    letterSpacing: 0,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
    letterSpacing: 0,
  },
  h5: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
    letterSpacing: 0,
  },
  h6: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
    letterSpacing: 0,
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  body1: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  overline: {
    fontSize: 11,
    fontWeight: '500' as const,
    lineHeight: 16,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },
  button: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  buttonSmall: {
    fontSize: 12,
    fontWeight: '600' as const,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
};

export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 28,
    elevation: 14,
  },
  xxl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.22,
    shadowRadius: 40,
    elevation: 20,
  },
};

export const animations = {
  duration: {
    fast: 150,
    base: 200,
    slow: 300,
    slower: 500,
  },
  timing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    linear: 'linear',
  },
};

export const buttonStyles = {
  sizes: {
    sm: {
      paddingVertical: 10,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.md,
      minHeight: 38,
      ...typography.buttonSmall,
    },
    md: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      borderRadius: borderRadius.lg,
      minHeight: 48,
      ...typography.button,
    },
    lg: {
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: borderRadius.xl,
      minHeight: 56,
      ...typography.button,
    },
  },
  variants: {
    primary: {
      backgroundColor: colors.primary.main,
      color: colors.neutral.white,
    },
    secondary: {
      backgroundColor: colors.secondary.main,
      color: colors.neutral.white,
    },
    success: {
      backgroundColor: colors.success.main,
      color: colors.neutral.white,
    },
    danger: {
      backgroundColor: colors.danger.main,
      color: colors.neutral.white,
    },
    warning: {
      backgroundColor: colors.warning.main,
      color: colors.neutral.white,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.primary.main,
      borderWidth: 1.5,
      borderColor: colors.primary.main,
    },
    outline: {
      backgroundColor: colors.neutral.white,
      color: colors.text,
      borderWidth: 1.5,
      borderColor: colors.border,
    },
  },
};

export const inputStyles = {
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...typography.body1,
  },
  focused: {
    borderColor: colors.primary.main,
    backgroundColor: colors.neutral.white,
  },
  error: {
    borderColor: colors.danger.main,
  },
  disabled: {
    backgroundColor: colors.neutral[100],
    color: colors.textTertiary,
  },
};

export const cardStyles = {
  base: {
    borderRadius: borderRadius.lg,
    backgroundColor: colors.neutral.white,
    ...shadows.md,
  },
  elevated: {
    borderRadius: borderRadius.lg,
    backgroundColor: colors.neutral.white,
    ...shadows.lg,
  },
};

export const defaults = {
  containerPadding: spacing.lg,
  screenBackgroundColor: colors.background,
  inputHeight: 48,
  buttonHeight: 48,
};

export default {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
  animations,
  buttonStyles,
  inputStyles,
  cardStyles,
  defaults,
};
