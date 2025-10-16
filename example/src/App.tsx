import { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Switch,
  //Pressable,
  //FlatList,
  TextInput,
  Pressable,
} from 'react-native';
import { getAppTheme } from './theme';
import { SystemInfo } from 'react-native-sysinfocomps';
import {
  CPUUsageComponent,
  RAMUsageComponent,
  StorageUsageComponent,
  BatteryUsageComponent,
  SystemPerformanceWidget,
} from 'react-native-sysinfocomps';

export default function App() {
  const [refreshInterval, setRefreshInterval] = useState(1000);
  //const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showCPU, setShowCPU] = useState(true);
  const [showRAM, setShowRAM] = useState(true);
  const [showStorage, setShowStorage] = useState(true);
  const [showBattery, setShowBattery] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [sysInfo, setSysInfo] = useState<any | null>(null);
  const [isSysInfoOpen, setIsSysInfoOpen] = useState(false);

  const theme = getAppTheme(isDark);

  useEffect(() => {
    SystemInfo.getSystemInfo()
      .then(setSysInfo)
      .catch(() => setSysInfo(null));
  }, []);

  return (
    <ScrollView style={[styles.container, theme.app.container]}>
      <Text style={[styles.title, theme.app.title]}>
        System Performance Monitor
      </Text>

      {/* Controls Section */}
      <View
        style={[
          styles.controlsContainer,
          theme.app.controlsContainer,
          styles.bordered,
        ]}
      >
        <Text style={[styles.sectionTitle, theme.app.sectionTitle]}>
          Controls
        </Text>

        {sysInfo && (
          <View
            style={[styles.accordionContainer, theme.app.controlsContainer]}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Toggle system info"
              onPress={() => setIsSysInfoOpen((v) => !v)}
              style={styles.accordionHeader}
            >
              <Text
                style={[
                  styles.controlLabel,
                  theme.app.controlLabel,
                  { fontWeight: '700' },
                ]}
              >
                System Info
              </Text>
              <Text style={[styles.controlLabel, theme.app.controlLabel]}>
                {isSysInfoOpen ? '▲' : '▼'}
              </Text>
            </Pressable>

            {isSysInfoOpen && (
              <View style={styles.accordionBody}>
                <Text style={[styles.controlLabel, theme.app.controlLabel]}>
                  App: {sysInfo.appName}
                </Text>
                <Text style={[styles.controlLabel, theme.app.controlLabel]}>
                  Package: {sysInfo.packageName}
                </Text>
                <Text style={[styles.controlLabel, theme.app.controlLabel]}>
                  Version: {sysInfo.versionName} ({sysInfo.versionCode})
                </Text>
                <Text style={[styles.controlLabel, theme.app.controlLabel]}>
                  Manufacturer: {sysInfo.manufacturer}
                </Text>
                <Text style={[styles.controlLabel, theme.app.controlLabel]}>
                  Model: {sysInfo.model}
                </Text>
                <Text style={[styles.controlLabel, theme.app.controlLabel]}>
                  Android: {sysInfo.osVersion} (SDK {sysInfo.sdkInt})
                </Text>
                <Text style={[styles.controlLabel, theme.app.controlLabel]}>
                  Device: {sysInfo.device} • Product: {sysInfo.product}
                </Text>
                <Text style={[styles.controlLabel, theme.app.controlLabel]}>
                  Hardware: {sysInfo.hardware}
                </Text>
                <Text style={[styles.controlLabel, theme.app.controlLabel]}>
                  Android ID: {sysInfo.androidId}
                </Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.controlRow}>
          <Text style={[styles.controlLabel, theme.app.controlLabel]}>
            Dark Theme :
          </Text>
          <Switch value={isDark} onValueChange={setIsDark} />
        </View>

        <View style={styles.controlRow}>
          <Text style={[styles.controlLabel, theme.app.controlLabel]}>
            Refresh Interval (ms):
          </Text>
          <TextInput
            style={[styles.input, theme.app.input]}
            value={refreshInterval.toString()}
            onChangeText={(text) =>
              setRefreshInterval(parseInt(text, 10) || 1000)
            }
            keyboardType="numeric"
          />
        </View>

        <View style={styles.controlRow}>
          <Text style={[styles.controlLabel, theme.app.controlLabel]}>
            Show CPU:
          </Text>
          <Switch value={showCPU} onValueChange={setShowCPU} />
        </View>

        <View style={styles.controlRow}>
          <Text style={[styles.controlLabel, theme.app.controlLabel]}>
            Show RAM:
          </Text>
          <Switch value={showRAM} onValueChange={setShowRAM} />
        </View>

        <View style={styles.controlRow}>
          <Text style={[styles.controlLabel, theme.app.controlLabel]}>
            Show Storage:
          </Text>
          <Switch value={showStorage} onValueChange={setShowStorage} />
        </View>

        <View style={styles.controlRow}>
          <Text style={[styles.controlLabel, theme.app.controlLabel]}>
            Show Battery:
          </Text>
          <Switch value={showBattery} onValueChange={setShowBattery} />
        </View>
      </View>

      {/* System Performance Widget */}
      <View style={styles.widgetSection}>
        <Text style={[styles.sectionTitle, theme.app.sectionTitle]}>
          System Performance Widget
        </Text>
        <SystemPerformanceWidget
          refreshInterval={refreshInterval}
          showCPU={showCPU}
          showRAM={showRAM}
          showStorage={showStorage}
          showBattery={showBattery}
          style={[styles.widget, theme.widget.container, styles.bordered]}
          componentStyle={[
            styles.individualComponent,
            theme.widget.component,
            styles.bordered,
          ]}
          labelStyle={[styles.componentLabel, theme.widget.label]}
          valueStyle={[styles.componentValue, theme.widget.value]}
        />
      </View>

      {/* Individual Components */}
      <View style={styles.componentsSection}>
        <Text style={[styles.sectionTitle, theme.app.sectionTitle]}>
          Individual Components
        </Text>

        {showCPU && (
          <CPUUsageComponent
            label="CPU Usage"
            refreshInterval={refreshInterval}
            style={[
              styles.individualComponent,
              theme.widget.component,
              styles.bordered,
            ]}
            labelStyle={[styles.componentLabel, theme.widget.label]}
            valueStyle={[styles.componentValue, theme.widget.value]}
          />
        )}

        {showRAM && (
          <RAMUsageComponent
            label="RAM Usage"
            refreshInterval={refreshInterval}
            style={[
              styles.individualComponent,
              theme.widget.component,
              styles.bordered,
            ]}
            labelStyle={[styles.componentLabel, theme.widget.label]}
            valueStyle={[styles.componentValue, theme.widget.value]}
          />
        )}

        {showStorage && (
          <StorageUsageComponent
            label="Storage Usage"
            refreshInterval={refreshInterval}
            style={[
              styles.individualComponent,
              theme.widget.component,
              styles.bordered,
            ]}
            labelStyle={[styles.componentLabel, theme.widget.label]}
            valueStyle={[styles.componentValue, theme.widget.value]}
          />
        )}

        {showBattery && (
          <BatteryUsageComponent
            label="Battery Level"
            refreshInterval={refreshInterval}
            style={[
              styles.individualComponent,
              theme.widget.component,
              styles.bordered,
            ]}
            labelStyle={[styles.componentLabel, theme.widget.label]}
            valueStyle={[styles.componentValue, theme.widget.value]}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#98a3cdff',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  controlsContainer: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  accordionContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    borderColor: '#ae0505ff',
    marginTop: 8,
    marginBottom: 12,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  accordionBody: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 4,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  controlLabel: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    width: 100,
    textAlign: 'center',
  },
  // dropdownButton: {
  //   borderWidth: 1,
  //   borderColor: '#ddd',
  //   borderRadius: 8,
  //   paddingVertical: 8,
  //   paddingHorizontal: 12,
  //   minWidth: 100,
  //   backgroundColor: '#fff',
  // },
  // dropdownMenu: {
  //   position: 'absolute',
  //   top: 42,
  //   right: 0,
  //   left: 0,
  //   backgroundColor: '#fff',
  //   borderWidth: 1,
  //   borderColor: '#ddd',
  //   borderRadius: 8,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 3,
  //   zIndex: 100,
  // },
  // dropdownItem: {
  //   paddingVertical: 10,
  //   paddingHorizontal: 12,
  // },
  widgetSection: {
    margin: 16,
  },
  widget: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  componentsSection: {
    margin: 16,
  },
  bordered: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  individualComponent: {
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  componentLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  componentValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});
