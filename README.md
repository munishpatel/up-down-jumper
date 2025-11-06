# Up Down Jumper

A React Native Expo Go project built with TypeScript.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- Expo Go app on your iOS or Android device
- For iOS development: macOS with Xcode
- For Android development: Android Studio

### Installation

1. Install dependencies:

```bash
npm install
```

### Running the App

Start the development server:

```bash
npm start
```

This will open Expo DevTools in your browser. From here you can:

- Press `i` to open in iOS simulator (macOS only)
- Press `a` to open in Android emulator
- Scan the QR code with Expo Go app on your physical device

#### Platform-specific commands:

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📱 Expo Go App

To run on your physical device:

1. Install the Expo Go app:

   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Make sure your device is on the same network as your computer

3. Scan the QR code from the terminal or Expo DevTools

## 📂 Project Structure

```
up-down-jumper/
├── .github/
│   └── copilot-instructions.md
├── assets/               # Images, fonts, and other static files
├── App.tsx              # Main application component
├── app.json             # Expo configuration
├── babel.config.js      # Babel configuration
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md            # This file
```

## 🛠 Tech Stack

- **React Native 0.81.5** - Mobile app framework
- **Expo SDK 54** - Development platform
- **TypeScript 5.9** - Type-safe JavaScript
- **React 19.1** - Latest React version
- **Expo Go** - For easy testing on physical devices

## 📝 Available Scripts

- `npm start` - Start the Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser

## 🔧 Development

The main application code is in `App.tsx`. Start by modifying this file to build your app.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
