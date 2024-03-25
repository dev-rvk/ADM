import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

export default function ScreenCapture({ networkId }) {
  console.log(networkId);
  const fetchScrcpyData = async () => {
    try {

      const response = await fetch(`http://127.0.0.1:5000/start_scrcpy/${networkId}`); // Added missing slash
      console.log(networkId)
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }; // Corrected the placement of the closing bracket

  return (
    <div>
      <h1>Screen Capture</h1>
      <br />
      <Button variant="dark" onClick={fetchScrcpyData}>Fetch Scrcpy Data</Button>
    </div>
  );
}
