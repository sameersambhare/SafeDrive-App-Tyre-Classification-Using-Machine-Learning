/** @type {import('expo/config').ExpoConfig} */
const config = {
  name: 'SafeDrive',
  slug: 'safedrive-mobile',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTabletMode: true,
    bundleIdentifier: 'com.safedrive.mobile',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#1E3A8A',
    },
    package: 'com.safedrive.mobile',
    permissions: [
      'android.permission.CAMERA',
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE',
      'android.permission.INTERNET',
    ],
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    [
      'expo-camera',
      {
        cameraPermission: 'Allow SafeDrive to access your camera.',
      },
    ],
  ],
};

export default config;
