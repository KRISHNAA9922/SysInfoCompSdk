import React, { useEffect, useRef, useState } from 'react';
import { Text, View, type ViewStyle, type TextStyle } from 'react-native';
import SystemInfo from '../../NativeSystemInfo';

type RAMUsageProps = {
  label?: string;
  refreshInterval?: number; // ms
  style?: ViewStyle;
  labelStyle?: TextStyle;
  valueStyle?: TextStyle;
};

const RAMUsageComponent: React.FC<RAMUsageProps> = ({
  label = 'RAM Usage',
  refreshInterval = 1000,
  style,
  labelStyle,
  valueStyle,
}) => {
  const [ram, setRam] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMounted = useRef(true);

  const tick = async () => {
    try {
      const value = await SystemInfo.getRAMUsage();

      if (isMounted.current) {
        setRam(value);
        setError(null);
      }
    } catch (err) {
      if (isMounted.current) {
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
    <View style={style}>
      <Text style={labelStyle}>{label}</Text>
      {ram !== null ? (
        <Text style={valueStyle}>{ram.toFixed(2)}%</Text>
      ) : error ? (
        <Text style={valueStyle}>Error: {error}</Text>
      ) : (
        <Text style={valueStyle}>Loading...</Text>
      )}
    </View>
  );
};

export default RAMUsageComponent;
