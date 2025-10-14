import Sysinfocomps from './NativeSysinfocomps';

// Export native modules
export { default as SystemInfo } from './NativeSystemInfo';

// Export individual components
export { default as CPUUsageComponent } from './component/ui/CPUUsageComponent';
export { default as RAMUsageComponent } from './component/ui/RAMUsageComponent';
export { default as StorageUsageComponent } from './component/ui/StorageUsageComponent';
export { default as BatteryUsageComponent } from './component/ui/BatteryUsageComponent';

// Export widget component
export { default as SystemPerformanceWidget } from './component/SystemPerformanceWidget';

// Export utility function
export function multiply(a: number, b: number): number {
  return Sysinfocomps.multiply(a, b);
}
