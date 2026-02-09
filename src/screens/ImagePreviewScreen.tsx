import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Text, Button, ActivityIndicator } from 'react-native-paper';

import { colors, spacing, borderRadius } from '@/styles/theme';

type Props = any;

const ImagePreviewScreen = ({ route, navigation }: Props) => {
  const { imageData } = route.params;
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    setIsUploading(true);
    // Simulate upload and AI analysis
    setTimeout(() => {
      setIsUploading(false);
      navigation.navigate('Results', { analysisData: {} });
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Button
            mode="text"
            onPress={() => navigation.goBack()}
            labelStyle={styles.backButtonLabel}
          >
            ← Back
          </Button>
          <Text style={styles.title}>Image Preview</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Image Preview */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageData }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Image Captured Successfully</Text>
          <Text style={styles.infoDescription}>
            Your tyre image has been captured. Review it below and proceed with
            the analysis.
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            style={styles.actionButton}
            labelStyle={styles.actionButtonLabel}
            disabled={isUploading}
          >
            Retake
          </Button>

          <Button
            mode="contained"
            onPress={handleUpload}
            loading={isUploading}
            disabled={isUploading}
            style={styles.actionButton}
            labelStyle={styles.actionButtonLabel}
          >
            {isUploading ? 'Analyzing...' : 'Analyze'}
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
  backButtonLabel: {
    color: colors.primary.main,
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  imageContainer: {
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.lg,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: borderRadius.lg,
  },
  infoContainer: {
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.xl,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  infoDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  actionButton: {
    flex: 1,
    paddingVertical: spacing.md,
  },
  actionButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ImagePreviewScreen;
