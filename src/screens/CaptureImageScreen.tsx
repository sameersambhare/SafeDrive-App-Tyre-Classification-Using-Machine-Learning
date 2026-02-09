import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Text, Button, ActivityIndicator } from 'react-native-paper';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, borderRadius } from '@/styles/theme';

type Props = any;

const CaptureImageScreen = ({ navigation }: Props) => {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isTakingPicture, setIsTakingPicture] = useState(false);

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  const handleTakePicture = async () => {
    if (!cameraRef.current) return;

    try {
      setIsTakingPicture(true);
      const photo = await cameraRef.current.takePictureAsync();
      setIsTakingPicture(false);
      navigation.navigate('Preview', { imageData: photo.uri });
    } catch (error) {
      setIsTakingPicture(false);
      console.error('Error taking picture:', error);
    }
  };

  const handlePickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      navigation.navigate('Preview', { imageData: result.assets[0].uri });
    }
  };

  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary.main} />
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionTitle}>Camera Permission Required</Text>
          <Text style={styles.permissionDescription}>
            We need access to your camera to capture tyre images
          </Text>
          <Button
            mode="contained"
            onPress={requestPermission}
            style={styles.permissionButton}
          >
            Grant Permission
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef} facing="back">
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Capture Tyre</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Guide Frame */}
        <View style={styles.guideContainer}>
          <View style={styles.guide} />
          <Text style={styles.guideText}>Position tyre in frame</Text>
        </View>

        {/* Bottom Controls */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.galleryButton}
            onPress={handlePickFromGallery}
          >
            <Text style={styles.galleryIcon}>🖼️</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.captureButton,
              isTakingPicture && styles.captureButtonDisabled,
            ]}
            onPress={handleTakePicture}
            disabled={isTakingPicture}
          >
            {isTakingPicture ? (
              <ActivityIndicator color={colors.neutral.white} />
            ) : (
              <View style={styles.captureButtonInner} />
            )}
          </TouchableOpacity>

          <View style={styles.placeholder} />
        </View>
      </CameraView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.text,
  },
  camera: {
    flex: 1,
  },
  topBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: colors.neutral.white,
    fontSize: 20,
    fontWeight: '600',
  },
  title: {
    color: colors.neutral.white,
    fontSize: 16,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  guideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guide: {
    width: 280,
    height: 280,
    borderWidth: 3,
    borderColor: colors.primary.light,
    borderRadius: borderRadius.xl,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
  },
  guideText: {
    color: colors.neutral.white,
    fontSize: 14,
    marginTop: spacing.lg,
    fontWeight: '500',
  },
  controls: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.neutral.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryIcon: {
    fontSize: 24,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primary.light,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.neutral.white,
  },
  captureButtonDisabled: {
    opacity: 0.6,
  },
  captureButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.neutral.white,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  permissionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 20,
  },
  permissionButton: {
    backgroundColor: colors.primary.main,
    paddingVertical: spacing.md,
    minWidth: 200,
  },
});

export default CaptureImageScreen;
