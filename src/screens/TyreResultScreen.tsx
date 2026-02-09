import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Text, Button, Card, Divider } from 'react-native-paper';

import { colors, spacing, borderRadius } from '@/styles/theme';

type Props = any;

const TyreResultScreen = ({ navigation }: Props) => {
  const analysisResult = {
    tyreName: 'Front Left Tyre',
    condition: 'Good',
    conditionColor: colors.success.main,
    depth: '6.5 mm',
    wear: '35%',
    alignment: 'Perfect',
    pressure: 'Normal',
    temperature: 'Optimal',
    recommendations: [
      'Tyre is in good condition',
      'Monitor tread depth regularly',
      'Maintain proper pressure',
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Analysis Result</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Result Badge */}
        <View style={styles.resultBadge}>
          <View
            style={[
              styles.resultCircle,
              { backgroundColor: analysisResult.conditionColor },
            ]}
          >
            <Text style={styles.resultEmoji}>✓</Text>
          </View>
          <Text style={styles.resultTitle}>{analysisResult.condition}</Text>
          <Text style={styles.resultSubtitle}>{analysisResult.tyreName}</Text>
        </View>

        {/* Detailed Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detailed Analysis</Text>

          <Card style={styles.metricCard}>
            <Card.Content style={styles.metricContent}>
              <View style={styles.metricLeft}>
                <Text style={styles.metricLabel}>Tread Depth</Text>
                <Text style={styles.metricValue}>{analysisResult.depth}</Text>
              </View>
              <View style={styles.metricRight}>
                <Text style={styles.metricUnit}>Recommended: 8mm+</Text>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.metricCard}>
            <Card.Content style={styles.metricContent}>
              <View style={styles.metricLeft}>
                <Text style={styles.metricLabel}>Wear Level</Text>
                <Text style={styles.metricValue}>{analysisResult.wear}</Text>
              </View>
              <View style={styles.metricRight}>
                <Text style={styles.metricUnit}>Acceptable: {'<'}50%</Text>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.metricCard}>
            <Card.Content style={styles.metricContent}>
              <View style={styles.metricLeft}>
                <Text style={styles.metricLabel}>Alignment</Text>
                <Text style={styles.metricValue}>{analysisResult.alignment}</Text>
              </View>
              <View style={styles.metricRight}>
                <Text style={styles.metricUnit}>Status: Optimal</Text>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.metricCard}>
            <Card.Content style={styles.metricContent}>
              <View style={styles.metricLeft}>
                <Text style={styles.metricLabel}>Pressure</Text>
                <Text style={styles.metricValue}>{analysisResult.pressure}</Text>
              </View>
              <View style={styles.metricRight}>
                <Text style={styles.metricUnit}>Status: Normal</Text>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          {analysisResult.recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationItem}>
              <View style={styles.recommendationDot} />
              <Text style={styles.recommendationText}>{rec}</Text>
            </View>
          ))}
        </View>

        {/* AI Explainability */}
        <View style={styles.section}>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('GradCAM')}
            style={styles.explanationButton}
            labelStyle={styles.explanationButtonLabel}
          >
            View AI Analysis (GradCAM)
          </Button>
        </View>

        {/* Action Buttons */}
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
  explanationButton: {
    borderColor: colors.primary.main,
    paddingVertical: spacing.md,
  },
  explanationButtonLabel: {
    color: colors.primary.main,
    fontSize: 14,
    fontWeight: '600',
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
