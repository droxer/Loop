# Loop Documentation

Welcome to the Loop documentation! This directory contains all guides and documentation for developing and using the Loop application.

## 📚 Documentation Index

### Getting Started

1. **[Environment Setup](./ENVIRONMENT_SETUP.md)** - Set up your development environment
   - Prerequisites and required software
   - Installation steps
   - Environment variables configuration
   - Troubleshooting common setup issues

2. **[Google Login Setup](./GOOGLE_LOGIN_SETUP.md)** - Configure Google OAuth authentication
   - Google Cloud Console setup
   - Supabase configuration
   - Platform-specific setup (iOS, Android, Web)

### Development

3. **[Development Guide](./development/DEVELOPMENT_GUIDE.md)** - Complete development guide
   - Project structure
   - Code style and best practices
   - Component development
   - State management
   - API integration
   - Debugging techniques

4. **[Testing on Device](./development/TESTING_ON_DEVICE.md)** - Test on real iOS/Android devices
   - Why test on real devices
   - Setup and configuration
   - Building and running
   - Debugging on device
   - Common issues and solutions

## 🚀 Quick Start

New to the project? Follow these steps:

1. **Environment Setup** → Set up your development environment
2. **Google Login Setup** → Configure authentication
3. **Development Guide** → Learn the codebase and workflows
4. **Testing on Device** → Test camera and native features

## 📖 Documentation Structure

```
docs/
├── README.md                          # This file
├── ENVIRONMENT_SETUP.md               # Environment and installation guide
├── GOOGLE_LOGIN_SETUP.md              # Google OAuth configuration
└── development/                       # Development-specific docs
    ├── DEVELOPMENT_GUIDE.md           # Complete development guide
    └── TESTING_ON_DEVICE.md           # Device testing guide
```

## 🎯 Common Tasks

### First Time Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# 3. Install iOS dependencies (macOS only)
cd ios && pod install && cd ..

# 4. Start development server
npm start
```

### Daily Development

```bash
# Start Metro bundler
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on real device
npx expo run:ios --device
```

### Testing Camera Features

Camera requires a **real device** (simulator shows black screen):

```bash
# Build and run on connected iPhone
npx expo run:ios --device
```

See [Testing on Device](./development/TESTING_ON_DEVICE.md) for detailed instructions.

## 🔧 Troubleshooting

### Common Issues

| Issue | Solution | Guide |
|-------|----------|-------|
| Dependencies not installing | `rm -rf node_modules && npm install` | [Environment Setup](./ENVIRONMENT_SETUP.md#common-setup-issues) |
| iOS build fails | `cd ios && pod install && cd ..` | [Environment Setup](./ENVIRONMENT_SETUP.md#issue-ios-build-fails-with-pod-errors) |
| Camera shows black screen | Test on real device, not simulator | [Testing on Device](./development/TESTING_ON_DEVICE.md) |
| Google login not working | Check OAuth configuration | [Google Login Setup](./GOOGLE_LOGIN_SETUP.md) |
| Environment variables not loading | Restart Metro with `--clear` flag | [Environment Setup](./ENVIRONMENT_SETUP.md#issue-environment-variables-not-loading) |

## 📝 Contributing to Documentation

When adding new documentation:

1. **Place it in the right category**:
   - Setup/configuration → Root `docs/` folder
   - Development workflows → `docs/development/`

2. **Follow the format**:
   - Clear headings and sections
   - Code examples with syntax highlighting
   - Step-by-step instructions
   - Troubleshooting sections

3. **Update this README**:
   - Add link to new doc in the index
   - Update quick start if needed
   - Add to common tasks if applicable

## 🔗 External Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)

## 💡 Tips

- **Use the search** - Most IDEs can search across all markdown files
- **Check examples** - Code examples are tested and working
- **Follow links** - Docs reference each other for related topics
- **Keep updated** - Documentation evolves with the codebase

## 📧 Need Help?

1. Check the relevant documentation guide
2. Search for similar issues in the codebase
3. Review error messages carefully
4. Ask in team chat or create an issue

---

**Happy coding! 🚀**
