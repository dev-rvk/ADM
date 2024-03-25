import React, { useState } from "react";
import Button from "react-bootstrap/Button";

export default function Screenshot( { networkId } ) {
    const [screenshotData, setScreenshotData] = useState(null);

    const handleScreenshot = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/capture_screenshot/${networkId}`); // Added missing slash
            const data = await response.json();
            console.log(data);
            setScreenshotData(data); // Update state with fetched devices data
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return(
        <div>
            <h1>Screenshot</h1>
            <br />
            <Button variant="dark" onClick={handleScreenshot}>Take Screenshot</Button>
        </div>
    )
}