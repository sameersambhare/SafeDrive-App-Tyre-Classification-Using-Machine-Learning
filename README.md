# SafeDrive Mobile App - React Native (Android)

A mobile app for AI-powered tyre safety analysis using React Native and Expo. This is a native Android conversion of the SafeDrive Mobile App UI.

## Features

- **Splash Screen**: App initialization with branding
- **Onboarding**: User-friendly introduction to the app
- **Authentication**: Secure login and registration
- **Dashboard**: Home screen with quick access to features
- **Camera Integration**: Capture tyre images using device camera
- **Image Preview**: Review captured images before analysis
- **AI Analysis**: Tyre condition analysis with detailed metrics
- **GradCAM Visualization**: AI explainability showing model decision areas
- **Scan History**: View all previous tyre scans and results
- **User Profile**: Manage account settings and preferences

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **UI Components**: React Native Paper
- **Navigation**: React Navigation (Stack Navigator)
- **State Management**: Zustand (for future integration)
- **Image Handling**: expo-image-picker, expo-camera
- **Styling**: React Native StyleSheet with custom theme

## Project Structure

```
SafeDrive-React-Native/
├── src/
│   ├── screens/           # All app screens
│   │   ├── SplashScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── CaptureImageScreen.tsx
│   │   ├── ImagePreviewScreen.tsx
│   │   ├── TyreResultScreen.tsx
│   │   ├── GradCAMScreen.tsx
│   │   ├── HistoryScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── styles/
│   │   └── theme.ts       # Colors, spacing, typography
│   ├── utils/
│   │   ├── helpers.ts     # Utility functions
│   │   └── api.ts         # API client setup
│   └── App.tsx            # Main app component with navigation
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuration
└── index.js              # Entry point
```

## Installation

1. **Prerequisites**:
   - Node.js 18+ and npm/yarn
   - Expo CLI: `npm install -g expo-cli`
   - Android Studio (for testing)

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Expo**:
   - Update `app.json` with your app name and package name
   - Configure camera permissions in `app.json`

## Running the App

### Development Mode
```bash
npm start
```

Press 'a' for Android or follow the Expo CLI instructions.

### Run on Android Device/Emulator
```bash
npm run android
```

### Run on Web (preview only)
```bash
npm run web
```

## Building for Production

### Create a Release Build
```bash
npm run build-android
```

This uses EAS (Expo Application Services) to build the APK.

## Configuration

### Theme Customization
Edit `src/styles/theme.ts` to customize:
- Colors
- Spacing
- Border radius
- Typography
- Shadows

### API Integration
Update `src/utils/api.ts` with your backend API endpoint:
```typescript
const API_BASE_URL = 'https://your-api-endpoint.com/v1';
```

## Features Breakdown

### Authentication
- Email/password login and registration
- Form validation
- Error handling

### Tyre Analysis
- Camera capture with preview
- Image upload to backend
- AI-powered analysis results
- Detailed metrics (depth, wear, alignment, etc.)

### AI Explainability
- GradCAM visualization
- Model decision explanation
- Confidence scores

### History & Analytics
- Scan history with filtering
- Statistics dashboard
- Export functionality

### User Profile
- Profile information management
- Security settings (password change)
- Notification preferences
- App information

## Key Dependencies

- **expo**: ^51.0.0 - Expo framework
- **react-native**: ^0.74.0 - React Native
- **react-native-paper**: ^5.11.0 - Material Design components
- **@react-navigation/native**: ^6.1.0 - Navigation
- **expo-camera**: ^15.0.0 - Camera access
- **expo-image-picker**: ^15.0.0 - Image picker

## Permissions Required

### Android
- `android.permission.CAMERA` - For tyre image capture
- `android.permission.READ_EXTERNAL_STORAGE` - For image access
- `android.permission.WRITE_EXTERNAL_STORAGE` - For saving images

These are configured in `app.json`.

## Development Tips

1. **Hot Reload**: Changes are automatically reloaded during development
2. **Debugging**: Use Expo Dev Client tools or React Native Debugger
3. **Testing**: Run on physical device for accurate camera functionality
4. **Performance**: Use React.memo for performance optimization

## Future Enhancements

- [ ] Offline mode with local storage
- [ ] Push notifications
- [ ] Real-time location tracking
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Advanced analytics dashboard
- [ ] Integration with vehicle maintenance API
- [ ] Bluetooth connectivity for vehicle diagnostics

## Troubleshooting

### Camera not working
- Ensure camera permission is granted
- Test on a physical device (emulator may have limitations)

### API connection issues
- Check your API endpoint configuration
- Verify network connectivity
- Check CORS settings on backend

### Build errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Expo cache: `expo start -c`

## License

MIT License - See LICENSE file for details

## Support

For issues and feature requests, please open an issue in the project repository.

## Attribution

This is a React Native conversion of the SafeDrive Mobile App UI, originally available at:
https://www.figma.com/design/JQEaR3z8loLJj2GBpteO1k/SafeDrive-Mobile-App-UI
