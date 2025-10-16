/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, ActivityIndicator, Platform, type ViewStyle, type TextStyle, type StyleProp } from 'react-native';
import ProgressBar from './ProgressBar';
import SystemInfo from '../../NativeSysinfocomps';

type BatteryUsageProps = {
  label?: string;
  refreshInterval?: number; // ms
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  compact?: boolean;
};

const BatteryUsageComponent: React.FC<BatteryUsageProps> = ({
  label = 'Battery Level',
  refreshInterval = 1000,
  style,
  labelStyle,
  valueStyle,
  compact = false,
}) => {
  const [battery, setBattery] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMounted = useRef(true);

  const tick = async () => {
    try {
      const value = await SystemInfo.getBatteryUsage();

      if (isMounted.current) {
        if (__DEV__) console.log('[SysInfo][Battery]', value);
        setBattery(value);
        setError(null);
      }
    } catch (err) {
      if (isMounted.current) {
        if (__DEV__) console.warn('[SysInfo][Battery][Error]', err);
        setBattery(null);
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
      accessibilityHint="Shows current battery level percentage"
    >
      <Text style={labelStyle}>{label}</Text>
      {battery !== null ? (
        <>
          <ProgressBar
            value={battery}
            size={compact ? 100 : '100%'}
            strokeWidth={12}
            trackColor="#E6F4FA"
            tintColor={battery > 60 ? '#10B981' : battery > 25 ? '#F59E0B' : '#EF4444'}
            textColor={battery > 60 ? '#10B981' : battery > 25 ? '#F59E0B' : '#EF4444'}
            decimals={1}
          />
        </>
      ) : error ? (
        <Text style={valueStyle}>Error: {error}</Text>
      ) : (
        Platform.OS === 'ios' ? (
          <ActivityIndicator accessibilityLabel="Loading battery level" />
        ) : (
          <Text style={valueStyle}>Loading...</Text>
        )
      )}
    </View>
  );
};

export default BatteryUsageComponent;
