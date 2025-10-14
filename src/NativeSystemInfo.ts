import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getCPUUsage(): Promise<number>;
  getRAMUsage(): Promise<number>;
  getStorageUsage(): Promise<number>;
  getBatteryUsage(): Promise<number>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Sysinfocomps');
