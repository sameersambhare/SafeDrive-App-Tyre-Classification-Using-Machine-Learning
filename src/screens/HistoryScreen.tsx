import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Text, Card, Button, Divider } from 'react-native-paper';

import { colors, spacing, borderRadius } from '@/styles/theme';

type Props = any;

const HistoryScreen = ({ navigation }: Props) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'good' | 'warning' | 'danger'>('all');

  const scanHistory = [
    {
      id: '1',
      tyreName: 'Front Left Tyre',
      condition: 'Good',
      depth: '6.5 mm',
      wear: '35%',
      date: 'Today at 2:30 PM',
      timestamp: new Date(),
    },
    {
      id: '2',
      tyreName: 'Rear Right Tyre',
      condition: 'Warning',
      depth: '4.2 mm',
      wear: '65%',
      date: 'Yesterday at 5:00 PM',
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: '3',
      tyreName: 'Front Right Tyre',
      condition: 'Good',
      depth: '6.8 mm',
      wear: '30%',
      date: '2 days ago',
      timestamp: new Date(Date.now() - 172800000),
    },
    {
      id: '4',
      tyreName: 'Rear Left Tyre',
      condition: 'Good',
      depth: '7.1 mm',
      wear: '25%',
      date: '3 days ago',
      timestamp: new Date(Date.now() - 259200000),
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Good':
        return colors.success.main;
      case 'Warning':
        return colors.warning.main;
      case 'Danger':
        return colors.danger.main;
      default:
        return colors.neutral.gray400;
    }
  };

  const filteredHistory = scanHistory.filter((item) => {
    if (filterStatus === 'all') return true;
    return item.condition.toLowerCase() === filterStatus;
  });

  const renderHistoryItem = ({ item }: { item: typeof scanHistory[0] }) => (
    <Card style={styles.historyCard}>
      <Card.Content style={styles.historyContent}>
        <View style={styles.historyLeft}>
          <View>
            <Text style={styles.historyTitle}>{item.tyreName}</Text>
            <Text style={styles.historyDate}>{item.date}</Text>
          </View>
          <View style={styles.historyMetrics}>
            <Text style={styles.metricSmall}>Depth: {item.depth}</Text>
            <Text style={styles.metricSmall}>Wear: {item.wear}</Text>
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.condition) },
          ]}
        >
          <Text style={styles.statusBadgeText}>{item.condition}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Scan History</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Text style={styles.statValue}>{scanHistory.length}</Text>
            <Text style={styles.statLabel}>Total Scans</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Text style={styles.statValue}>
              {scanHistory.filter((s) => s.condition === 'Good').length}
            </Text>
            <Text style={styles.statLabel}>Healthy</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Text style={styles.statValue}>
              {scanHistory.filter((s) => s.condition !== 'Good').length}
            </Text>
            <Text style={styles.statLabel}>Needs Check</Text>
          </Card.Content>
        </Card>
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        {['all', 'good', 'warning', 'danger'].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterButton,
              filterStatus === status && styles.filterButtonActive,
            ]}
            onPress={() => setFilterStatus(status as any)}
          >
            <Text
              style={[
                styles.filterButtonText,
                filterStatus === status && styles.filterButtonTextActive,
              ]}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* History List */}
      <FlatList
        data={filteredHistory}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={styles.emptyText}>No scans found</Text>
          </View>
        }
      />

      {/* Export Button */}
      <View style={styles.exportContainer}>
        <Button
          mode="outlined"
          style={styles.exportButton}
          labelStyle={styles.exportButtonLabel}
        >
          Export Report
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  placeholder: {
    width: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    borderRadius: borderRadius.lg,
    elevation: 1,
  },
  statContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary.main,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  filterButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.neutral.white,
  },
  filterButtonActive: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
  },
  filterButtonTextActive: {
    color: colors.neutral.white,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  historyCard: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    elevation: 1,
  },
  historyContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyLeft: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  historyDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  historyMetrics: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  metricSmall: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    marginLeft: spacing.md,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.neutral.white,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  exportContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  exportButton: {
    borderColor: colors.primary.main,
    paddingVertical: spacing.md,
  },
  exportButtonLabel: {
    color: colors.primary.main,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HistoryScreen;
