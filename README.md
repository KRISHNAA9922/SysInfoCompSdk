# React Native System Info Components

A comprehensive React Native component library for monitoring system performance metrics including CPU usage, RAM usage, storage usage, and battery level. Built with TurboModules and TypeScript for optimal performance and type safety.

## 🚀 Features

- **CPU Usage Component** - Real-time CPU utilization monitoring
- **RAM Usage Component** - Memory usage tracking
- **Storage Usage Component** - Storage space monitoring
- **Battery Usage Component** - Battery level reporting
- **System Performance Widget** - Dashboard-style component combining all metrics
- **TurboModules Support** - Built with React Native's new architecture
- **TypeScript** - Full type safety and IntelliSense support
- **Customizable** - Flexible styling and refresh intervals

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

### Required Software
- **Node.js** (>= 20.0.0) - [Download here](https://nodejs.org/)
- **Yarn** (3.6.1) - This project uses Yarn 3
- **Java Development Kit (JDK)** (17 or higher) - [Download here](https://adoptium.net/)
- **Android Studio** - [Download here](https://developer.android.com/studio)
- **Android SDK** (API Level 24-36)
- **Xcode** (for iOS development) - [Download from App Store](https://apps.apple.com/app/xcode/id497799835)

### Environment Setup
1. **Android Environment:**
   ```bash
   # Set ANDROID_HOME environment variable
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

2. **iOS Environment (macOS only):**
   ```bash
   # Install Xcode Command Line Tools
   xcode-select --install
   
   # Install CocoaPods
   sudo gem install cocoapods
   ```

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/KRISHNAA9922/react-native-sysinfocomps.git
cd react-native-sysinfocomps
```

### 2. Install Dependencies
```bash
# Install root dependencies
yarn install

# Install example app dependencies
cd example
yarn install
cd ..
```

### 3. Build the Library
```bash
# Build TypeScript to JavaScript
yarn build
```

## 🏃‍♂️ Running the Project

### Android Development

#### Option 1: Using Yarn Scripts (Recommended)
```bash
# Build and run on Android
yarn example android

# Or build library first, then run
yarn build
cd example
yarn android
```

#### Option 2: Using React Native CLI
```bash
# Start Metro bundler
yarn example start

# In another terminal, run Android
cd example
yarn android
```

#### Option 3: Android Studio
1. Open `example/android` folder in Android Studio
2. Wait for Gradle sync to complete
3. Click the "Run" button or press `Shift + F10`

### iOS Development (macOS only)

#### Option 1: Using Yarn Scripts
```bash
# Install iOS dependencies and run
yarn example ios
```

#### Option 2: Manual Setup
```bash
# Install CocoaPods dependencies
cd example/ios
pod install
cd ../..

# Run iOS app
cd example
yarn ios
```

#### Option 3: Xcode
1. Navigate to `example/ios`
2. Run `pod install`
3. Open `SysinfocompsExample.xcworkspace` in Xcode
4. Select a simulator and click "Run"

## 🔧 Development Commands

### Library Development
```bash
# Build the library
yarn build

# Type checking
yarn typecheck

# Linting
yarn lint

# Run tests
yarn test

# Clean build artifacts
yarn clean
```

### Example App Development
```bash
# Build Android APK
yarn build:android

# Generate Android codegen artifacts
yarn codegen:android

# Development build with library rebuild
cd example
yarn androidDev  # or iosDev for iOS
```

## 📱 Usage Examples

### Individual Components
```tsx
import React from 'react';
import { 
  CPUUsageComponent, 
  RAMUsageComponent, 
  StorageUsageComponent, 
  BatteryUsageComponent 
} from 'react-native-sysinfocomps';

export default function MyApp() {
  return (
    <>
      <CPUUsageComponent 
        label="CPU Usage" 
        refreshInterval={1000}
        style={{ padding: 16 }}
      />
      
      <RAMUsageComponent 
        label="Memory Usage" 
        refreshInterval={2000}
      />
      
      <StorageUsageComponent 
        label="Storage Usage" 
        refreshInterval={5000}
      />
      
      <BatteryUsageComponent 
        label="Battery Level" 
        refreshInterval={1000}
      />
    </>
  );
}
```

### System Performance Widget
```tsx
import React from 'react';
import { SystemPerformanceWidget } from 'react-native-sysinfocomps';

export default function Dashboard() {
  return (
    <SystemPerformanceWidget
      refreshInterval={1000}
      showCPU={true}
      showRAM={true}
      showStorage={true}
      showBattery={true}
      style={{ margin: 16 }}
    />
  );
}
```

### Direct Native API Access
```tsx
import { SystemInfo } from 'react-native-sysinfocomps';

// Get system metrics directly
const getSystemMetrics = async () => {
  try {
    const cpuUsage = await SystemInfo.getCPUUsage();
    const ramUsage = await SystemInfo.getRAMUsage();
    const storageUsage = await SystemInfo.getStorageUsage();
    const batteryLevel = await SystemInfo.getBatteryUsage();
    const system = await SystemInfo.getSystemInfo();
    
    console.log('CPU:', cpuUsage, '%');
    console.log('RAM:', ramUsage, '%');
    console.log('Storage:', storageUsage, '%');
    console.log('Battery:', batteryLevel, '%');
    console.log('System:', system);
  } catch (error) {
    console.error('Error getting system metrics:', error);
  }
};
```

## 🎛️ Component Props

### Common Props (All Components)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | Component-specific | Display label for the metric |
| `refreshInterval` | `number` | `1000` | Polling interval in milliseconds |
| `style` | `ViewStyle` | `undefined` | Container styling |
| `labelStyle` | `TextStyle` | `undefined` | Label text styling |
| `valueStyle` | `TextStyle` | `undefined` | Value text styling |

### SystemPerformanceWidget Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `refreshInterval` | `number` | `1000` | Polling interval for all components |
| `showCPU` | `boolean` | `true` | Show/hide CPU component |
| `showRAM` | `boolean` | `true` | Show/hide RAM component |
| `showStorage` | `boolean` | `true` | Show/hide Storage component |
| `showBattery` | `boolean` | `true` | Show/hide Battery component |
| `style` | `ViewStyle` | `undefined` | Widget container styling |
| `componentStyle` | `ViewStyle` | `undefined` | Individual component styling |
| `labelStyle` | `TextStyle` | `undefined` | Label text styling |
| `valueStyle` | `TextStyle` | `undefined` | Value text styling |

## 🏗️ Architecture

### Native Implementation
- **Android**: Kotlin-based TurboModule implementation
  - CPU Usage: Reads `/proc/stat` for accurate CPU metrics
  - RAM Usage: Uses `Runtime.getRuntime()` for memory information
  - Storage Usage: Uses `StatFs` for storage metrics
  - Battery Usage: Uses `BatteryManager` for battery level
  - System Info: Uses `Build`, `PackageManager`, `Settings.Secure` for device/app details

### Project Structure
```
├── src/                          # TypeScript source code
│   ├── CPUUsageComponent.tsx     # CPU usage component
│   ├── RAMUsageComponent.tsx     # RAM usage component
│   ├── StorageUsageComponent.tsx # Storage usage component
│   ├── BatteryUsageComponent.tsx # Battery usage component
│   ├── SystemPerformanceWidget.tsx # Dashboard widget
│   ├── NativeSysinfocomps.ts       # TurboModule interface
│   └── index.tsx                 # Main exports
├── android/                      # Android native code
│   └── src/main/java/com/sysinfocomps/
│       ├── SysinfocompsModule.kt # Main TurboModule
│       └── SysinfocompsPackage.kt # Package registration
├── example/                      # Example React Native app
│   ├── src/App.tsx              # Demo application
│   ├── android/                 # Android example
│   └── ios/                     # iOS example
└── lib/                         # Built JavaScript output
```

## 🧪 Testing

### Run Tests
```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test --watch

# Run tests with coverage
yarn test --coverage
```

### Manual Testing
1. Run the example app on a physical device or emulator
2. Verify all components display real-time data
3. Test different refresh intervals
4. Toggle component visibility in the widget
5. Check error handling with invalid configurations

## 📦 Building for Production

### Library Build
```bash
# Build for production
yarn build

# The built files will be in the `lib/` directory
```

### Example App Build
```bash
# Android release build
cd example/android
./gradlew assembleRelease

# iOS release build (macOS only)
cd example/ios
xcodebuild -workspace SysinfocompsExample.xcworkspace -scheme SysinfocompsExample -configuration Release
```

## 🐛 Troubleshooting

### Common Issues

#### Android Build Issues
```bash
# Clean and rebuild
yarn clean
yarn build
cd example/android
./gradlew clean
./gradlew assembleDebug
```

#### Metro Bundler Issues
```bash
# Clear Metro cache
yarn example start --reset-cache
```

#### iOS Build Issues
```bash
# Clean and reinstall pods
cd example/ios
rm -rf Pods Podfile.lock
pod install
```

#### Permission Issues
- Ensure Android emulator has proper permissions
- Check that device is connected and authorized
- Verify Android SDK and build tools are properly installed

### Debug Mode
```bash
# Enable debug logging
cd example
yarn start --verbose
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run `yarn lint` and `yarn test`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
- Uses React Native TurboModules for optimal performance
- Inspired by system monitoring needs in React Native applications

---

**Made with ❤️ for the React Native community**
