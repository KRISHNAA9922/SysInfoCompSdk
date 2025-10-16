import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ProgressBarProps = {
  value: number; // 0-100
  size?: number | string; // width for linear bar (e.g., 120 or '100%')
  strokeWidth?: number; // ring thickness
  trackColor?: string; // ring background
  tintColor?: string; // progress color
  textColor?: string; // center text color
  showText?: boolean;
  decimals?: number; // number of decimal places to show in text
};

const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

// Pure-View donut progress using the two half-arc technique (no external deps)
const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  size = 120,
  strokeWidth = 12,
  trackColor = '#E6F4FA',
  tintColor = '#12B5EA',
  textColor = '#0EA5E9',
  showText = true,
  decimals = 0,
}) => {
  const progress = clamp(value, 0, 100);
  const barHeight = strokeWidth; // keep prop name, use as thickness for linear bar

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ now: progress, min: 0, max: 100 }}
      style={{ width: size }}
    >
      <View
        style={[
          styles.track,
          {
            height: barHeight,
            backgroundColor: trackColor,
            borderRadius: barHeight / 2,
          },
        ]}
      >
        <View
          style={[
            styles.fill,
            {
              width: `${progress}%`,
              height: barHeight,
              backgroundColor: tintColor,
              borderRadius: barHeight / 2,
            },
          ]}
        />
      </View>
      {showText && (
        <Text style={[styles.valueText, { color: textColor, marginTop: 8 }]}>{progress.toFixed(decimals)}%</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: '100%',
  },
  fill: {
    width: '0%',
  },
  valueText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    width: '100%',
  },
});

export default ProgressBar;
