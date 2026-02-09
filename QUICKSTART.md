# ⚡ Quick Start Guide - SafeDrive React Native

## 30-Second Setup

### 1. Navigate to Project
```bash
cd "s:\Android App\SafeDrive-React-Native"
```

### 2. Install Dependencies
```bash
npm install
```
*Takes 2-3 minutes depending on your internet speed*

### 3. Start Development
```bash
npm start
```

### 4. Run on Android
Press `a` in the terminal OR run:
```bash
npm run android
```

That's it! 🎉 Your app is now running!

---

## What You Should See

1. **Expo startup** - Server starts on `localhost:8081`
2. **QR code** - Scan with Expo Go app (if not using Android directly)
3. **Splash screen** - SafeDrive logo with animation
4. **App loads** - You'll see the onboarding screen

---

## First Actions to Try

### Flow to Test Everything
1. Go through the onboarding (4 slides)
2. Click "Get Started" → Sign in screen
3. Click "Sign Up" → Create a test account
4. Enter test email: `test@safedrive.com`
5. Enter password: `Password123`
6. You'll see the Dashboard
7. Click "Scan Tyre" → Camera opens
8. Take a photo or pick from gallery
9. Click "Analyze" → See results
10. Click "View AI Analysis" → See GradCAM
11. Click "View All" → See History screen

---

## File Locations You Might Want to Edit

### Change App Colors
**File**: `src/styles/theme.ts`
```typescript
export const colors = {
  primary: {
    main: '#1E3A8A',  // Change this to your color
  }
}
```

### Change API Endpoint
**File**: `src/utils/api.ts`
```typescript
const API_BASE_URL = 'https://your-api-endpoint.com/v1';
```

### Add New Screen
1. Create file in `src/screens/YourScreen.tsx`
2. Import in `src/App.tsx`
3. Add to navigation stack

### Modify Existing Screen
Edit files in `src/screens/` directly - changes hot-reload!

---

## Common Commands

```bash
# Start development
npm start

# Start on Android
npm start --android
# or
npm run android

# Start on iOS
npm run ios

# Start on web
npm run web

# Build APK for release
npm run build-android

# Clear cache and restart
npm start -c

# Install a new package
npm install package-name
```

---

## Terminal Output Meanings

| Message | Meaning |
|---------|---------|
| `Expo DevTools running on...` | Server is ready |
| `Tunnel ready` | You can scan QR code |
| `Metro bundler ready` | App can load |
| Scan QR code | Use Expo Go app |
| `Connected to device` | Device is connected |

---

## Troubleshooting

### "npm: command not found"
→ Install Node.js: https://nodejs.org/

### "expo: command not found"
→ Run: `npm install -g expo-cli`

### App not loading
→ Press Ctrl+C and restart: `npm start -c`

### Camera not working
→ Test on physical Android device (emulator has limitations)

### Port 8081 already in use
→ Kill the process: `lsof -i :8081` then `kill -9 <PID>`
→ Or change port: `expo start --port 3000`

---

## Project Structure at a Glance

```
src/
├── screens/          ← Edit these to change UI
├── components/       ← Reusable parts
├── styles/          ← Colors & theme
├── utils/           ← API & helpers
└── App.tsx          ← Navigation setup
```

---

## Next Steps After Getting It Running

1. **Test all screens** - Click around, check everything works
2. **Change colors** - Edit `src/styles/theme.ts`
3. **Update API** - Edit `src/utils/api.ts`
4. **Add your backend** - Implement API calls
5. **Test on device** - Use real Android phone
6. **Build for release** - Run `npm run build-android`

---

## Important Files

| File | Purpose |
|------|---------|
| `app.json` | Expo config (app name, permissions) |
| `package.json` | Dependencies & scripts |
| `src/App.tsx` | Navigation & routing |
| `src/styles/theme.ts` | Design tokens (colors, etc) |
| `src/utils/api.ts` | API configuration |

---

## Keep This Handy

### Login Test Credentials
- Email: `test@safedrive.com`
- Password: `Password123`

### Test Screens
1. Splash → Auto-advance
2. Onboarding → Click "Get Started"
3. Login/Register → No validation, just click
4. Dashboard → Working links
5. Camera → Opens device camera
6. Results → Mock data displayed
7. History → Mock data with filters
8. Profile → All settings available

---

## Need Help?

### Read These Files (in order)
1. **Quick Start** (this file) - You are here!
2. **SETUP.md** - Detailed setup guide
3. **README.md** - Complete documentation
4. **PROJECT_SUMMARY.md** - Project overview

### Common Issue: Can't Connect to API
- Ensure your backend is running
- Check endpoint in `src/utils/api.ts`
- Verify network connectivity

### Common Issue: App Crashes
- Check terminal for error messages
- Clear cache: `npm start -c`
- Reinstall dependencies: `npm install`

---

## You're All Set! 🚀

Your React Native Android app is ready to go!

```bash
# One final command to get started:
npm install && npm start
```

Then press `a` for Android and enjoy! 

---

**Pro Tips:**
- Save files while `npm start` is running - instant reload
- Use physical device for camera testing
- Check console logs for errors (press `j` in Expo)
- Use React Native Debugger for advanced debugging

Happy coding! 🎉
