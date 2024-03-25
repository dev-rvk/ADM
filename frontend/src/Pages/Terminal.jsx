import React from 'react';
import { Button } from 'react-bootstrap';

export default function Terminal({networkId}) {
        const openADBShell = async () => {
          try {
            const response = await fetch(`http://127.0.0.1:5000/adb_shell/${networkId}`); // Added missing slash
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    

    return (
        <div>
            <h1>Terminal</h1>
            <br />
            <Button variant="dark" onClick={openADBShell}>ADB Shell</Button>
        </div>
    );
}
