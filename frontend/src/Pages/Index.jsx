import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { IoIosRefresh } from "react-icons/io"
import "../Main.css"; // Import the CSS file

function Index({ handleTileClick, handleEmulatorOne, handleEmulatorTwo}) {
  const [devices, setDevices] = useState([]); // Initialize state for devices
  
  useEffect(() => {
    fetchData(); // Call fetchData function when component mounts
  }, []); // Empty dependency array to run the effect only once when the component mounts

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

  const handleRefreshClick =  () => {
    fetchData();
  }

  return (
    <div className="Index-container">
      // Inside your Index component
<div className="Index-header">
  <Button variant="dark" className="refresh-button" onClick={handleRefreshClick}><IoIosRefresh /></Button>
</div>

      <h1 className="Index-title" style={{ color: 'black' }}>Android Device Manager</h1> {/* Added inline style to set color to black */}
      
      <div className="Index-card-container">
        {devices.map(device => (
          <Card key={device.Serial} className="Index-card">
            <Card.Body>
              <Card.Title>{device.Manufacturer} {device.Model}</Card.Title>
              <Card.Text>
                <strong>Android Version:</strong> {device['Android Version']}<br />
                <strong>Build Number:</strong> {device['Build Number']}<br />
                <strong>Serial:</strong> {device.Serial}
              </Card.Text>
              <Button variant="secondary" onClick={() => handleTileClick(device.Serial)}>Manage Device</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Button variant="dark" style={{margin:"2vh 0"}} onClick={() => handleEmulatorOne("emulator-5554")}>Emulator Pixel-3a-14</Button>
      <Button variant="dark" onClick={() => handleEmulatorTwo("emulator-5556")}>Emulator Pixel-8-11</Button>
    </div>
  );
}

export default Index;
