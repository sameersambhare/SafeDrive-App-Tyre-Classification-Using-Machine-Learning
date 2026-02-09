/**
 * Utility functions for the SafeDrive app
 */

export const formatDate = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    const daysAgo = Math.floor(
      (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );
    return `${daysAgo} days ago`;
  }
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // At least 8 characters
  return password.length >= 8;
};

export const getTyreConditionColor = (
  condition: 'good' | 'warning' | 'danger'
): string => {
  switch (condition) {
    case 'good':
      return '#16A34A';
    case 'warning':
      return '#EAB308';
    case 'danger':
      return '#DC2626';
  }
};

export const calculateWearPercentage = (depth: number): number => {
  const maxDepth = 10; // Standard new tyre depth
  const wear = Math.round(((maxDepth - depth) / maxDepth) * 100);
  return Math.max(0, Math.min(100, wear));
};
