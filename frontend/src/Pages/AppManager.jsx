import React, { useState, useEffect } from 'react';
import { ListGroup, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { IoIosRefresh } from "react-icons/io";

export default function AppManager({ networkId }) {
    console.log(networkId);
    const [device, setDevice] = useState([]); // Initialize state for devices

    useEffect(() => {
      fetchData(); // Call fetchData function when component mounts
    }, [networkId]); // Added selectedDevice to dependency array

    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/apps"); // Added missing slash
        const data = await response.json();
        console.log(data);
        setDevice(data); // Update state with fetched devices data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const handleRefreshClick = () => {
      fetchData();
    }

    const [checkedApps, setCheckedApps] = useState([]);

    if (!networkId) {
        return (
          <div>
            <h1>No Device Selected</h1>
          </div>
        );
    }

    let selectedDeviceData; // Define selectedDeviceData outside the loop

    for (const serialNo in device.devices) {
        // Check if the selected device matches the current serial number
        if (networkId === serialNo) {
          // If there's a match, you can access the device data here
          selectedDeviceData = device.devices[serialNo];
          break; // Exit the loop since we found the selected device
        }
    }

    // Function to handle checkbox change
    // const handleCheckboxChange = (event, app) => {
    //     if (event.target.checked) {
    //         setCheckedApps([...checkedApps, app]);
    //     } else {
    //         setCheckedApps(checkedApps.filter(item => item !== app));
    //     }
    // };

    // Function to handle checkbox change
const handleCheckboxChange = async (event, app) => {
  if (event.target.checked) {
      setCheckedApps([...checkedApps, app]);
  } else {
      setCheckedApps(checkedApps.filter(item => item !== app));
  }

}

const postRequestToUnistallApps = async (event) => {
  // Send POST request to backend
  try {
    const response = await fetch(`http://127.0.0.1:5000/uninstall_apks/${networkId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            serial_number: networkId,
            apps: [...checkedApps]  // Include the newly checked/unchecked app
        }),
    });

    const data = await response.json();
    console.log(data);
    
    // Handle response data if necessary
} catch (error) {
    console.error("Error sending data:", error);
}
}

    return(
        <div>
            <h1>App Manager</h1>
            <br />
            <Button variant="dark" style={{marginRight:"2vh"}} onClick={postRequestToUnistallApps}>Uninstall</Button>
            <Button variant="dark" onClick={handleRefreshClick}><IoIosRefresh /></Button>
            <br /><br />
            {selectedDeviceData && (
              <div>
                <ListGroup>
                  {selectedDeviceData["Installed Apps"].map((app, index) => (
                    <ListGroup.Item key={index}>
                        <Form.Check 
                            type="checkbox" 
                            label={app}
                            onChange={(event) => handleCheckboxChange(event, app)} 
                        />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            )}
            
        </div>
    );
}
