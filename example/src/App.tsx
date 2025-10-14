import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Switch,
  TextInput,
} from 'react-native';
import {
  CPUUsageComponent,
  RAMUsageComponent,
  StorageUsageComponent,
  BatteryUsageComponent,
  SystemPerformanceWidget,
} from 'react-native-sysinfocomps';

export default function App() {
  const [refreshInterval, setRefreshInterval] = useState(1000);
  const [showCPU, setShowCPU] = useState(true);
  const [showRAM, setShowRAM] = useState(true);
  const [showStorage, setShowStorage] = useState(true);
  const [showBattery, setShowBattery] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>System Performance Monitor</Text>

      {/* Controls Section */}
      <View style={styles.controlsContainer}>
        <Text style={styles.sectionTitle}>Controls</Text>

        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Refresh Interval (ms):</Text>
          <TextInput
            style={styles.input}
            value={refreshInterval.toString()}
            onChangeText={(text) => setRefreshInterval(parseInt(text) || 1000)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Show CPU:</Text>
          <Switch value={showCPU} onValueChange={setShowCPU} />
        </View>

        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Show RAM:</Text>
          <Switch value={showRAM} onValueChange={setShowRAM} />
        </View>

        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Show Storage:</Text>
          <Switch value={showStorage} onValueChange={setShowStorage} />
        </View>

        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Show Battery:</Text>
          <Switch value={showBattery} onValueChange={setShowBattery} />
        </View>
      </View>

      {/* System Performance Widget */}
      <View style={styles.widgetSection}>
        <Text style={styles.sectionTitle}>System Performance Widget</Text>
        <SystemPerformanceWidget
          refreshInterval={refreshInterval}
          showCPU={showCPU}
          showRAM={showRAM}
          showStorage={showStorage}
          showBattery={showBattery}
          style={styles.widget}
        />
      </View>

      {/* Individual Components */}
      <View style={styles.componentsSection}>
        <Text style={styles.sectionTitle}>Individual Components</Text>

        {showCPU && (
          <CPUUsageComponent
            label="CPU Usage"
            refreshInterval={refreshInterval}
            style={styles.individualComponent}
            labelStyle={styles.componentLabel}
            valueStyle={styles.componentValue}
          />
        )}

        {showRAM && (
          <RAMUsageComponent
            label="RAM Usage"
            refreshInterval={refreshInterval}
            style={styles.individualComponent}
            labelStyle={styles.componentLabel}
            valueStyle={styles.componentValue}
          />
        )}

        {showStorage && (
          <StorageUsageComponent
            label="Storage Usage"
            refreshInterval={refreshInterval}
            style={styles.individualComponent}
            labelStyle={styles.componentLabel}
            valueStyle={styles.componentValue}
          />
        )}

        {showBattery && (
          <BatteryUsageComponent
            label="Battery Level"
            refreshInterval={refreshInterval}
            style={styles.individualComponent}
            labelStyle={styles.componentLabel}
            valueStyle={styles.componentValue}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03aaf2ff         ',
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
