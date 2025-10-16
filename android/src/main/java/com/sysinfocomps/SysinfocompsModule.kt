package com.sysinfocomps

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.module.annotations.ReactModule
import kotlinx.coroutines.*
import java.io.BufferedReader
import java.io.FileReader
import android.os.StatFs
import android.content.Context
import android.os.BatteryManager
import android.os.Build
import android.provider.Settings
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap

@ReactModule(name = SysinfocompsModule.NAME)
class SysinfocompsModule(reactContext: ReactApplicationContext) :
  NativeSysinfocompsSpec(reactContext) {

  private val scope = CoroutineScope(Dispatchers.IO + SupervisorJob())
  private val context = reactContext

  override fun getName(): String {
    return NAME
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  @ReactMethod
  override fun getCPUUsage(promise: Promise) {
    scope.launch {
      try {
        val usage = calculateCPUUsage()
        promise.resolve(usage)
      } catch (e: Exception) {
        promise.reject("CPU_ERROR", "Failed to get CPU usage: ${e.message}", e)
      }
    }
  }

  @ReactMethod
  override fun getRAMUsage(promise: Promise) {
    scope.launch {
      try {
        val usage = calculateRAMUsage()
        promise.resolve(usage)
      } catch (e: Exception) {
        promise.reject("RAM_ERROR", "Failed to get RAM usage: ${e.message}", e)
      }
    }
  }

  @ReactMethod
  override fun getStorageUsage(promise: Promise) {
    scope.launch {
      try {
        val usage = calculateStorageUsage()
        promise.resolve(usage)
      } catch (e: Exception) {
        promise.reject("STORAGE_ERROR", "Failed to get storage usage: ${e.message}", e)
      }
    }
  }

  @ReactMethod
  override fun getBatteryUsage(promise: Promise) {
    scope.launch {
      try {
        val usage = calculateBatteryUsage()
        promise.resolve(usage)
      } catch (e: Exception) {
        promise.reject("BATTERY_ERROR", "Failed to get battery usage: ${e.message}", e)
      }
    }
  }

  @ReactMethod
  override fun getSystemInfo(promise: Promise) {
    scope.launch {
      try {
        val pm = context.packageManager
        val packageName = context.packageName
        val packageInfo = pm.getPackageInfo(packageName, 0)

        val map: WritableMap = Arguments.createMap()
        map.putString("manufacturer", Build.MANUFACTURER)
        map.putString("brand", Build.BRAND)
        map.putString("model", Build.MODEL)
        map.putString("device", Build.DEVICE)
        map.putString("product", Build.PRODUCT)
        map.putString("hardware", Build.HARDWARE)
        map.putString("fingerprint", Build.FINGERPRINT)
        map.putString("host", Build.HOST)
        map.putString("osVersion", Build.VERSION.RELEASE ?: "")
        map.putInt("sdkInt", Build.VERSION.SDK_INT)
        val androidId = Settings.Secure.getString(context.contentResolver, Settings.Secure.ANDROID_ID)
        map.putString("androidId", androidId ?: "")
        val appName = pm.getApplicationLabel(pm.getApplicationInfo(packageName, 0)).toString()
        map.putString("appName", appName)
        map.putString("packageName", packageName)
        map.putString("versionName", packageInfo.versionName ?: "")
        val versionCode = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) packageInfo.longVersionCode.toDouble() else packageInfo.versionCode.toDouble()
        map.putDouble("versionCode", versionCode)

        promise.resolve(map)
      } catch (e: Exception) {
        promise.reject("SYSINFO_ERROR", "Failed to get system info: ${e.message}", e)
      }
    }
  }

  // CPU Usage calculation (from existing CPUUsageModule)
  private suspend fun calculateCPUUsage(): Double {
    val snapshot1 = readCpuStat() ?: return -1.0
    
    // Delay for accurate readings (360ms recommended)
    delay(360)
    
    val snapshot2 = readCpuStat() ?: return -1.0

    // Calculate idle time (idle + iowait)
    val idle1 = snapshot1.idle + snapshot1.iowait
    val idle2 = snapshot2.idle + snapshot2.iowait

    // Calculate non-idle time
    val nonIdle1 = snapshot1.user + snapshot1.nice + snapshot1.system + 
                   snapshot1.irq + snapshot1.softirq + snapshot1.steal
    val nonIdle2 = snapshot2.user + snapshot2.nice + snapshot2.system + 
                   snapshot2.irq + snapshot2.softirq + snapshot2.steal

    // Calculate total time
    val total1 = idle1 + nonIdle1
    val total2 = idle2 + nonIdle2

    // Calculate deltas
    val totalDelta = total2 - total1
    val idleDelta = idle2 - idle1

    // Prevent division by zero
    if (totalDelta <= 0) return 0.0

    // Return CPU usage percentage
    return ((totalDelta - idleDelta).toDouble() / totalDelta.toDouble()) * 100.0
  }

  // RAM Usage calculation
  private suspend fun calculateRAMUsage(): Double {
    return try {
      val runtime = Runtime.getRuntime()
      val maxMemory = runtime.maxMemory()
      val totalMemory = runtime.totalMemory()
      val freeMemory = runtime.freeMemory()
      val usedMemory = totalMemory - freeMemory
      
      (usedMemory.toDouble() / maxMemory.toDouble()) * 100.0
    } catch (e: Exception) {
      -1.0
    }
  }

  // Storage Usage calculation
  private suspend fun calculateStorageUsage(): Double {
    return try {
      val stat = StatFs(context.filesDir.absolutePath)
      val blockSize = stat.blockSizeLong
      val totalBlocks = stat.blockCountLong
      val availableBlocks = stat.availableBlocksLong
      val usedBlocks = totalBlocks - availableBlocks
      
      (usedBlocks.toDouble() / totalBlocks.toDouble()) * 100.0
    } catch (e: Exception) {
      -1.0
    }
  }

  // Battery Usage calculation
  private suspend fun calculateBatteryUsage(): Double {
    return try {
      val batteryManager = context.getSystemService(Context.BATTERY_SERVICE) as BatteryManager
      val batteryLevel = batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
      batteryLevel.toDouble()
    } catch (e: Exception) {
      -1.0
    }
  }

  private data class CpuSnapshot(
    val user: Long,
    val nice: Long,
    val system: Long,
    val idle: Long,
    val iowait: Long,
    val irq: Long,
    val softirq: Long,
    val steal: Long
  )

  private fun readCpuStat(): CpuSnapshot? {
    return try {
      BufferedReader(FileReader("/proc/stat")).use { reader ->
        val line = reader.readLine() ?: return null
        
        // First line should start with "cpu "
        if (!line.startsWith("cpu ")) return null
        
        val parts = line.trim().split(Regex("\\s+"))
        
        // Ensure we have enough fields
        if (parts.size < 8) return null
        
        CpuSnapshot(
          user = parts[1].toLongOrNull() ?: 0L,
          nice = parts[2].toLongOrNull() ?: 0L,
          system = parts[3].toLongOrNull() ?: 0L,
          idle = parts[4].toLongOrNull() ?: 0L,
          iowait = parts.getOrNull(5)?.toLongOrNull() ?: 0L,
          irq = parts.getOrNull(6)?.toLongOrNull() ?: 0L,
          softirq = parts.getOrNull(7)?.toLongOrNull() ?: 0L,
          steal = parts.getOrNull(8)?.toLongOrNull() ?: 0L
        )
      }
    } catch (e: Exception) {
      null
    }
  }

  override fun onCatalystInstanceDestroy() {
    super.onCatalystInstanceDestroy()
    scope.cancel()
  }

  companion object {
    const val NAME = "Sysinfocomps"
  }
}
