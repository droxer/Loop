# Loop · AI Learning Loop

A cross-platform application based on Expo Router + React Native + TypeScript. The repository is currently in the initialization phase, with the core goal of implementing a learning loop of "Error Recording → Weakness Analysis → Personalized Review".

## Quick Start

1. Install dependencies (Node.js 18+ required):
   ```bash
   npm install
   ```
2. Start the Expo development server:
   ```bash
   npm run start
   ```
3. Preview the app using Expo Go, iOS/Android simulators, or a web browser.

> Since dependencies cannot be installed in the current environment without internet, execute the above commands locally with an active internet connection.

## Environment Variables

Create a `.env` file in the root directory (or inject via shell) to provide Supabase connection details:

```
EXPO_PUBLIC_SUPABASE_URL=your-project-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Roadmap

- [x] Initialize Expo Router project structure
- [x] Build shared theme/state layer
- [x] Complete "Error Recording" MVP (Local Storage version)
- [ ] Integrate Supabase for cloud synchronization
- [ ] Introduce weakness analysis and review task recommendations

## Directory Structure

```
app/                # Expo Router pages
src/                # Business logic, components, hooks, etc.
```

## Error Recording MVP

1. Enter the "Record Error" page (via home button or `http://localhost:8081/records/new`).
2. Fill in subject, knowledge point, question stem, answer, reason, etc.
3. After clicking "Save Error", the record will be saved to local `AsyncStorage`, and the next review time will be automatically calculated (1-5 days depending on difficulty).
4. You can see a summary of the most recently saved error entry in the success prompt card.

> In the future, these records will be synced to Supabase, and review tasks will be pushed based on `nextReviewAt`.
