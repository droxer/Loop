# Environment Setup Guide

Complete guide for setting up the Loop development environment.

## Prerequisites

### Required Software

- **Node.js** 18.x or later ([Download](https://nodejs.org/))
- **npm** 9.x or later (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Expo CLI** (installed automatically with the project)

### Platform-Specific Requirements

#### For iOS Development
- **macOS** (required for iOS development)
- **Xcode** 14.0 or later ([Mac App Store](https://apps.apple.com/app/xcode/id497799835))
- **Xcode Command Line Tools**:
  ```bash
  xcode-select --install
  ```
- **CocoaPods** (for iOS native dependencies):
  ```bash
  sudo gem install cocoapods
  ```

#### For Android Development
- **Android Studio** ([Download](https://developer.android.com/studio))
- **Android SDK** (installed via Android Studio)
- **Java Development Kit (JDK)** 11 or later

#### For Web Development
- Any modern web browser (Chrome, Firefox, Safari, Edge)

## Initial Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd loop
```

### 2. Install Dependencies

```bash
npm install
```

This will install all JavaScript dependencies including:
- React Native
- Expo SDK
- Supabase client
- UI libraries
- Development tools

### 3. Install iOS Native Dependencies

If developing for iOS:

```bash
cd ios
pod install
cd ..
```

This installs native iOS modules (camera, image picker, etc.) via CocoaPods.

## Environment Variables

### 1. Create Environment File

Copy the example environment file:

```bash
cp .env.example .env
```

### 2. Configure Required Variables

Edit `.env` and add your credentials:

```bash
# Supabase Configuration (Required)
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Google OAuth (Required for login)
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-web-client-id
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your-ios-client-id
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your-android-client-id

# OpenAI API (Required for AI features)
EXPO_PUBLIC_OPENAI_API_KEY=sk-your-openai-api-key
```

### 3. Get Credentials

#### Supabase Setup

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings → API**
4. Copy:
   - **Project URL** → `EXPO_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `EXPO_PUBLIC_SUPABASE_ANON_KEY`

#### Google OAuth Setup

See detailed guide: [`GOOGLE_LOGIN_SETUP.md`](./GOOGLE_LOGIN_SETUP.md)

Quick steps:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Configure authorized redirect URIs in Supabase

#### OpenAI API Setup

1. Create account at [platform.openai.com](https://platform.openai.com)
2. Go to **API Keys** section
3. Create a new secret key
4. Copy the key → `EXPO_PUBLIC_OPENAI_API_KEY`

**Note:** Keep your API keys secure and never commit them to version control!

## Verify Installation

### Check Node.js and npm

```bash
node --version  # Should be 18.x or later
npm --version   # Should be 9.x or later
```

### Check Expo

```bash
npx expo --version
```

### Check iOS Tools (macOS only)

```bash
xcodebuild -version  # Should show Xcode version
pod --version        # Should show CocoaPods version
```

### Check Android Tools

```bash
# Check if Android SDK is installed
echo $ANDROID_HOME

# Should point to Android SDK location
# Example: /Users/username/Library/Android/sdk
```

## Start Development Server

### Start Expo Dev Server

```bash
npm start
```

This will:
- Start Metro bundler
- Open Expo DevTools in your browser
- Show QR code for Expo Go app
- Provide options to run on iOS/Android/Web

### Run on Specific Platform

```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web Browser
npm run web
```

## IDE Setup

### Recommended: Visual Studio Code

1. Install [VS Code](https://code.visualstudio.com/)
2. Install recommended extensions:
   - **ES7+ React/Redux/React-Native snippets**
   - **Prettier - Code formatter**
   - **ESLint**
   - **React Native Tools**
   - **TypeScript and JavaScript Language Features**

3. Open the project:
   ```bash
   code .
   ```

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

## Common Setup Issues

### Issue: "Cannot find module 'expo'"

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: iOS build fails with pod errors

**Solution:**
```bash
cd ios
rm -rf Pods Podfile.lock
pod install --repo-update
cd ..
```

### Issue: Metro bundler port already in use

**Solution:**
```bash
# Kill process on port 8081
lsof -ti:8081 | xargs kill -9

# Or start on different port
npx expo start --port 8082
```

### Issue: Android build fails

**Solution:**
```bash
cd android
./gradlew clean
cd ..
```

### Issue: Environment variables not loading

**Solution:**
1. Ensure `.env` file is in project root
2. Restart Metro bundler completely
3. Clear cache: `npx expo start --clear`

## Development Workflow

### 1. Start Development

```bash
# Terminal 1: Start Metro bundler
npm start

# Terminal 2: Run on iOS (if needed)
npm run ios

# Or run on Android
npm run android
```

### 2. Enable Fast Refresh

- In Expo DevTools, enable **Fast Refresh**
- Changes will auto-reload in the app
- Shake device to open developer menu

### 3. View Logs

```bash
# All logs
npx expo start

# iOS logs only
npx react-native log-ios

# Android logs only
npx react-native log-android
```

### 4. Clear Cache (when needed)

```bash
# Clear Metro bundler cache
npx expo start --clear

# Clear all caches
rm -rf node_modules .expo ios/Pods
npm install
cd ios && pod install && cd ..
```

## Testing Setup

### Run Type Checking

```bash
npm run typecheck
```

### Run Linting

```bash
npm run lint
```

### Fix Linting Issues

```bash
npm run lint -- --fix
```

## Next Steps

After environment setup:

1. **Configure Authentication** - See [`GOOGLE_LOGIN_SETUP.md`](./GOOGLE_LOGIN_SETUP.md)
2. **Test on Device** - See [`development/TESTING_ON_DEVICE.md`](./development/TESTING_ON_DEVICE.md)
3. **Start Development** - See [`development/DEVELOPMENT_GUIDE.md`](./development/DEVELOPMENT_GUIDE.md)

## Troubleshooting

If you encounter issues:

1. Check the [Expo documentation](https://docs.expo.dev/)
2. Search [Expo forums](https://forums.expo.dev/)
3. Check [React Native documentation](https://reactnative.dev/docs/getting-started)
4. Review error messages carefully - they often contain solutions

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
