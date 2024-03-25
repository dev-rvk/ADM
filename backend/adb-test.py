from ppadb.client import Client as AdbClient

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

def print_connected_devices_with_info():
    # Connect to the ADB server
    client = AdbClient(host="127.0.0.1", port=5037)

    # Get the list of connected devices
    devices = client.devices()

    if devices:
        print("List of connected devices with information:")
        for device in devices:
            device_info = get_device_info(device)
            print(f"Device Serial: {device.serial}")
            for key, value in device_info.items():
                print(f" - {key}: {value}")
            print("")
    else:
        print("No devices connected.")

if __name__ == "__main__":
    print_connected_devices_with_info()
