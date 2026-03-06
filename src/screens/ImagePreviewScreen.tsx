import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Text, Button } from 'react-native-paper';

import { colors, spacing, borderRadius } from '@/styles/theme';
import { tyreAPI } from '@/utils/api';
import { useAuthStore } from '@/utils/store';

type Props = any;

const ImagePreviewScreen = ({ route, navigation }: Props) => {
  const { imageData } = route.params;
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const user = useAuthStore((state) => state.user);

  const handleUpload = async () => {
    try {
      setIsUploading(true);
      setErrorMessage('');

      const formData = new FormData();
      formData.append('image', {
        uri: imageData,
        name: `tyre-${Date.now()}.jpg`,
        type: 'image/jpeg',
      } as any);

      if (user?.id) {
        formData.append('user_id', user.id);
      }
      if (user?.email) {
        formData.append('user_email', user.email);
      }

      const response = await tyreAPI.uploadImage(formData);
      navigation.navigate('Results', { analysisData: response.data });
    } catch (error: any) {
      const message =
        error?.response?.data?.error ||
        'Failed to analyze image. Check backend/API URL and try again.';
      setErrorMessage(message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Button
            mode="text"
            onPress={() => navigation.goBack()}
            labelStyle={styles.backButtonLabel}
          >
            Back
          </Button>
          <Text style={styles.title}>Image Preview</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageData }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Ready for Analysis</Text>
          <Text style={styles.infoDescription}>
            This image will be sent to the Flask API for CNN prediction.
          </Text>
          {!!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>

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
  errorText: {
    marginTop: spacing.md,
    fontSize: 13,
    color: colors.danger.main,
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
