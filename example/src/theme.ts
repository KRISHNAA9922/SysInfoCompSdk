import type { ViewStyle, TextStyle } from 'react-native';

export type ThemeColors = {
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  border: string;
};

const lightColors: ThemeColors = {
  background: '#F5F6FA',
  surface: '#FFFFFF',
  textPrimary: '#1F2937',
  textSecondary: '#4B5563',
  accent: '#007AFF',
  border: '#E5E7EB',
};

const darkColors: ThemeColors = {
  background: '#0B1220',
  surface: '#111827',
  textPrimary: '#F3F4F6',
  textSecondary: '#9CA3AF',
  accent: '#5EA0FF',
  border: '#374151',
};

type AppTheme = {
  colors: ThemeColors;
  app: {
    container: ViewStyle;
    title: TextStyle;
    sectionTitle: TextStyle;
    controlsContainer: ViewStyle;
    controlLabel: TextStyle;
    input: TextStyle;
    card: ViewStyle;
  };
  widget: {
    container: ViewStyle;
    component: ViewStyle;
    label: TextStyle;
    value: TextStyle;
  };
};

export function getAppTheme(isDark: boolean): AppTheme {
  const c = isDark ? darkColors : lightColors;

  return {
    colors: c,
    app: {
      container: {
        backgroundColor: c.background,
      },
      title: {
        color: c.textPrimary,
      },
      sectionTitle: {
        color: c.textPrimary,
      },
      controlsContainer: {
        backgroundColor: c.surface,
        borderColor: c.border,
      },
      controlLabel: {
        color: c.textPrimary,
      },
      input: {
        borderColor: c.border,
        color: c.textPrimary,
      },
      card: {
        backgroundColor: c.surface,
        borderColor: c.border,
      },
    },
    widget: {
      container: {
        backgroundColor: c.surface,
        borderColor: c.border,
      },
      component: {
        backgroundColor: c.surface,
        borderColor: c.border,
      },
      label: {
        color: c.textSecondary,
      },
      value: {
        color: c.accent,
      },
    },
  };
}


