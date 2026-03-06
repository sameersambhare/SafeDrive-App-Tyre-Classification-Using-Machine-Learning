import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Text, Button, Card } from 'react-native-paper';

import { colors, spacing, borderRadius } from '@/styles/theme';
import { AnalysisRecord } from '@/utils/api';

type Props = {
  route: { params: { analysisData: AnalysisRecord } };
  navigation: any;
};

const TyreResultScreen = ({ route, navigation }: Props) => {
  const { analysisData } = route.params;

  const isGood = analysisData.label === 'good';
  const condition = isGood ? 'Good' : 'Defective';
  const conditionColor = isGood ? colors.success.main : colors.danger.main;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Analysis Result</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.resultBadge}>
          <View style={[styles.resultCircle, { backgroundColor: conditionColor }]}>
            <Text style={styles.resultEmoji}>{isGood ? 'OK' : '!'}</Text>
          </View>
          <Text style={styles.resultTitle}>{condition}</Text>
          <Text style={styles.resultSubtitle}>
            Confidence: {analysisData.confidence}%
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Model Output</Text>

          <Card style={styles.metricCard}>
            <Card.Content style={styles.metricContent}>
              <View style={styles.metricLeft}>
                <Text style={styles.metricLabel}>Raw Score</Text>
                <Text style={styles.metricValue}>{analysisData.raw_score}</Text>
              </View>
              <View style={styles.metricRight}>
                <Text style={styles.metricUnit}>Sigmoid output</Text>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.metricCard}>
            <Card.Content style={styles.metricContent}>
              <View style={styles.metricLeft}>
                <Text style={styles.metricLabel}>Threshold</Text>
                <Text style={styles.metricValue}>{analysisData.threshold}</Text>
              </View>
              <View style={styles.metricRight}>
                <Text style={styles.metricUnit}>
                  {analysisData.raw_score > analysisData.threshold
                    ? 'Above threshold'
                    : 'Below threshold'}
                </Text>
              </View>
            </Card.Content>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          {analysisData.recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationItem}>
              <View style={styles.recommendationDot} />
              <Text style={styles.recommendationText}>{rec}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actionContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Dashboard')}
            style={styles.actionButton}
            labelStyle={styles.actionButtonLabel}
          >
            Back to Dashboard
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: 20,
  },
  resultBadge: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  resultCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  resultEmoji: {
    fontSize: 40,
    color: colors.neutral.white,
    fontWeight: '700',
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  resultSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  metricCard: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    elevation: 1,
  },
  metricContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLeft: {
    flex: 1,
  },
  metricRight: {
    alignItems: 'flex-end',
  },
  metricLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  metricUnit: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  recommendationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary.main,
    marginTop: spacing.sm,
    marginRight: spacing.md,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  actionContainer: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  actionButton: {
    backgroundColor: colors.primary.main,
    paddingVertical: spacing.md,
  },
  actionButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TyreResultScreen;
