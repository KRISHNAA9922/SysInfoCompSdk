import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Platform,
  type ViewStyle,
  type TextStyle,
  type StyleProp,
} from 'react-native';
import ProgressBar from './ProgressBar';
import SystemInfo from '../../NativeSysinfocomps';

type RAMUsageProps = {
  label?: string;
  refreshInterval?: number; // ms
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  compact?: boolean;
};

const RAMUsageComponent: React.FC<RAMUsageProps> = ({
  label = 'RAM Usage',
  refreshInterval = 1000,
  style,
  labelStyle,
  valueStyle,
  compact = false,
}) => {
  const [ram, setRam] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMounted = useRef(true);

  const tick = async () => {
    try {
      const value = await SystemInfo.getRAMUsage();

      if (isMounted.current) {
        if (__DEV__) console.log('[SysInfo][RAM]', value);
        setRam(value);
        setError(null);
      }
    } catch (err) {
      if (isMounted.current) {
        if (__DEV__) console.warn('[SysInfo][RAM][Error]', err);
        setRam(null);
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
      accessibilityHint="Shows current RAM usage percentage"
    >
      <Text style={labelStyle}>{label}</Text>
      {ram !== null ? (
        <>
          <ProgressBar
            value={ram}
            size={compact ? 100 : '100%'}
            strokeWidth={12}
            trackColor="#E6F4FA"
            tintColor={ram < 60 ? '#10B981' : ram < 85 ? '#F59E0B' : '#EF4444'}
            textColor={ram < 60 ? '#10B981' : ram < 85 ? '#F59E0B' : '#EF4444'}
            showText={false}
          />
          <Text style={[valueStyle, { textAlign: 'center', marginTop: 8 }]}>
            {ram.toFixed(2)}
          </Text>
        </>
      ) : error ? (
        <Text style={valueStyle}>Error: {error}</Text>
      ) : Platform.OS === 'ios' ? (
        <ActivityIndicator accessibilityLabel="Loading RAM usage" />
      ) : (
        <Text style={valueStyle}>Loading...</Text>
      )}
    </View>
  );
};

export default RAMUsageComponent;
