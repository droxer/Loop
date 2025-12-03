# Testing on Real iOS Device

This guide explains how to test the Loop app on a real iPhone/iPad device for development and debugging, which is **required** for testing camera functionality.

## Why Test on a Real Device?

The iOS Simulator has limitations:
- ❌ **Camera does not work** - CameraView will show a black screen
- ❌ No access to device sensors (accelerometer, gyroscope)
- ❌ Different performance characteristics
- ✅ **Real device testing is required** for camera features

## Prerequisites

1. **Mac with Xcode installed**
2. **iPhone or iPad** with iOS 13.0 or later
3. **USB cable** to connect device to Mac
4. **Apple ID** (free developer account works)

## Setup Steps

### 1. Trust Your Mac on iPhone

1. Connect your iPhone to your Mac via USB
2. On your iPhone, you'll see a prompt: **"Trust This Computer?"**
3. Tap **Trust** and enter your device passcode

### 2. Register Your Device with Xcode

1. Open Xcode (if not installed: `xcode-select --install`)
2. Go to **Window → Devices and Simulators**
3. Select your device from the left sidebar
4. If prompted, click **"Use for Development"**
5. Your device should show as **"Connected"**

### 3. Configure Code Signing (First Time Only)

1. Open the iOS project in Xcode:
   ```bash
   open ios/Loop.xcworkspace
   ```

2. Select the **Loop** project in the left sidebar
3. Select the **Loop** target
4. Go to **Signing & Capabilities** tab
5. Check **"Automatically manage signing"**
6. Select your **Team** (your Apple ID)
   - If you don't see a team, click **"Add Account"** and sign in with your Apple ID
7. Xcode will automatically create a provisioning profile

### 4. Build and Run on Device

#### Option A: Using Expo CLI (Recommended)

```bash
# List available devices
npx expo run:ios --device

# Or specify device by name
npx expo run:ios --device "Your iPhone Name"
```

The app will:
1. Build the native iOS app
2. Install it on your device
3. Launch automatically
4. Start Metro bundler for hot reloading

#### Option B: Using Xcode

1. Open the workspace:
   ```bash
   open ios/Loop.xcworkspace
   ```

2. Select your device from the device dropdown (top toolbar)
3. Click the **Play** button (▶️) or press `Cmd + R`
4. In a separate terminal, start Metro:
   ```bash
   npx expo start
   ```

## Debugging on Device

### View Console Logs

**Option 1: Xcode Console**
1. Open Xcode
2. Go to **Window → Devices and Simulators**
3. Select your device
4. Click **"Open Console"** button
5. Filter by "Loop" to see your app's logs

**Option 2: React Native Debugger**
1. Shake your device to open the developer menu
2. Tap **"Debug"** to connect to Chrome DevTools
3. Open Chrome and go to `chrome://inspect`

**Option 3: Terminal Logs**
```bash
# View all device logs
xcrun simctl spawn booted log stream --predicate 'processImagePath contains "Loop"'

# Or use React Native CLI
npx react-native log-ios
```

### Enable Developer Mode (iOS 16+)

If you see "Developer Mode Required":
1. Go to **Settings → Privacy & Security**
2. Scroll down to **Developer Mode**
3. Toggle it **ON**
4. Restart your iPhone
5. Confirm when prompted

### Hot Reloading

Once the app is running on your device:
- **Shake device** to open developer menu
- Enable **"Fast Refresh"** for automatic reloading
- Or press `Cmd + D` in terminal to reload manually

## Testing Camera Functionality

1. Build and run on device using steps above
2. Navigate to the camera screen in the app
3. Grant camera permissions when prompted
4. You should see the **live camera preview** 📸
5. Test taking pictures and AI recognition

## Common Issues

### "Untrusted Developer"

**Problem:** App won't open, shows "Untrusted Enterprise Developer"

**Solution:**
1. Go to **Settings → General → VPN & Device Management**
2. Find your Apple ID under **Developer App**
3. Tap **Trust "[Your Apple ID]"**
4. Confirm by tapping **Trust**

### "Could not launch [app]"

**Problem:** Xcode can't launch the app

**Solution:**
1. Disconnect and reconnect your device
2. Clean build folder: `Cmd + Shift + K` in Xcode
3. Delete app from device and rebuild
4. Restart Xcode

### "No devices found"

**Problem:** Expo can't find your device

**Solution:**
```bash
# Check if device is connected
xcrun xctrace list devices

# If not listed, try:
# 1. Unplug and replug USB cable
# 2. Unlock your device
# 3. Trust the computer again
```

### Build Fails with Code Signing Error

**Problem:** "Code signing is required"

**Solution:**
1. Open `ios/Loop.xcworkspace` in Xcode
2. Select **Loop** target
3. Go to **Signing & Capabilities**
4. Change **Bundle Identifier** to something unique:
   - Example: `com.yourname.loop`
5. Select your Team
6. Clean and rebuild

### Metro Bundler Connection Issues

**Problem:** App shows "Unable to connect to Metro"

**Solution:**
1. Ensure Mac and iPhone are on the **same WiFi network**
2. Check firewall isn't blocking port 8081
3. Manually enter Metro URL:
   - Shake device → **Settings**
   - Enter your Mac's IP: `http://192.168.x.x:8081`

## Performance Tips

### Faster Rebuilds

```bash
# Skip bundling if only native code changed
npx expo run:ios --device --no-bundler

# Then start bundler separately
npx expo start
```

### Production Build Testing

```bash
# Build release version for better performance
npx expo run:ios --device --configuration Release
```

## Wireless Debugging (iOS 13+)

After initial USB setup, you can debug wirelessly:

1. Connect device via USB
2. Open Xcode → **Window → Devices and Simulators**
3. Select your device
4. Check **"Connect via network"**
5. Wait for network icon to appear
6. Disconnect USB cable
7. Device should stay connected over WiFi

## Next Steps

- Test all app features on the device
- Check performance and responsiveness
- Test camera, permissions, and native features
- Use Xcode Instruments for performance profiling

## Resources

- [Expo Device Testing](https://docs.expo.dev/guides/testing-on-devices/)
- [Apple Developer - Running on Device](https://developer.apple.com/documentation/xcode/running-your-app-in-simulator-or-on-a-device)
- [React Native Debugging](https://reactnative.dev/docs/debugging)
