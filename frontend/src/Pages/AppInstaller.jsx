import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const AppInstaller = ({networkId}) => {
  const [filePath, setFilePath] = useState('');

  const handleFilePathChange = (event) => {
    setFilePath(event.target.value);
  };

  const handleLogPath = async () => {
    // Perform validation for ".apk" file extension
    if (filePath.endsWith('.apk')) {
      console.log('File path:', filePath);
    } else {
      alert('Please enter a valid ".apk" file path.');
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/install_apk/${networkId}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              serial_number: networkId,
              apk_file_path: filePath  // Include the newly checked/unchecked app
          }),
      });
  
      const data =  await response.json();
      console.log(data);
      
      // Handle response data if necessary
  } catch (error) {
      console.error("Error sending data:", error);
  }
  };

  return (
    <div>
      <h1>App Installer</h1>
      <br />
      <Form>
        <Form.Group controlId="formFilePath">
          <Form.Label style={{fontSize:"6vh"}}>File path of the ".apk" to be installed:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter file path"
            value={filePath}
            onChange={handleFilePathChange}
          />
        </Form.Group>
        <br />
        <Button variant="dark" onClick={handleLogPath}>
          Install
        </Button>
      </Form>
    </div>
  );
};

export default AppInstaller;
