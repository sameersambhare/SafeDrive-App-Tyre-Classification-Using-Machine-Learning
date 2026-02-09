/**
 * Enterprise-Level Component Hooks
 * Custom hooks for common functionality
 */

import { useState, useCallback, useEffect } from 'react';

// useAsync Hook
export interface AsyncState<T> {
  status: 'idle' | 'pending' | 'success' | 'error';
  data: T | null;
  error: Error | null;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true
): AsyncState<T> & { execute: () => Promise<void> } {
  const [state, setState] = useState<AsyncState<T>>({
    status: 'idle',
    data: null,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ status: 'pending', data: null, error: null });
    try {
      const result = await asyncFunction();
      setState({ status: 'success', data: result, error: null });
    } catch (error) {
      setState({ status: 'error', data: null, error: error as Error });
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute };
}

// useForm Hook
export interface UseFormProps<T> {
  initialValues: T;
  validate?: (values: T) => Record<string, string>;
  onSubmit: (values: T) => Promise<void> | void;
}

export interface UseFormReturn<T> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  handleChange: (fieldName: keyof T, value: any) => void;
  handleBlur: (fieldName: keyof T) => void;
  handleSubmit: () => Promise<void>;
  resetForm: () => void;
  setFieldValue: (fieldName: keyof T, value: any) => void;
  setFieldError: (fieldName: keyof T, error: string) => void;
}

export function useForm<T>({
  initialValues,
  validate,
  onSubmit,
}: UseFormProps<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (fieldName: keyof T, value: any) => {
      setValues((prev) => ({ ...prev, [fieldName]: value }));
    },
    []
  );

  const handleBlur = useCallback((fieldName: keyof T) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);

    if (validate) {
      const newErrors = validate(values);
      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        setIsSubmitting(false);
        return;
      }
    }

    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validate, onSubmit]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const setFieldValue = useCallback((fieldName: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [fieldName]: value }));
  }, []);

  const setFieldError = useCallback(
    (fieldName: keyof T, error: string) => {
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
    },
    []
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
  };
}

// useDebounce Hook
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// useThrottle Hook
export function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRun = useCallback(() => Date.now(), []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRun() >= delay) {
        setThrottledValue(value);
      }
    }, delay - (Date.now() - lastRun()));

    return () => clearTimeout(handler);
  }, [value, delay, lastRun]);

  return throttledValue;
}

// usePrevious Hook
export function usePrevious<T>(value: T): T | undefined {
  const ref = React.useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// Import React for usePrevious
import * as React from 'react';
