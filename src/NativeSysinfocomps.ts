import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  multiply(a: number, b: number): number;
  getCPUUsage(): Promise<number>;
  getRAMUsage(): Promise<number>;
  getStorageUsage(): Promise<number>;
  getBatteryUsage(): Promise<number>;
  getSystemInfo(): Promise<{
    manufacturer: string;
    brand: string;
    model: string;
    device: string;
    product: string;
    hardware: string;
    fingerprint: string;
    host: string;
    osVersion: string;
    sdkInt: number;
    androidId: string;
    appName: string;
    packageName: string;
    versionName: string;
    versionCode: number;
  }>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Sysinfocomps');
