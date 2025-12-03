# Development Guide

Complete guide for developing the Loop application.

## Table of Contents

- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Component Development](#component-development)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Testing](#testing)
- [Debugging](#debugging)
- [Performance](#performance)

## Project Structure

```
loop/
├── app/                      # Expo Router pages (file-based routing)
│   ├── (tabs)/              # Tab navigation screens
│   │   ├── index.tsx        # Home screen
│   │   ├── chat.tsx         # Chat screen
│   │   └── dashboard.tsx    # Dashboard screen
│   ├── auth/                # Authentication screens
│   ├── records/             # Record management screens
│   ├── camera.tsx           # Camera screen
│   ├── login.tsx            # Login screen
│   └── _layout.tsx          # Root layout
├── src/                     # Source code
│   ├── components/          # Reusable UI components
│   ├── features/            # Feature-specific code
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and helpers
│   ├── providers/           # Context providers
│   ├── services/            # API and external services
│   └── types/               # TypeScript type definitions
├── docs/                    # Documentation
├── ios/                     # iOS native code
├── android/                 # Android native code
└── assets/                  # Static assets
```

### Key Directories

- **`app/`** - All screens and routes (Expo Router convention)
- **`src/components/`** - Shared UI components (Button, Card, etc.)
- **`src/features/`** - Feature modules (records, chat, etc.)
- **`src/providers/`** - React Context providers (Theme, Auth, etc.)
- **`src/services/`** - External integrations (Supabase, OpenAI, etc.)

## Development Workflow

### 1. Start Development Server

```bash
npm start
```

### 2. Run on Platform

```bash
# iOS Simulator
npm run ios

# Android Emulator  
npm run android

# Web Browser
npm run web

# Real Device
npx expo run:ios --device
```

### 3. Make Changes

- Edit files in `app/` or `src/`
- Save to trigger Fast Refresh
- Changes appear instantly in the app

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add new feature"
git push
```

## Code Style

### TypeScript

All code must be TypeScript with proper typing:

```typescript
// ✅ Good
interface User {
  id: string;
  email: string;
  name?: string;
}

function getUser(id: string): Promise<User> {
  // ...
}

// ❌ Bad
function getUser(id: any): any {
  // ...
}
```

### React Components

Use functional components with hooks:

```typescript
// ✅ Good
export function MyComponent({ title }: { title: string }) {
  const [count, setCount] = useState(0);
  
  return <Text>{title}: {count}</Text>;
}

// ❌ Bad
export default class MyComponent extends Component {
  // ...
}
```

### File Naming

- **Components**: PascalCase - `MyComponent.tsx`
- **Hooks**: camelCase with 'use' prefix - `useMyHook.ts`
- **Utilities**: camelCase - `formatDate.ts`
- **Types**: PascalCase - `User.ts`
- **Screens**: camelCase - `index.tsx`, `login.tsx`

### Import Order

```typescript
// 1. React imports
import { useState, useEffect } from 'react';

// 2. React Native imports
import { View, Text } from 'react-native';

// 3. Third-party imports
import { useRouter } from 'expo-router';

// 4. Local imports
import { useTheme } from '../providers/ThemeProvider';
import { Button } from '../components/Button';
```

## Component Development

### Creating a New Component

1. Create file in `src/components/`:

```typescript
// src/components/MyButton.tsx
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../providers/ThemeProvider';

interface MyButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export function MyButton({ title, onPress, variant = 'primary' }: MyButtonProps) {
  const { theme } = useTheme();
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: variant === 'primary' ? theme.colors.primary : theme.colors.secondary }
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '600',
  },
});
```

2. Export from index (if needed):

```typescript
// src/components/index.ts
export { MyButton } from './MyButton';
export { Card } from './Card';
// ...
```

3. Use in screens:

```typescript
import { MyButton } from '../src/components/MyButton';

export default function MyScreen() {
  return <MyButton title="Click me" onPress={() => console.log('Clicked')} />;
}
```

### Using Theme

Always use the theme provider for colors and spacing:

```typescript
import { useTheme } from '../src/providers/ThemeProvider';

export function MyComponent() {
  const { theme } = useTheme();
  
  return (
    <View style={{ 
      backgroundColor: theme.colors.background,
      padding: theme.spacing.md 
    }}>
      <Text style={{ color: theme.colors.text }}>Hello</Text>
    </View>
  );
}
```

## State Management

### Local State (useState)

For component-specific state:

```typescript
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <Button onPress={() => setCount(count + 1)}>
      Count: {count}
    </Button>
  );
}
```

### Global State (Context)

For app-wide state, use Context providers:

```typescript
// src/providers/MyProvider.tsx
import { createContext, useContext, useState } from 'react';

interface MyContextValue {
  data: string;
  setData: (data: string) => void;
}

const MyContext = createContext<MyContextValue | null>(null);

export function MyProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState('');
  
  return (
    <MyContext.Provider value={{ data, setData }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) throw new Error('useMyContext must be used within MyProvider');
  return context;
}
```

### Custom Hooks

Extract reusable logic into custom hooks:

```typescript
// src/hooks/useRecords.ts
export function useRecords() {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadRecords();
  }, []);
  
  async function loadRecords() {
    setLoading(true);
    const data = await fetchRecords();
    setRecords(data);
    setLoading(false);
  }
  
  return { records, loading, refresh: loadRecords };
}
```

## API Integration

### Supabase

Use the Supabase client from `src/lib/supabase.ts`:

```typescript
import { supabase } from '../lib/supabase';

// Query data
const { data, error } = await supabase
  .from('records')
  .select('*')
  .eq('user_id', userId);

// Insert data
const { data, error } = await supabase
  .from('records')
  .insert({ title: 'New Record' });

// Update data
const { data, error } = await supabase
  .from('records')
  .update({ title: 'Updated' })
  .eq('id', recordId);
```

### OpenAI

Use the AI service from `src/services/ai.ts`:

```typescript
import { analyzeImage } from '../services/ai';

const result = await analyzeImage(base64Image);
console.log(result.question);
console.log(result.correctAnswer);
```

### Error Handling

Always handle errors gracefully:

```typescript
try {
  const data = await fetchData();
  setData(data);
} catch (error) {
  console.error('Failed to fetch:', error);
  Alert.alert('Error', error instanceof Error ? error.message : 'Unknown error');
}
```

## Testing

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

### Manual Testing Checklist

- [ ] Test on iOS simulator
- [ ] Test on Android emulator
- [ ] Test on real device
- [ ] Test in light and dark mode
- [ ] Test with slow network
- [ ] Test offline behavior
- [ ] Test error states
- [ ] Test loading states

## Debugging

### Console Logging

```typescript
console.log('Debug:', value);
console.error('Error:', error);
console.warn('Warning:', warning);
```

### React DevTools

1. Shake device to open developer menu
2. Select "Debug" to connect to Chrome DevTools
3. Open Chrome: `chrome://inspect`

### Expo DevTools

Access at `http://localhost:8081` when Metro is running.

### Network Debugging

Use React Native Debugger or Flipper to inspect network requests.

### Common Debug Commands

```bash
# Clear cache
npx expo start --clear

# Reset Metro bundler
npx expo start --reset-cache

# View logs
npx react-native log-ios
npx react-native log-android
```

## Performance

### Optimization Tips

1. **Use React.memo** for expensive components:
```typescript
export const ExpensiveComponent = React.memo(({ data }) => {
  // ...
});
```

2. **Use useCallback** for functions passed as props:
```typescript
const handlePress = useCallback(() => {
  // ...
}, [dependencies]);
```

3. **Use useMemo** for expensive calculations:
```typescript
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.value - b.value);
}, [data]);
```

4. **Optimize images**:
```typescript
<Image 
  source={{ uri: imageUrl }}
  style={{ width: 100, height: 100 }}
  resizeMode="cover"
/>
```

5. **Use FlatList** for long lists:
```typescript
<FlatList
  data={items}
  renderItem={({ item }) => <Item data={item} />}
  keyExtractor={item => item.id}
  windowSize={10}
/>
```

## Best Practices

### Do's ✅

- Use TypeScript for all new code
- Follow the existing code structure
- Write descriptive commit messages
- Handle errors gracefully
- Use theme colors and spacing
- Test on multiple platforms
- Keep components small and focused
- Use custom hooks for reusable logic

### Don'ts ❌

- Don't use `any` type
- Don't commit `.env` file
- Don't hardcode colors or spacing
- Don't ignore TypeScript errors
- Don't use class components
- Don't skip error handling
- Don't commit commented-out code
- Don't use inline styles excessively

## Git Workflow

### Commit Message Format

```
type(scope): subject

body (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Maintenance

Examples:
```
feat(camera): add AI question recognition
fix(auth): resolve login redirect issue
docs(readme): update installation steps
```

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Hooks](https://react.dev/reference/react)
- [Supabase Docs](https://supabase.com/docs)

## Getting Help

1. Check existing documentation
2. Search for similar issues
3. Ask in team chat
4. Create detailed issue with:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots/logs
   - Environment details
