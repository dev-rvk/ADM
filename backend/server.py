from flask import Flask, jsonify, request, render_template
from ppadb.client import Client as AdbClient
import subprocess
import time
import os
from flask_cors import CORS
# from PIL import Image

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # Allow requests from http://localhost:3000
  # Enable CORS for all routes

def get_device_info(device):
    # Retrieve device properties
    device_properties = device.get_properties()

    # Extract relevant information
    device_info = {
        "Serial": device.serial,
        "Model": device_properties.get("ro.product.model", "N/A"),
        "Manufacturer": device_properties.get("ro.product.manufacturer", "N/A"),
        "Android Version": device_properties.get("ro.build.version.release", "N/A"),
        "Build Number": device_properties.get("ro.build.display.id", "N/A")
    }

    return device_info

def get_device_info_detailed(device):
    # Retrieve device properties
    device_properties = device.get_properties()

    # Retrieve battery information
    # battery_info = device.shell(["dumpsys", "battery"])

    # Extract relevant information
    device_info = {
        "Serial": device.serial,
        "Model": device_properties.get("ro.product.model", "N/A"),
        "Manufacturer": device_properties.get("ro.product.manufacturer", "N/A"),
        "Android Version": device_properties.get("ro.build.version.release", "N/A"),
        "Build Number": device_properties.get("ro.build.display.id", "N/A"),
        "SDK Version": device_properties.get("ro.build.version.sdk", "N/A"),
        "Hardware": device_properties.get("ro.hardware", "N/A"),
        "Board": device_properties.get("ro.product.board", "N/A"),
        "Bootloader": device_properties.get("ro.bootloader", "N/A"),
        "CPU ABI": device_properties.get("ro.product.cpu.abi", "N/A"),
        "Screen Resolution": device_properties.get("ro.sf.lcd_density", "N/A"),
        # "IMEI": device_properties.get("persist.radio.imei", "N/A"),
        # "SIM Serial Number": device_properties.get("gsm.sim.serial", "N/A"),
        # "Battery Percentage": battery_info.splitlines()[1].split(":")[1].strip() if battery_info else "N/A"
        # Add more properties as needed
    }

    return device_info

def get_connected_devices_info():
    # Connect to the ADB server
    client = AdbClient(host="127.0.0.1", port=5037)

    # Get the list of connected devices
    devices = client.devices()

    device_info_list = []
    if devices:
        for device in devices:
            device_info = get_device_info(device)
            device_info_list.append(device_info)

    return device_info_list

def get_installed_apps(device):
    # Execute the pm list packages command
    result = device.shell("pm list packages")

    # Extract package names
    packages = result.splitlines()

    # Extract app names from package names
    apps = [package.split(":")[-1] for package in packages]

    return apps

def start_scrcpy(serial_number):
    # Start scrcpy for the specified device
    subprocess.Popen(['scrcpy', '-s', serial_number])
    return jsonify({"status": "Connection Established"})

def stop_scrcpy(serial_number):
    # Stop scrcpy for the specified device
    subprocess.Popen(['pkill', '-f', f'scrcpy -s {serial_number}'])
    return jsonify({"status": "Connection Terminated"})

def get_device(serial):
    devices = adb.devices()
    for device in devices:
        if device.serial == serial:
            return device
    return None

def reboot_recovery(device):
    # Reboot the device into recovery mode by sending the 'reboot recovery' command through ADB
    device.shell('reboot recovery')

def capture_screenshot(device, filename):
    # Capture screenshot using scrcpy
    device.screencap().save(filename)

def get_apk_package_name(apk_filepath):
    # Extract package name from the APK file
    output = os.popen(f"aapt dump badging {apk_filepath} | grep package:\ name").read()
    package_name = output.split("'")[1]
    return package_name


@app.route('/')
def home():
    return jsonify({"API Version": "0.0.0.1"})

@app.route('/info', methods=['GET'])
def device_info():
    devices_info = get_connected_devices_info()
    return jsonify({"devices": devices_info})

@app.route('/info_detailed/<serial_number>', methods=['GET'])
def device_info_detailed(serial_number):
    # Connect to ADB server
    client = AdbClient(host="127.0.0.1", port=5037)
   
    # Get device by serial number
    device = client.device(serial_number)
    # Check if device is connected
    if device:
        # Retrieve detailed information about the device
        device_info = get_device_info_detailed(device)
        return jsonify(device_info)
    else:
        return jsonify({"error": "Device not found or not connected."})

# General
@app.route('/apps')
def installed_apps():
    # Connect to the ADB server
    client = AdbClient(host="127.0.0.1", port=5037)

    # Get the list of connected devices
    devices = client.devices()

    apps_by_device = {}

    if devices:
        for device in devices:
            device_info = get_device_info(device)
            apps = get_installed_apps(device)
            apps_by_device[device_info["Serial"]] = {
                "Manufacturer": device_info["Manufacturer"],
                "Model": device_info["Model"],
                "Installed Apps": apps
            }

    return jsonify({"devices": apps_by_device})

@app.route('/apps/<serial_number>')
def apps_for_device(serial_number):
    # Connect to the ADB server
    client = AdbClient(host="127.0.0.1", port=5037)

    # Get the list of connected devices
    devices = client.devices()

    if devices:
        for device in devices:
            if device.serial == serial_number:
                apps = get_installed_apps(device)
                return jsonify({"apps": apps})

    return jsonify({"error": "Device not found or not connected."})

# General
@app.route('/start_scrcpy', methods=['GET', 'POST'])
def start_scrcpy_form():
    if request.method == 'POST':
        serial_number = request.form['serial_number']
        start_scrcpy(serial_number)
        return jsonify({"status": "Connection Established for device with serial number: " + serial_number})
    return render_template('start_scrcpy.html')

@app.route('/start_scrcpy/<serial_number>')
def start_scrcpy_for_device(serial_number):
    # Start scrcpy for the specified device
    start_scrcpy(serial_number)
    return jsonify({"status": "Connection Established"})

@app.route('/stop_scrcpy/<serial_number>')
def stop_scrcpy_for_device(serial_number):
    # Stop scrcpy for the specified device
    stop_scrcpy(serial_number)
    return jsonify({"status": "Connection Terminated"})



@app.route('/reboot/<serial_number>')
def reboot_devices(serial_number):
    try:
        # Connect to the ADB server
        client = AdbClient(host="127.0.0.1", port=5037)

        # Get the list of connected devices
        devices = client.devices()

        # Find the device with the given serial number
        device = next((d for d in devices if d.serial == serial_number), None)

        if device:
            # Reboot the device
            device.reboot()

            # Return success message
            return jsonify({'message': f'Device with serial number {serial_number} rebooted successfully'})
        else:
            # Return error message if device not found
            return jsonify({'error': f'Device with serial number {serial_number} not found'}), 404
    except Exception as e:
        # Return error message if something goes wrong
        return jsonify({'error': str(e)}), 500
    
@app.route('/reboot_recovery/<serial_number>')
def reboot_recovery_devices(serial_number):
    try:
        # Connect to the ADB server
        client = AdbClient(host="127.0.0.1", port=5037)

        # Get the list of connected devices
        devices = client.devices()

        # Find the device with the given serial number
        device = next((d for d in devices if d.serial == serial_number), None)

        if device:
           # Reboot the device into recovery mode
            reboot_recovery(device)

            # Return success message
            return jsonify({'message': f'Device with serial number {serial_number} rebooted into recovery mode successfully'})
        else:
            # Return error message if device not found
            return jsonify({'error': f'Device with serial number {serial_number} not found'}), 404
    except Exception as e:
        # Return error message if something goes wrong
        return jsonify({'error': str(e)}), 500

@app.route('/reboot_bootloader/<serial_number>')
def reboot_bootloader_devices(serial_number):
    try:
        # Connect to ADB server
        adb = AdbClient(host="127.0.0.1", port=5037)

        def reboot_bootloader(device):
            device.shell("reboot bootloader")

        # Get the list of connected devices
        devices = adb.devices()

        # Find the device with the given serial number
        device = next((d for d in devices if d.serial == serial_number), None)

        if device:
            # Reboot the device into bootloader mode
            reboot_bootloader(device)

            # Return success message
            return jsonify({'message': f'Device with serial number {serial_number} rebooted into bootloader mode successfully'})
        else:
            # Return error message if device not found
            return jsonify({'error': f'Device with serial number {serial_number} not found'}), 404
    except Exception as e:
        # Return error message if something goes wrong
        return jsonify({'error': str(e)}), 500

@app.route('/capture_screenshot/<serial_number>')
def capture_screenshot(serial_number):
    try:
        # Capture screenshot using adb
        adb_command = ['adb', '-s', serial_number, 'shell', 'screencap', '-p', '/sdcard/screenshot.png']
        subprocess.run(adb_command)

        # Pull the screenshot from the device to the laptop
        pull_command = ['adb', '-s', serial_number, 'pull', '/sdcard/screenshot.png', 'screenshots/']
        subprocess.run(pull_command)

        # Return success message
        return jsonify({'message': f'Screenshot captured and saved as screenshots/screenshot_{serial_number}.png'})
    except Exception as e:
        # Return error message if something goes wrong
        return jsonify({'error': str(e)}), 500

@app.route('/install_apk/<serial_number>', methods=['POST'])
def install_apk(serial_number):
    data = request.json
    serial_number = data['serial_number']
    apk_filepath = data['apk_file_path']  
    app.logger.warning(apk_filepath)
    try:
        # Specify the path to the APK file
        #apk_filepath = r"C:\Users\aryat\Downloads\apkfiledigiyatra.apk"
        
        # Check if the APK file exists
        if not os.path.exists(apk_filepath):
            return jsonify({'error': 'APK file not found'}), 404

        # Connect to the ADB server
        client = AdbClient(host="127.0.0.1", port=5037)

        # Get the device with the specified serial number
        device = client.device(serial_number)

        if not device:
            return jsonify({'error': f'Device {serial_number} not found'}), 404

        # Install the APK on the device
        device.install(apk_filepath)
        return jsonify({'message': f'APK installed successfully on device {serial_number}'}), 200

    except Exception as e:
        # Return error message if something goes wrong
        return jsonify({'error': str(e)}), 500

# @app.route('/uninstall_apk/<serial_number>', methods=['POST'])
# def uninstall_apk(serial_number):
#     data = request.json
#     serial_number = data['serial_number']
#     package_name = data['apps']
#     print(package_name)
#     try:


#         # Connect to the ADB server
#         client = AdbClient(host="127.0.0.1", port=5037)

#         # Get the device with the specified serial number
#         device = client.device(serial_number)

#         if not device:
#             return jsonify({'error': f'Device {serial_number} not found'}), 404

#         # Uninstall the APK from the device
#         # device.uninstall(package_name)

#         # Check if the APK was uninstalled successfully
#         installed_packages = device.shell("pm list packages")
#         if package_name not in installed_packages:
#             # APK uninstalled successfully
#             return jsonify({'message': f'APK uninstalled successfully from device {serial_number}'}), 200
#         else:
#             # APK uninstallation failed
#             return jsonify({'error': f'Failed to uninstall APK from device {serial_number}'}), 500

#     except Exception as e:
#         # Return error message if something goes wrong
#         return jsonify({'error': str(e)}), 500

@app.route('/uninstall_apks/<serial_number>', methods=['POST'])
def uninstall_apks(serial_number):
    data = request.json
    serial_number = data['serial_number']
    package_names = data['apps']  
    app.logger.warning(package_names)     
    try:

        # Connect to the ADB server
        client = AdbClient(host="127.0.0.1", port=5037)

        # Get the device with the specified serial number
        device = client.device(serial_number)

        if not device:
            return jsonify({'error': f'Device {serial_number} not found'}), 404

        if not package_names:
            return jsonify({'error': 'No package names provided'}), 400

        # Uninstall each APK from the device
        for package_name in package_names:
            device.uninstall(package_name)

        # Check if all APKs were uninstalled successfully
        installed_packages = device.shell("pm list packages")
        for package_name in package_names:
            if package_name in installed_packages:
                return jsonify({'error': f'Failed to uninstall APK {package_name} from device {serial_number}'}), 500

        # All APKs uninstalled successfully
        return jsonify({'message': f'All APKs uninstalled successfully from device {serial_number}'}), 200

    except Exception as e:
        # Return error message if something goes wrong
        return jsonify({'error': str(e)}), 500
    
# @app.route('/uninstall_apk/<serial_number>')
# def uninstall_apk(serial_number):
#     try:
#         # Specify the path to the APK file
#         package_name = 'in.dataevolve.digiyatra'


#         # Connect to the ADB server
#         client = AdbClient(host="127.0.0.1", port=5037)

#         # Get the device with the specified serial number
#         device = client.device(serial_number)

#         if not device:
#             return jsonify({'error': f'Device {serial_number} not found'}), 404

#         # Uninstall the APK from the device
#         device.uninstall(package_name)

#         # Check if the APK was uninstalled successfully
#         installed_packages = device.shell("pm list packages")
#         if package_name not in installed_packages:
#             # APK uninstalled successfully
#             return jsonify({'message': f'APK uninstalled successfully from device {serial_number}'}), 200
#         else:
#             # APK uninstallation failed
#             return jsonify({'error': f'Failed to uninstall APK from device {serial_number}'}), 500

#     except Exception as e:
#         # Return error message if something goes wrong
#         return jsonify({'error': str(e)}), 500


@app.route('/push_file/<serial_number>')
def push_file(serial_number):
    try:
        # Connect to ADB server
        adb = AdbClient(host="127.0.0.1", port=5037)
        devices = adb.devices()

        # Check if device with given serial number is connected
        device = next((dev for dev in devices if dev.serial == serial_number), None)
        if device is None:
            return jsonify({'error': f"No device with serial number {serial_number} found."}), 404

        # Specify the local file path and the destination path on the device
        local_file_path = '/Users/raghav/Downloads/nexus24.png'
        destination_path = '/sdcard/nexus24.png'  # Destination path on the device

        # Push the file to the device
        device.push(local_file_path, destination_path)

        # Return success message
        return jsonify({'message': f'File pushed to device {serial_number} at {destination_path}'})
    except Exception as e:
        # Return error message if something goes wrong
        return jsonify({'error': str(e)}), 500

@app.route('/adb_shell/<serial_number>')
def adb_shell(serial_number):
    try:
        if not serial_number:
            return jsonify({'error': 'Serial number is required.'}), 400

        # Construct ADB shell command
        adb_command = f"adb -s {serial_number} shell"

        # Construct PowerShell command to open a new PowerShell window and run the ADB shell command
        powershell_command = f'start powershell -NoExit -Command "{adb_command}"'

        # Execute the PowerShell command
        os.system(powershell_command)

        return jsonify({'message': f'ADB shell opened for device {serial_number}'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Pixel-3a-14 S/N: emulator-5554
# Pixel-8-11  S/N: emulator-5556
# C:\Users\aryat\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\System Tools    
@app.route('/open_emulator/Pixel-3a-14')
def open_emulator():
    try:
        # Open terminal and execute the command
        #path_to_sdk = r"C:\Users\aryat\AppData\Local\Android\Sdk"
        #command = f'cmd /k "set ANDROID_SDK_ROOT={path_to_sdk} & emulator -avd Pixel-3a-14 & pause"'
        # path_to_sdk = r"C:\Users\aryat\AppData\Local\Android\Sdk"
        # command = f'set ANDROID_SDK_ROOT={path_to_sdk} && emulator -avd Pixel-3a-14 && pause'
        # os.system(f'cmd /k "{command}"')
        command = 'start cmd /k emulator -avd Pixel-3a-14 & pause'
        # command = 'wt PowerShell -NoExit -Command "emulator -avd Pixel-3a-14"'
       
        # command = f'wt {path_to_ps} -NoExit -Command "emulator -avd Pixel-3a-14"'
        os.system(command)

        return 'Emulator started successfully.'
    except Exception as e:
        return f'Error: {e}'
    
@app.route('/open_emulator/Pixel-8-11')
def open_emulator_1():
    try:
        command = 'start cmd /k emulator -avd Pixel-8-11 & pause'
        os.system(command)

        return 'Emulator started successfully.'
    except Exception as e:
        return f'Error: {e}'    

# @app.route('/close_emulator/Pixel-3a-14')
# def close_emulator():
#     try:
#         # Kill the emulator process
#         subprocess.run(['pkill', '-f', 'Pixel-3a-14'])
#         return 'Emulator closed successfully.'
#     except Exception as e:
#         return f'Error: {e}'

@app.route('/logcat/<serial_number>')
def capture_and_transfer_logs(serial_number):
    client = AdbClient(host="127.0.0.1", port=5037)
    devices = client.devices()
 
    # Check if the device is connected
    device = None
    for d in devices:
        if d.serial == serial_number:
            device = d
            break
    if not device:
        return jsonify({'error': 'Device not found or not connected'})

    # Start capturing network logs
    try:
        output_file = '/sdcard/network_logs.txt'
        device.shell('logcat -d > {}'.format(output_file))
        device.pull(output_file, './nw_log/nw_log.txt')
        return jsonify({'success': 'Network logs captured and transferred successfully'})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
