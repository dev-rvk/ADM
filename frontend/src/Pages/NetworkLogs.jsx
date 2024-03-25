import React from "react";
import Button from "react-bootstrap/Button";

export default function BootingOptions({ networkId }) {
    const showNetworkLogs = async () => {
        try {

            const response = await fetch(`http://127.0.0.1:5000/logcat/${networkId}`); // Added missing slash
            console.log(networkId)
            const data = await response.text();
            console.log(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }; // Corrected the placement of the closing bracket

    return (
        <div>
            <h1>Network Logs</h1>
            <br />
            <Button variant="dark" onClick={showNetworkLogs} >Show Network logs</Button>
        </div>
    );
}
