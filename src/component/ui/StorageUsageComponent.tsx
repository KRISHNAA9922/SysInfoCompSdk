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

type StorageUsageProps = {
  label?: string;
  refreshInterval?: number; // ms
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  compact?: boolean;
};

const StorageUsageComponent: React.FC<StorageUsageProps> = ({
  label = 'Storage Usage',
  refreshInterval = 1000,
  style,
  labelStyle,
  valueStyle,
  compact = false,
}) => {
  const [storage, setStorage] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMounted = useRef(true);

  const tick = async () => {
    try {
      const value = await SystemInfo.getStorageUsage();

      if (isMounted.current) {
        if (__DEV__) console.log('[SysInfo][Storage]', value);
        setStorage(value);
        setError(null);
      }
    } catch (err) {
      if (isMounted.current) {
        if (__DEV__) console.warn('[SysInfo][Storage][Error]', err);
        setStorage(null);
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
      accessibilityHint="Shows current storage usage percentage"
    >
      <Text style={labelStyle}>{label}</Text>
      {storage !== null ? (
        <>
          <ProgressBar
            value={storage}
            size={compact ? 100 : '100%'}
            strokeWidth={12}
            trackColor="#E6F4FA"
            tintColor={
              storage < 70 ? '#10B981' : storage < 90 ? '#F59E0B' : '#EF4444'
            }
            textColor={
              storage < 70 ? '#10B981' : storage < 90 ? '#F59E0B' : '#EF4444'
            }
          />
        </>
      ) : error ? (
        <Text style={valueStyle}>Error: {error}</Text>
      ) : Platform.OS === 'ios' ? (
        <ActivityIndicator accessibilityLabel="Loading storage usage" />
      ) : (
        <Text style={valueStyle}>Loading...</Text>
      )}
    </View>
  );
};

export default StorageUsageComponent;
