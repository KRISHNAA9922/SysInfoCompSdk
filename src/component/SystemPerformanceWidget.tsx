import React from 'react';
import { View, StyleSheet, useColorScheme, PlatformColor, Platform, type ViewStyle, type TextStyle, type StyleProp } from 'react-native';
import CPUUsageComponent from './ui/CPUUsageComponent';
import RAMUsageComponent from './ui/RAMUsageComponent';
import StorageUsageComponent from './ui/StorageUsageComponent';
import BatteryUsageComponent from './ui/BatteryUsageComponent';

type SystemPerformanceWidgetProps = {
  refreshInterval?: number; // ms
  style?: StyleProp<ViewStyle>;
  showCPU?: boolean;
  showRAM?: boolean;
  showStorage?: boolean;
  showBattery?: boolean;
  componentStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
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
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const themed = {
    containerBg:
      Platform.OS === 'ios'
        ? PlatformColor(isDark ? 'systemGray6' : 'systemGroupedBackground')
        : isDark
        ? '#111827'
        : '#FFFFFF',
    cardBg:
      Platform.OS === 'ios'
        ? PlatformColor(isDark ? 'systemGray5' : 'systemBackground')
        : isDark
        ? '#111827'
        : '#FFFFFF',
    labelColor:
      Platform.OS === 'ios' ? PlatformColor('label') : isDark ? '#F3F4F6' : '#1F2937',
    valueColor:
      Platform.OS === 'ios' ? PlatformColor('systemBlue') : isDark ? '#5EA0FF' : '#007AFF',
    separator:
      Platform.OS === 'ios' ? PlatformColor('separator') : isDark ? '#374151' : '#E5E7EB',
  } as const;

  const defaultComponentStyle = {
    ...styles.component,
    backgroundColor: themed.cardBg,
    borderColor: themed.separator,
    ...componentStyle,
  };

  const defaultLabelStyle = {
    ...styles.label,
    color: themed.labelColor,
    ...labelStyle,
  };

  const defaultValueStyle = {
    ...styles.value,
    color: themed.valueColor,
    ...valueStyle,
  };

  // Collect visible components to ensure proper 2x2 arrangement
  const components = [
    showCPU && (
      <CPUUsageComponent
        key="cpu"
        refreshInterval={refreshInterval}
        style={defaultComponentStyle}
        labelStyle={defaultLabelStyle}
        valueStyle={defaultValueStyle}
        compact
      />
    ),
    showRAM && (
      <RAMUsageComponent
        key="ram"
        refreshInterval={refreshInterval}
        style={defaultComponentStyle}
        labelStyle={defaultLabelStyle}
        valueStyle={defaultValueStyle}
        compact
      />
    ),
    showStorage && (
      <StorageUsageComponent
        key="storage"
        refreshInterval={refreshInterval}
        style={defaultComponentStyle}
        labelStyle={defaultLabelStyle}
        valueStyle={defaultValueStyle}
        compact
      />
    ),
    showBattery && (
      <BatteryUsageComponent
        key="battery"
        refreshInterval={refreshInterval}
        style={defaultComponentStyle}
        labelStyle={defaultLabelStyle}
        valueStyle={defaultValueStyle}
        compact
      />
    ),
  ].filter(Boolean);

  return (
    <View
      accessibilityRole="summary"
      accessibilityLabel="System performance overview"
      style={[styles.container, { backgroundColor: themed.containerBg, borderColor: themed.separator }, style]}
    >
      <View style={styles.gridContainer}>
        {components.map((component, index) => (
          <View key={index} style={styles.gridItem}>
            {component}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  gridItem: {
    width: '48%',
    //aspectRatio: 1.2,
    minHeight: 40,
    //marginBottom: 12,
  },
  component: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 12,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
  },
});

export default SystemPerformanceWidget;
