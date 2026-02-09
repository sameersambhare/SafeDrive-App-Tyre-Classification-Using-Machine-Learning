/**
 * Enterprise-Level Validation Utilities
 * Comprehensive form validation with detailed error messages
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
  customError?: string;
}

// ============ STRING VALIDATIONS ============

export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  if (email.length > 254) {
    return { isValid: false, error: 'Email is too long' };
  }

  return { isValid: true };
};

export const validatePassword = (
  password: string,
  minLength = 8
): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < minLength) {
    return {
      isValid: false,
      error: `Password must be at least ${minLength} characters long`,
    };
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
    password
  );

  if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
    return {
      isValid: false,
      error:
        'Password must contain uppercase, lowercase, and numbers (special characters recommended)',
    };
  }

  return { isValid: true };
};

export const validatePasswordStrength = (
  password: string
): { score: number; strength: 'weak' | 'fair' | 'good' | 'strong' } => {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;

  const strengthLevels: Array<'weak' | 'fair' | 'good' | 'strong'> = [
    'weak',
    'weak',
    'fair',
    'good',
    'strong',
  ];
  return { score, strength: strengthLevels[score] || 'weak' };
};

export const validatePhoneNumber = (phoneNumber: string): ValidationResult => {
  if (!phoneNumber) {
    return { isValid: false, error: 'Phone number is required' };
  }

  const phoneRegex = /^(\+\d{1,3})?[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/;
  if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
    return {
      isValid: false,
      error: 'Please enter a valid phone number',
    };
  }

  return { isValid: true };
};

export const validateURL = (url: string): ValidationResult => {
  if (!url) {
    return { isValid: false, error: 'URL is required' };
  }

  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Please enter a valid URL' };
  }
};

export const validateUsername = (username: string): ValidationResult => {
  if (!username) {
    return { isValid: false, error: 'Username is required' };
  }

  if (username.length < 3) {
    return {
      isValid: false,
      error: 'Username must be at least 3 characters long',
    };
  }

  if (username.length > 20) {
    return {
      isValid: false,
      error: 'Username must not exceed 20 characters',
    };
  }

  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  if (!usernameRegex.test(username)) {
    return {
      isValid: false,
      error:
        'Username can only contain letters, numbers, underscores, and hyphens',
    };
  }

  return { isValid: true };
};

export const validateString = (
  value: string,
  rules: ValidationRules
): ValidationResult => {
  if (rules.required && !value?.trim()) {
    return { isValid: false, error: 'This field is required' };
  }

  if (!value) {
    return { isValid: true };
  }

  if (rules.minLength && value.length < rules.minLength) {
    return {
      isValid: false,
      error: `Minimum ${rules.minLength} characters required`,
    };
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return {
      isValid: false,
      error: `Maximum ${rules.maxLength} characters allowed`,
    };
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return {
      isValid: false,
      error: rules.customError || 'Invalid format',
    };
  }

  if (rules.custom && !rules.custom(value)) {
    return {
      isValid: false,
      error: rules.customError || 'Invalid value',
    };
  }

  return { isValid: true };
};

// ============ NUMBER VALIDATIONS ============

export const validateNumber = (
  value: number,
  min?: number,
  max?: number
): ValidationResult => {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Please enter a valid number' };
  }

  if (min !== undefined && value < min) {
    return { isValid: false, error: `Value must be at least ${min}` };
  }

  if (max !== undefined && value > max) {
    return { isValid: false, error: `Value must not exceed ${max}` };
  }

  return { isValid: true };
};

// ============ DATE VALIDATIONS ============

export const validateDate = (date: Date | string): ValidationResult => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) {
      return { isValid: false, error: 'Invalid date' };
    }
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Invalid date format' };
  }
};

export const validateDateRange = (
  startDate: Date,
  endDate: Date
): ValidationResult => {
  if (startDate >= endDate) {
    return {
      isValid: false,
      error: 'Start date must be before end date',
    };
  }
  return { isValid: true };
};

export const validateAge = (birthDate: Date, minAge: number): ValidationResult => {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    const adjustedAge = age - 1;
    if (adjustedAge < minAge) {
      return {
        isValid: false,
        error: `You must be at least ${minAge} years old`,
      };
    }
  } else {
    if (age < minAge) {
      return {
        isValid: false,
        error: `You must be at least ${minAge} years old`,
      };
    }
  }

  return { isValid: true };
};

// ============ FILE VALIDATIONS ============

export const validateFileSize = (
  fileSize: number,
  maxSizeInMB: number
): ValidationResult => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  if (fileSize > maxSizeInBytes) {
    return {
      isValid: false,
      error: `File size must not exceed ${maxSizeInMB}MB`,
    };
  }
  return { isValid: true };
};

export const validateFileType = (
  fileName: string,
  allowedTypes: string[]
): ValidationResult => {
  const fileExtension = fileName.split('.').pop()?.toLowerCase() || '';
  if (!allowedTypes.includes(fileExtension)) {
    return {
      isValid: false,
      error: `File type must be one of: ${allowedTypes.join(', ')}`,
    };
  }
  return { isValid: true };
};

// ============ FORM VALIDATIONS ============

export interface FormData {
  [key: string]: any;
}

export interface FormErrors {
  [key: string]: string;
}

export const validateForm = (
  formData: FormData,
  fieldRules: Record<string, ValidationRules>
): FormErrors => {
  const errors: FormErrors = {};

  Object.keys(fieldRules).forEach((fieldName) => {
    const value = formData[fieldName];
    const rules = fieldRules[fieldName];
    const result = validateString(String(value || ''), rules);

    if (!result.isValid && result.error) {
      errors[fieldName] = result.error;
    }
  });

  return errors;
};

// ============ CARD VALIDATIONS ============

export const validateCardNumber = (cardNumber: string): ValidationResult => {
  const cleanNumber = cardNumber.replace(/\s/g, '');

  if (!/^\d{13,19}$/.test(cleanNumber)) {
    return { isValid: false, error: 'Please enter a valid card number' };
  }

  // Luhn algorithm
  let sum = 0;
  let isEven = false;

  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  if (sum % 10 !== 0) {
    return { isValid: false, error: 'Invalid card number' };
  }

  return { isValid: true };
};

export const validateCardExpiry = (month: string, year: string): ValidationResult => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const expMonth = parseInt(month, 10);
  const expYear = parseInt(year, 10);

  if (expMonth < 1 || expMonth > 12) {
    return { isValid: false, error: 'Invalid expiry month' };
  }

  if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
    return { isValid: false, error: 'Card has expired' };
  }

  return { isValid: true };
};

export const validateCardCVV = (cvv: string): ValidationResult => {
  if (!/^\d{3,4}$/.test(cvv)) {
    return { isValid: false, error: 'CVV must be 3 or 4 digits' };
  }
  return { isValid: true };
};
