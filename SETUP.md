# SETUP GUIDE - SafeDrive React Native Android App

## Quick Start Guide

This document provides step-by-step instructions to set up and run the SafeDrive React Native Android application.

## Prerequisites

Before you begin, ensure you have installed:

1. **Node.js** (v18 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version`

2. **npm or Yarn** (comes with Node.js)
   - Verify: `npm --version`

3. **Expo CLI**
   ```bash
   npm install -g expo-cli
   ```

4. **Android Studio** (for emulator and build tools)
   - Download: https://developer.android.com/studio
   - Install Android SDK, Platform Tools, and Emulator

5. **Git** (optional, for version control)
   - Download: https://git-scm.com/

## Installation Steps

### 1. Clone or Extract the Project

```bash
cd "s:\Android App\SafeDrive-React-Native"
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### 3. Configure Environment (Optional)

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` if you have custom API endpoints:
```
REACT_APP_API_URL=https://your-api-endpoint.com/v1
```

### 4. Start the Development Server

```bash
npm start
```

This will start the Expo development server and show you a QR code.

## Running on Android

### Option A: Using Expo Go (Easiest)

1. Install **Expo Go** app from Google Play Store
2. Press `a` in the terminal (or type `expo start --android`)
3. Scan the QR code with Expo Go
4. App will load and run on your device

### Option B: Using Android Emulator

1. Open Android Studio and start an emulator
2. Press `a` in the terminal
3. App will automatically run on the emulator

### Option C: Using Android Development Build (Recommended)

For a more native experience:

```bash
npm run android
```

This requires a development client setup but provides better native integration.

## Project Structure Overview

```
SafeDrive-React-Native/
├── src/
│   ├── screens/           # All 11 app screens
│   ├── styles/            # Theme, colors, spacing
│   ├── utils/             # Helper functions and API client
│   ├── components/        # Reusable components (future)
│   └── App.tsx            # Main app with navigation
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript setup
├── index.js              # Entry point
├── README.md             # Full documentation
└── SETUP.md              # This file
```

## Features Included

The app includes the following screens and features:

1. **Splash Screen** - App startup animation
2. **Onboarding** - User introduction with 4 slides
3. **Login** - Email/password authentication
4. **Registration** - New user account creation
5. **Dashboard** - Main home screen with quick access
6. **Camera Capture** - Take tyre photos using device camera
7. **Image Preview** - Review and confirm captured images
8. **Analysis Results** - Detailed tyre condition report
9. **GradCAM** - AI explainability visualization
10. **History** - View all previous scans
11. **Profile** - User settings and preferences

## Customization

### Change App Name and Icon

Edit `app.json`:
```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug"
  }
}
```

### Change Colors and Theme

Edit `src/styles/theme.ts`:
```typescript
export const colors = {
  primary: {
    main: '#1E3A8A',  // Change these values
    light: '#3B82F6',
  },
  // ... more colors
};
```

### Update API Endpoints

Edit `src/utils/api.ts`:
```typescript
const API_BASE_URL = 'https://your-api-endpoint.com/v1';
```

## Building for Production

### Create Android APK

```bash
npm run build-android
```

Or using EAS:
```bash
eas build --platform android
```

This will create a production-ready APK file.

## Troubleshooting

### Issue: "npm command not found"
**Solution**: Install Node.js from https://nodejs.org/

### Issue: "expo command not found"
**Solution**: Run `npm install -g expo-cli`

### Issue: Camera not working
**Solution**: 
- Ensure camera permission is enabled in Android settings
- Test on a physical device (emulator has limitations)
- Check `app.json` camera permissions

### Issue: "Cannot connect to API"
**Solution**:
- Verify API endpoint in `.env` file
- Check if backend server is running
- Test API with Postman first
- Check network connectivity

### Issue: Build errors after npm install
**Solution**:
```bash
rm -rf node_modules
npm install
npm start -c  # Clear cache
```

### Issue: App keeps crashing
**Solution**:
- Check console logs for error messages
- Clear app data in Settings > Apps > SafeDrive > Storage
- Reinstall the app
- Check if all permissions are granted

## Development Workflow

### Making Changes

1. Edit files in `src/`
2. Save the file
3. App automatically reloads (hot reload)
4. Test changes on device/emulator

### Adding New Screens

1. Create new file in `src/screens/`
2. Import in `src/App.tsx`
3. Add to navigation stack
4. Create navigation type

### Styling Components

Use the theme values from `src/styles/theme.ts`:
```typescript
import { colors, spacing, borderRadius } from '@/styles/theme';

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
});
```

## Performance Optimization

1. **Use React.memo** for expensive components
2. **Lazy load images** with cached endpoints
3. **Optimize bundle size** with tree-shaking
4. **Monitor performance** with React Native Debugger

## Testing

To test the app:

1. Test on physical Android device
2. Test camera functionality
3. Test all navigation paths
4. Verify form validations
5. Test API integration

## Deployment

### App Store Publishing

1. Build signed APK: `eas build --platform android --local`
2. Create Google Play Console account
3. Create app in Google Play Console
4. Upload APK and complete store listing
5. Submit for review

### Direct APK Distribution

1. Build APK: `npm run build-android`
2. Share APK file directly
3. Users install with: `adb install app.apk`

## Next Steps

1. ✅ Install dependencies
2. ✅ Run the app in development
3. ✅ Test all screens
4. ✅ Integrate with your backend API
5. ✅ Customize branding and colors
6. ✅ Add your API endpoints
7. ✅ Build and deploy

## Resources

- **React Native Docs**: https://reactnative.dev/
- **Expo Docs**: https://docs.expo.dev/
- **React Navigation**: https://reactnavigation.org/
- **React Native Paper**: https://callstack.github.io/react-native-paper/

## Support

For issues and questions:
- Check the README.md for detailed documentation
- Review console logs for error messages
- Check Expo logs: `expo logs`

## License

MIT License - See LICENSE file for details

---

**Happy coding! 🚀**
