<div align="center">
<h1>ANDROID DEVICE MANAGER</h1>
</div>
<div align="center">
   <strong>A cross platform web app to manage adb devices and emulators</strong><br>
  Note: This is the clone of two parent repositories:

  - [backend](https://github.com/dev-rvk/ADM-server)
  - [frontend](https://github.com/ira-sheth/ADM-mARIO)
  <br> <br>
  
</div>
<hr>

<details>
<summary>Table of Contents</summary>

- [📝Top Features](#top-features)
- [🔗Links](#links)
- [🤖Tech-Stack](#tech-stack)
    - [Front-end](#front-end)
    - [Back-end](#back-end)
- [📈Progress](#progress)
- [🔮Future Scope](#future-scope)
- [ANDROID EMULATOR](#android-emulator)
- [🛠Project Setup](#project-setup)
- [👨‍💻Team Members](#team-members)
- [Screenshots](#screenshots)

</details>

## 📝Top Features

-Shift emulator android versions and hardware seamlessly. <br>
-Access to adb-shell on fingertips get network log and logcat instantly.



## 🔗Links

- [GitHub Repository](https://github.com/dev-rvk/ADM-server)
- [Link to PPT](https://www.canva.com/design/DAGATsqKn0Q/HgkeqLQtdqXKeI1ShJQIvQ/edit?utm_content=DAGATsqKn0Q&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)





## 🤖Tech-Stack


#### Front-end
- React


#### Back-end
- Flask (Python)






## 📈Progress



- [x] <strong>Phone Info</strong> - Device related informaton including device name, android version, serial no, build no, etc.
- [x] <strong>App Installer</strong> - Installs any compatible app using its apk file.
- [x] <strong>App Manager</strong> -Lists all the apps in the android device and provides the option to uninstall them.
- [x] <strong>Booting Options</strong> - Booting operations including reboot, reboot into recovery mode and reboot into bootloader mode.
- [x] <strong>Screen Capture</strong> - Screen cast of the android device on the app.
- [x] <strong>ADB-Shell</strong> - Opens command window in the app to access and manage the file system.
- [x] <strong>Network Logs</strong> - Displays all the incoming and outgoing connections made by the device.
- [x] <strong>Emulators</strong> - We have two hardware emolators working that are hardcoded for now


## 🔮Future Scope

- Replace all the server side app openings so that the client can access the devices connected to the server.
- An Emulator-Manager which will have the option of creating custom emulators and allow us to emulate software and hardware version of different devices with different android versions.
- In-built File-Manager.
- Login/Logout system.

## ANDROID EMULATOR


- [x] Make image with specific hardware configuration.
- [x] Make image with specific android version.
- [x] The device supports snapshots, i.e. you can store the current device state and reload the exact same state.
- [x] Detected as a local device.

## 🛠Project Setup


`Write the following commands on the terminal.`


1. Clone the project

```bash
git clone https://github.com/dev-rvk/ADM.git
```

2. Go to the backend directory

```bash
cd backend
```

3. Install dependencies

```bash
pip install -r requirements.txt
```

4. Start the server

```bash
python server.py
```

5. Go to the frontend directory

```bash
cd ../frontend
```

3. Install dependencies

```bash
npm install
```

4. Start the web app

```bash
npm start
```



## 👨‍💻Team Members
[Raghav Korde](https://github.com/dev-rvk) <br>
[Ira Sheth](https://github.com/ira-sheth)<br>
[Mohd Owais Sheikh](https://github.com/Owaiz13)<br>
[Arya Tayshete](https://github.com/xoaryaa)




## Screenshots
<a href="https://ibb.co/Yhk9Gzn"><img src="https://i.ibb.co/2dt2BDV/android-emulator.jpg" alt="android-emulator" width="200" border="0"></a>
<a href="https://ibb.co/bdVBWmK"><img src="https://i.ibb.co/cT9Fg3r/dashboard.jpg" alt="dashboard" width="400" border="0"></a>
<a href="https://ibb.co/M9RnSpn"><img src="https://i.ibb.co/fQCMFtM/indexpage.jpg" alt="indexpage" width="400" border="0"></a>
