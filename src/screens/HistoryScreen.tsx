import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Text, Card, Button, ActivityIndicator } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

import { colors, spacing, borderRadius } from '@/styles/theme';
import { AnalysisRecord, tyreAPI } from '@/utils/api';
import { useAuthStore } from '@/utils/store';

type Props = any;

const HistoryScreen = ({ navigation }: Props) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'good' | 'defective'>('all');
  const [loading, setLoading] = useState(false);
  const [openingId, setOpeningId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [scanHistory, setScanHistory] = useState<AnalysisRecord[]>([]);
  const user = useAuthStore((state) => state.user);

  const loadHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await tyreAPI.getAnalysisHistory({
        user_id: user?.id,
        user_email: user?.email,
        limit: 100,
      });
      setScanHistory(response.data);
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Failed to load history.');
    } finally {
      setLoading(false);
    }
  }, [user?.id, user?.email]);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
      return undefined;
    }, [loadHistory])
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return colors.success.main;
      case 'defective':
        return colors.danger.main;
      default:
        return colors.neutral.gray400;
    }
  };

  const filteredHistory = useMemo(() => {
    if (filterStatus === 'all') return scanHistory;
    return scanHistory.filter((item) => item.label === filterStatus);
  }, [scanHistory, filterStatus]);

  const handleOpenDetail = async (id: string) => {
    try {
      setOpeningId(id);
      const response = await tyreAPI.getAnalysisDetail(id);
      navigation.navigate('Results', { analysisData: response.data });
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Failed to open scan details.');
    } finally {
      setOpeningId(null);
    }
  };

  const renderHistoryItem = ({ item }: { item: AnalysisRecord }) => (
    <TouchableOpacity activeOpacity={0.8} onPress={() => handleOpenDetail(item.id)}>
      <Card style={styles.historyCard}>
        <Card.Content style={styles.historyContent}>
          <View style={styles.historyLeft}>
            <View>
              <Text style={styles.historyTitle}>{item.filename || 'Tyre Scan'}</Text>
              <Text style={styles.historyDate}>
                {new Date(item.created_at).toLocaleString()}
              </Text>
            </View>
            <View style={styles.historyMetrics}>
              <Text style={styles.metricSmall}>Confidence: {item.confidence}%</Text>
              <Text style={styles.metricSmall}>Score: {item.raw_score}</Text>
            </View>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.label) },
            ]}
          >
            {openingId === item.id ? (
              <ActivityIndicator color={colors.neutral.white} size="small" />
            ) : (
              <Text style={styles.statusBadgeText}>{item.label.toUpperCase()}</Text>
            )}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Scan History</Text>
        <View style={styles.placeholder} />
      </View>

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
              {scanHistory.filter((s) => s.label === 'good').length}
            </Text>
            <Text style={styles.statLabel}>Good</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Text style={styles.statValue}>
              {scanHistory.filter((s) => s.label === 'defective').length}
            </Text>
            <Text style={styles.statLabel}>Defective</Text>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.filterContainer}>
        {['all', 'good', 'defective'].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterButton,
              filterStatus === status && styles.filterButtonActive,
            ]}
            onPress={() => setFilterStatus(status as 'all' | 'good' | 'defective')}
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

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={filteredHistory}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{error || 'No scans found'}</Text>
            </View>
          }
        />
      )}

      <View style={styles.exportContainer}>
        <Button mode="outlined" style={styles.exportButton} onPress={loadHistory}>
          Refresh
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
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary.main,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  placeholder: {
    width: 30,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default HistoryScreen;
