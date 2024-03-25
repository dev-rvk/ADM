import React, { useState, useEffect } from 'react';
import Card from "react-bootstrap/Card";

export default function PhoneInfo({ networkId }) {
  console.log(networkId);

  const [device, setDevice] = useState([]); // Initialize state for devices

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/info_detailed/${networkId}`); // Added missing slash
        const data = await response.json();
        console.log(data);
        setDevice(data); // Update state with fetched devices data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call fetchData function when component mounts
  }, [networkId]); // Added selectedDevice to dependency array

  // Check if no device is selected
  if (!networkId) {
    return (
      <div>
        <h1>No Device Selected</h1>
      </div>
    );
  }

  // Render the component
  return (
    <div>
      <h1>Phone Info</h1>
      <br />
      <Card>
        <Card.Body>
          <Card.Title>{device.Manufacturer} {device.Model}</Card.Title>
          <Card.Text>
            {Object.entries(device).map(([key, value]) => (
              <div key={key}>
                <strong>{key}:</strong> {value}<br />
              </div>
            ))}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
