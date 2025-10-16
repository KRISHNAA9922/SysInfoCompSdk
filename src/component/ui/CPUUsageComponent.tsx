import React, { useEffect, useRef, useState } from 'react';
import { Text, View, ActivityIndicator, Platform, type ViewStyle, type TextStyle, type StyleProp } from 'react-native';
import ProgressBar from './ProgressBar';
import SystemInfo from '../../NativeSysinfocomps';

type CPUUsageProps = {
  label?: string;
  refreshInterval?: number; // ms
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  compact?: boolean; // when true, use compact progress width for grid
};

const CPUUsageComponent: React.FC<CPUUsageProps> = ({
  label = 'CPU Usage',
  refreshInterval = 1000,
  style,
  labelStyle,
  valueStyle,
  compact = false,
}) => {
  const [cpu, setCpu] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMounted = useRef(true);

  const tick = async () => {
    try {
      // getCPUUsage() now returns a Promise
      const value = await SystemInfo.getCPUUsage();

      if (isMounted.current) {
        if (__DEV__) console.log('[SysInfo][CPU]', value);
        setCpu(value);
        setError(null);
      }
    } catch (err) {
      if (isMounted.current) {
        if (__DEV__) console.warn('[SysInfo][CPU][Error]', err);
        setCpu(null);
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    }
  };

  useEffect(() => {
    isMounted.current = true;

    tick(); // Initial call
    timer.current = setInterval(tick, refreshInterval);

    return () => {
      isMounted.current = false;
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [refreshInterval]);

  return (
    <View
      style={style}
      accessible
      accessibilityRole="summary"
      accessibilityLabel={label}
      accessibilityHint="Shows current CPU usage percentage"
    >
      <Text style={labelStyle}>{label}</Text>
      {cpu !== null ? (
        <>
          <ProgressBar
            value={cpu}
            size={compact ? 100 : '100%'}
            strokeWidth={12}
            trackColor="#E6F4FA"
            tintColor={cpu < 60 ? '#10B981' : cpu < 85 ? '#F59E0B' : '#EF4444'}
            textColor={cpu < 60 ? '#10B981' : cpu < 85 ? '#F59E0B' : '#EF4444'}
          />
        </>
      ) : error ? (
        <Text style={valueStyle}>Error: {error}</Text>
      ) : (
        Platform.OS === 'ios' ? (
          <ActivityIndicator accessibilityLabel="Loading CPU usage" />
        ) : (
          <Text style={valueStyle}>Loading...</Text>
        )
      )}
    </View>
  );
};

export default CPUUsageComponent;
