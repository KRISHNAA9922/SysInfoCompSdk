import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import CPUUsageComponent from './ui/CPUUsageComponent';
import RAMUsageComponent from './ui/RAMUsageComponent';
import StorageUsageComponent from './ui/StorageUsageComponent';
import BatteryUsageComponent from './ui/BatteryUsageComponent';

type SystemPerformanceWidgetProps = {
  refreshInterval?: number; // ms
  style?: ViewStyle;
  showCPU?: boolean;
  showRAM?: boolean;
  showStorage?: boolean;
  showBattery?: boolean;
  componentStyle?: ViewStyle;
  labelStyle?: any;
  valueStyle?: any;
};

const SystemPerformanceWidget: React.FC<SystemPerformanceWidgetProps> = ({
  refreshInterval = 1000,
  style,
  showCPU = true,
  showRAM = true,
  showStorage = true,
  showBattery = true,
  componentStyle,
  labelStyle,
  valueStyle,
}) => {
  const defaultComponentStyle = {
    ...styles.component,
    ...componentStyle,
  };

  const defaultLabelStyle = {
    ...styles.label,
    ...labelStyle,
  };

  const defaultValueStyle = {
    ...styles.value,
    ...valueStyle,
  };

  return (
    <View style={[styles.container, style]}>
      {showCPU && (
        <CPUUsageComponent
          refreshInterval={refreshInterval}
          style={defaultComponentStyle}
          labelStyle={defaultLabelStyle}
          valueStyle={defaultValueStyle}
        />
      )}
      {showRAM && (
        <RAMUsageComponent
          refreshInterval={refreshInterval}
          style={defaultComponentStyle}
          labelStyle={defaultLabelStyle}
          valueStyle={defaultValueStyle}
        />
      )}
      {showStorage && (
        <StorageUsageComponent
          refreshInterval={refreshInterval}
          style={defaultComponentStyle}
          labelStyle={defaultLabelStyle}
          valueStyle={defaultValueStyle}
        />
      )}
      {showBattery && (
        <BatteryUsageComponent
          refreshInterval={refreshInterval}
          style={defaultComponentStyle}
          labelStyle={defaultLabelStyle}
          valueStyle={defaultValueStyle}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    margin: 8,
  },
  component: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});

export default SystemPerformanceWidget;
