/  

```json
{
  "API Version": "0.0.0.1"
}
```


/info
```json
{
  "devices": [
    {
      "Android Version": "13",
      "Build Number": "TQ3A.230805.001.S1",
      "Manufacturer": "Google",
      "Model": "Pixel 4a",
      "Serial": "28271JEC200003"
    }
    {
      "Android Version": "12",
      "Build Number": "TQ3A.230805.7801.S1",
      "Manufacturer": "Google",
      "Model": "Pixel 5a",
      "Serial": "28271AEC200003"
    }
  ]
}
```
/info/<serial_number>
```json
{
"Android Version": "13",
"Board": "sunfish",
"Bootloader": "s5-0.5-10252351",
"Build Number": "TQ3A.230805.001.S1",
"CPU ABI": "arm64-v8a",
"Hardware": "sunfish",
"Manufacturer": "Google",
"Model": "Pixel 4a",
"SDK Version": "33",
"Screen Resolution": "440",
"Serial": "28271JEC200003"
}
```

/apps
```json
{
  "devices": {
    "28271JEC200003": {
      "Installed Apps": [
        "com.google.audio.hearing.visualization",
        "com.android.systemui.auto_generated_rro_vendor__",
        "com.google.android.providers.media.module"
      ]
    }
    "75271JEC209803": {
      "Installed Apps": [
        "com.google.audio.hearing.visualization",
        "com.android.systemui.auto_generated_rro_vendor__",
        "com.google.android.providers.media.module"
      ]
    }  
  }
}
```
/apps/<serial_number>
```json
{
  "apps": [
    "com.google.audio.hearing.visualization.accessibility.scribe",
    "com.android.systemui.auto_generated_rro_vendor__",
    "com.google.android.providers.media.module",
  ]
}
```
<!-- /start_scrcpy
```json
A new window will open
``` -->
<!-- /adb/<serial_number>
```json

``` -->
/reboot/<serial_number>
```json
Device with serial number {serial_number} rebooted successfully
```
/reboot_recovery/<serial_number>
```json
Device with serial number {serial_number} rebooted into recovery mode successfully
```
/install_apk/<serial_number>
```json
APK installed successfully on device {serial_number}
```
/uninstall_apk/<serial_number>
```json
APK uninstalled successfully from device {serial_number}
```
/uninstall_apks/<serial_number>
```json
All APKs uninstalled successfully from device {serial_number}
```


