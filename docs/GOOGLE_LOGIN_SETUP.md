# Google Login Setup with Supabase

This guide will walk you through setting up Google OAuth authentication in your Loop app using Supabase.

## Prerequisites

- A Supabase project (create one at [supabase.com](https://supabase.com))
- A Google Cloud Console project for OAuth credentials

## Step 1: Configure Google OAuth in Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Configure the OAuth consent screen if you haven't already
6. For **Application type**, select:
   - **Web application** (for web and general use)
   - **iOS** (if deploying to iOS)
   - **Android** (if deploying to Android)

### Web Application Setup

For the web client:
- **Authorized JavaScript origins**: Add your Supabase project URL
  - `https://your-project.supabase.co`
- **Authorized redirect URIs**: Add your Supabase auth callback URL
  - `https://your-project.supabase.co/auth/v1/callback`

### iOS Setup (Optional)

1. Create an **iOS** OAuth client ID
2. Add your iOS bundle identifier (from `app.json`)
3. Save the iOS client ID for later

### Android Setup (Optional)

1. Create an **Android** OAuth client ID
2. Add your package name (from `app.json`)
3. Add your SHA-1 certificate fingerprint
4. Save the Android client ID for later

## Step 2: Configure Supabase

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** > **Providers**
3. Find **Google** in the list and click to configure
4. Enable the Google provider
5. Enter your **Google Client ID** (from the Web application)
6. Enter your **Google Client Secret** (from the Web application)
7. Click **Save**

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your Supabase credentials:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   
   # Optional: Add Google client IDs for native platforms
   EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-google-web-client-id
   EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your-google-ios-client-id
   EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your-google-android-client-id
   ```

3. Get your Supabase credentials:
   - Go to **Project Settings** > **API** in your Supabase dashboard
   - Copy the **Project URL** (EXPO_PUBLIC_SUPABASE_URL)
   - Copy the **anon/public** key (EXPO_PUBLIC_SUPABASE_ANON_KEY)

## Step 4: Configure Deep Linking (for Native Apps)

### Update app.json

Add the following to your `app.json`:

```json
{
  "expo": {
    "scheme": "loop",
    "ios": {
      "bundleIdentifier": "com.yourcompany.loop"
    },
    "android": {
      "package": "com.yourcompany.loop"
    }
  }
}
```

### iOS Configuration

For iOS, you'll need to add URL schemes in your `ios/Loop/Info.plist`:

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>loop</string>
    </array>
  </dict>
</array>
```

### Android Configuration

For Android, the deep linking is automatically configured by Expo.

## Step 5: Test the Authentication Flow

1. Start the development server:
   ```bash
   npm run start
   ```

2. Open the app on your device or simulator

3. You should see the login screen

4. Click "使用 Google 登录" (Sign in with Google)

5. Complete the Google OAuth flow

6. You should be redirected back to the app and see the home screen with your email

## How It Works

### Authentication Flow

1. **User clicks "Sign in with Google"**
   - On web: Opens Google OAuth in the same window
   - On native: Opens Google OAuth in an in-app browser

2. **User authorizes the app**
   - Google redirects to Supabase callback URL
   - Supabase creates a session and redirects back to the app

3. **App receives the session**
   - AuthProvider detects the session change
   - User is authenticated and redirected to home screen

### Session Persistence

- Sessions are stored in AsyncStorage (React Native)
- Sessions persist across app restarts
- Sessions are automatically refreshed when they expire

### Protected Routes

The home screen (`app/index.tsx`) checks for authentication:
- If not authenticated, redirects to `/login`
- If authenticated, shows the home screen with user info

## Troubleshooting

### "Error signing in with Google"

- Check that your Google OAuth credentials are correct
- Verify that the redirect URIs are properly configured
- Ensure your Supabase project URL is correct

### "No authorization URL returned"

- Check your Supabase configuration
- Verify that the Google provider is enabled in Supabase

### Deep linking not working on native

- Verify your app scheme is configured in `app.json`
- Rebuild the native apps after changing `app.json`:
  ```bash
  npm run ios
  # or
  npm run android
  ```

### Session not persisting

- Check that AsyncStorage is properly installed
- Verify that the Supabase client is configured with `persistSession: true`

## Files Modified

- `src/providers/AuthProvider.tsx` - Authentication context and logic
- `src/lib/supabase.ts` - Supabase client configuration
- `app/_layout.tsx` - Added AuthProvider to app root
- `app/login.tsx` - Login screen with Google sign-in
- `app/index.tsx` - Protected home screen
- `app/auth/callback.tsx` - OAuth callback handler
- `.env.example` - Environment variables template

## Next Steps

- Add email/password authentication
- Implement password reset flow
- Add user profile management
- Set up Row Level Security (RLS) policies in Supabase
- Add social login with other providers (GitHub, Apple, etc.)

## Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Expo Auth Session](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
