import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Text, Button } from 'react-native-paper';

import { colors, spacing, borderRadius } from '@/styles/theme';

type Props = any;

const GradCAMScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>AI Explainability</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Explanation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GradCAM Analysis</Text>
          <Text style={styles.description}>
            The Gradient-weighted Class Activation Map (GradCAM) shows which
            regions of your tyre image the AI model focused on when making its
            assessment.
          </Text>
        </View>

        {/* Original Image */}
        <View style={styles.imageSection}>
          <Text style={styles.imageLabel}>Original Tyre Image</Text>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>📸</Text>
            <Text style={styles.placeholderSubtext}>Original Image</Text>
          </View>
        </View>

        {/* GradCAM Heatmap */}
        <View style={styles.imageSection}>
          <Text style={styles.imageLabel}>AI Focus Areas (GradCAM)</Text>
          <View style={styles.heatmapPlaceholder}>
            <View style={styles.heatmapGradient} />
            <Text style={styles.placeholderText}>🔥</Text>
            <Text style={styles.placeholderSubtext}>
              Red = High Attention Areas
            </Text>
          </View>
        </View>

        {/* Interpretation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What This Means</Text>

          <View style={styles.interpretationItem}>
            <View style={styles.interpretationColor} />
            <View>
              <Text style={styles.interpretationLabel}>Red Zones</Text>
              <Text style={styles.interpretationText}>
                Areas the AI identified as potential wear or damage
              </Text>
            </View>
          </View>

          <View style={styles.interpretationItem}>
            <View style={[styles.interpretationColor, { backgroundColor: colors.warning.main }]} />
            <View>
              <Text style={styles.interpretationLabel}>Yellow Zones</Text>
              <Text style={styles.interpretationText}>
                Areas requiring attention or further monitoring
              </Text>
            </View>
          </View>

          <View style={styles.interpretationItem}>
            <View style={[styles.interpretationColor, { backgroundColor: colors.success.main }]} />
            <View>
              <Text style={styles.interpretationLabel}>Green Zones</Text>
              <Text style={styles.interpretationText}>
                Areas in good condition with minimal wear
              </Text>
            </View>
          </View>
        </View>

        {/* Technical Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Details</Text>
          <View style={styles.detailBox}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Model:</Text>
              <Text style={styles.detailValue}>ResNet50 + GradCAM</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Accuracy:</Text>
              <Text style={styles.detailValue}>94.5%</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Processing Time:</Text>
              <Text style={styles.detailValue}>2.3 seconds</Text>
            </View>
          </View>
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
  section: {
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  imageSection: {
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.lg,
  },
  imageLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: spacing.md,
  },
  imagePlaceholder: {
    height: 250,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.neutral.light,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  heatmapPlaceholder: {
    height: 250,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.neutral.light,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  heatmapGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
  },
  placeholderText: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  placeholderSubtext: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  interpretationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  interpretationColor: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.danger.main,
    marginRight: spacing.md,
  },
  interpretationLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  interpretationText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  detailBox: {
    backgroundColor: colors.neutral.light,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  detailLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 13,
    color: colors.text,
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

export default GradCAMScreen;
