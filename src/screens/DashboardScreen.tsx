import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Text, Card, IconButton } from 'react-native-paper';

import { colors, spacing, borderRadius } from '@/styles/theme';

type Props = any;

const DashboardScreen = ({ navigation }: Props) => {
  const [userName, setUserName] = useState('User');
  const [safetyStatus, setSafetyStatus] = useState<'good' | 'warning' | 'danger'>(
    'good'
  );

  useEffect(() => {
    // Retrieve stored user name
    setUserName('John');
    setSafetyStatus('good');
  }, []);

  const getStatusColor = () => {
    switch (safetyStatus) {
      case 'good':
        return colors.success.main;
      case 'warning':
        return colors.warning.main;
      case 'danger':
        return colors.danger.main;
      default:
        return colors.success.main;
    }
  };

  const getStatusText = () => {
    switch (safetyStatus) {
      case 'good':
        return 'Good';
      case 'warning':
        return 'Warning';
      case 'danger':
        return 'Danger';
      default:
        return 'Good';
    }
  };

  const quickAccessItems = [
    {
      title: 'Scan Tyre',
      description: 'Capture tyre image for AI analysis',
      icon: '📸',
      screen: 'Capture',
    },
    {
      title: 'View History',
      description: 'Check previous scan results',
      icon: '📋',
      screen: 'History',
    },
    {
      title: 'Safety Report',
      description: 'Download your safety report',
      icon: '📄',
      screen: 'History',
    },
    {
      title: 'Settings',
      description: 'Manage your account',
      icon: '⚙️',
      screen: 'Profile',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>Hello, {userName}</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.profileInitial}>
              {userName.charAt(0).toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Safety Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusContent}>
            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: getStatusColor() },
              ]}
            />
            <View style={styles.statusInfo}>
              <Text style={styles.statusLabel}>Safety Status:</Text>
              <Text style={styles.statusValue}>{getStatusText()}</Text>
            </View>
          </View>
          <Text style={styles.statusEmoji}>✓</Text>
        </View>

        {/* Quick Access */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>

          <View style={styles.gridContainer}>
            {quickAccessItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => navigation.navigate(item.screen)}
              >
                <Text style={styles.cardIcon}>{item.icon}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Scans</Text>
            <TouchableOpacity onPress={() => navigation.navigate('History')}>
              <Text style={styles.viewAll}>View All →</Text>
            </TouchableOpacity>
          </View>

          <Card style={styles.activityCard}>
            <Card.Content style={styles.activityContent}>
              <View>
                <Text style={styles.activityTitle}>Front Left Tyre</Text>
                <Text style={styles.activityDate}>Today at 2:30 PM</Text>
              </View>
              <View
                style={[
                  styles.activityBadge,
                  { backgroundColor: colors.success.light },
                ]}
              >
                <Text style={styles.activityStatus}>Good</Text>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.activityCard}>
            <Card.Content style={styles.activityContent}>
              <View>
                <Text style={styles.activityTitle}>Rear Right Tyre</Text>
                <Text style={styles.activityDate}>Yesterday at 5:00 PM</Text>
              </View>
              <View
                style={[
                  styles.activityBadge,
                  { backgroundColor: colors.warning.light },
                ]}
              >
                <Text style={styles.activityStatus}>Warning</Text>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary.main,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  header: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: spacing.sm,
  },
  userName: {
    color: colors.neutral.white,
    fontSize: 24,
    fontWeight: '600',
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: colors.neutral.white,
    fontSize: 20,
    fontWeight: '600',
  },
  statusCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  statusContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.md,
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statusLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  statusValue: {
    color: colors.neutral.white,
    fontSize: 14,
    fontWeight: '500',
  },
  statusEmoji: {
    fontSize: 18,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  viewAll: {
    fontSize: 14,
    color: colors.primary.main,
    fontWeight: '500',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  activityCard: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    elevation: 1,
  },
  activityContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  activityDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  activityBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  activityStatus: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
  },
});

export default DashboardScreen;
