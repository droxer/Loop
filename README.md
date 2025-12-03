# Loop · AI Learning Loop

A cross-platform application based on Expo Router + React Native + TypeScript. The repository is currently in the initialization phase, with the core goal of implementing a learning loop of "Error Recording → Weakness Analysis → Personalized Review".

## Quick Start

1. Install dependencies (Node.js 18+ required):
   ```bash
   npm install
   ```
2. Start the Expo development server:
   ```bash
   npm start
   ```
3. Preview the app using Expo Go, iOS/Android simulators, or a web browser.

> **Note:** This project uses npm (not pnpm) for better compatibility with React Native and Metro bundler.

## Environment Variables

Create a `.env` file in the root directory (or inject via shell) to provide Supabase connection details:

```
EXPO_PUBLIC_SUPABASE_URL=your-project-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

See `.env.example` for all available environment variables.

## Authentication

The app uses **Supabase Authentication** with Google OAuth for user login.

To set up Google login:
1. Follow the detailed guide in [`docs/GOOGLE_LOGIN_SETUP.md`](docs/GOOGLE_LOGIN_SETUP.md)
2. Configure your Google OAuth credentials
3. Update your `.env` file with Supabase credentials
4. Run the app and test the login flow

**Quick Start:**
- Users must sign in with Google to access the app
- Sessions persist across app restarts
- Sign out from the home screen

## Roadmap

- [x] Initialize Expo Router project structure
- [x] Build shared theme/state layer
- [x] Complete "Error Recording" MVP (Local Storage version)
- [x] Integrate Supabase for authentication (Google OAuth)
- [x] Add camera functionality with AI question recognition
- [ ] Integrate Supabase for cloud synchronization
- [ ] Introduce weakness analysis and review task recommendations

## Features

### 📸 AI Question Recognition

Take a photo of a question and let AI automatically extract:
- Question text
- Student's answer
- Correct answer
- Subject and topic

**Note:** Camera functionality requires testing on a **real iOS/Android device**. The camera will not work in simulators.

See [`docs/TESTING_ON_DEVICE.md`](docs/TESTING_ON_DEVICE.md) for detailed instructions on testing with a real device.

## Directory Structure

```
app/                # Expo Router pages
src/                # Business logic, components, hooks, etc.
docs/               # Documentation
```

## Error Recording MVP

1. Enter the "Record Error" page (via home button or `http://localhost:8081/records/new`).
2. Fill in subject, knowledge point, question stem, answer, reason, etc.
3. After clicking "Save Error", the record will be saved to local `AsyncStorage`, and the next review time will be automatically calculated (1-5 days depending on difficulty).
4. You can see a summary of the most recently saved error entry in the success prompt card.

> In the future, these records will be synced to Supabase, and review tasks will be pushed based on `nextReviewAt`.

## Documentation

### Setup & Configuration
- **[Environment Setup](docs/ENVIRONMENT_SETUP.md)** - Complete setup guide for development environment
- **[Google Login Setup](docs/GOOGLE_LOGIN_SETUP.md)** - Configure Google OAuth authentication

### Development
- **[Development Guide](docs/development/DEVELOPMENT_GUIDE.md)** - Complete guide for developing Loop
- **[Testing on Device](docs/development/TESTING_ON_DEVICE.md)** - Test camera and native features on real devices

📚 **[View All Documentation](docs/README.md)** - Complete documentation index with quick start guide
