import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Index from "./Pages/Index";
import AppInstaller from "./Pages/AppInstaller";
import AppManager from "./Pages/AppManager";
import Screenshot from "./Pages/Screenshot";
import ScreenCapture from "./Pages/ScreenCapture";
import PhoneInfo from "./Pages/PhoneInfo";
import Terminal from "./Pages/Terminal";
import BootingOptions from "./Pages/BootingOptions";
import NetworkLogs from "./Pages/NetworkLogs";
import "./App.css";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [selectedDevice, setSelectedDevice] = useState([]);
  const [emulatorSerial, setEmulatorSerial] = useState(null);
  const [devices, setDevices] = useState([]); // Initialize state for devices
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/info");
        const data = await response.json();
        const devicesData = data.devices;
        setDevices(devicesData); // Update state with fetched devices data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call fetchData function when component mounts
  }, []); // Empty dependency array to run the effect only once when the component mounts
  const location = useLocation();
  const navigate = useNavigate(); // Use navigate function to navigate to different routes

  // Function to handle tile click and update selectedDevice state
  const handleTileClick = (device) => {
    const selected = devices.find(d => d.Serial === device);
    setSelectedDevice(selected);
    navigate('/home'); // Navigate to the home page
  };

  const handleEmulatorOne = async (emulatorSerial) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/open_emulator/Pixel-3a-14`);
        const data = await response.json();
        console.log(data);
        setEmulatorSerial(emulatorSerial); // Update emulatorSerial state with the provided emulator serial
        navigate('/home'); // Navigate to the home page
    } catch (error) {
        console.error("Error fetching emulator data:", error);
    }
};

const handleEmulatorTwo = async (emulatorSerial) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/open_emulator/Pixel-8-11`);
        const data = await response.json();
        console.log(data);
        setEmulatorSerial(emulatorSerial); // Update emulatorSerial state with the provided emulator serial
        navigate('/home'); // Navigate to the home page
    } catch (error) {
        console.error("Error fetching emulator data:", error);
    }
};

  let deviceSerial = selectedDevice?.Serial;


  return (
    <div className="AppContent">
      {/* Conditional rendering of Header and Sidebar based on the current route */}
      {location.pathname !== '/' && (
        <>
          <Header networkId={deviceSerial} />
          <div className="flexContainer">
            <Sidebar />
            <div className="mainContent">
              <Routes>
                <Route path="/home" element={<PhoneInfo networkId={deviceSerial} />} />
                <Route path="/app-installer" element={<AppInstaller networkId={deviceSerial}/>} />
                <Route path="/app-manager" element={<AppManager networkId={deviceSerial} />} />
                <Route path="/screen-capture" element={<ScreenCapture networkId={deviceSerial} />} />
                <Route path="/terminal" element={<Terminal networkId={deviceSerial} />} />
                <Route path="/booting-options" element={<BootingOptions networkId={deviceSerial} />}/>
                <Route path="/network-logs" element={<NetworkLogs networkId={deviceSerial} />}/>
                <Route path="/screenshot" element={<Screenshot networkId={deviceSerial} />}/>
              </Routes>
            </div>
          </div>
        </>
      )}

      {/* Route for the index page */}
      <Routes>
        <Route path="/" element=
        {<Index 
        handleTileClick={handleTileClick}
        handleEmulatorOne={handleEmulatorOne}
        handleEmulatorTwo={handleEmulatorTwo} />} />
      </Routes>
    </div>
  );
}

export default App;
