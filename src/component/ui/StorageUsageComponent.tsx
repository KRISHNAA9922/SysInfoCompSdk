import React, { useEffect, useRef, useState } from 'react';
import { Text, View, type ViewStyle, type TextStyle } from 'react-native';
import SystemInfo from '../../NativeSystemInfo';

type StorageUsageProps = {
  label?: string;
  refreshInterval?: number; // ms
  style?: ViewStyle;
  labelStyle?: TextStyle;
  valueStyle?: TextStyle;
};

const StorageUsageComponent: React.FC<StorageUsageProps> = ({
  label = 'Storage Usage',
  refreshInterval = 1000,
  style,
  labelStyle,
  valueStyle,
}) => {
  const [storage, setStorage] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMounted = useRef(true);

  const tick = async () => {
    try {
      const value = await SystemInfo.getStorageUsage();

      if (isMounted.current) {
        setStorage(value);
        setError(null);
      }
    } catch (err) {
      if (isMounted.current) {
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
    <View style={style}>
      <Text style={labelStyle}>{label}</Text>
      {storage !== null ? (
        <Text style={valueStyle}>{storage.toFixed(2)}%</Text>
      ) : error ? (
        <Text style={valueStyle}>Error: {error}</Text>
      ) : (
        <Text style={valueStyle}>Loading...</Text>
      )}
    </View>
  );
};

export default StorageUsageComponent;
