import React, { useState } from "react";
import Button from "react-bootstrap/Button";

export default function BootingOptions({ networkId }) {

    const [rebootData, setRebootData] = useState(null);
    const [rebootRecoveryData, setRebootRecoveryData] = useState(null);
    const [rebootBootloadData, setRebootBootloadData] = useState(null);
    
    const reboot = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/reboot/${networkId}`);
            const data = await response.json();
            setRebootData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const rebootRecovery = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/reboot_recovery/${networkId}`);
            const data = await response.json();
            setRebootRecoveryData(data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const rebootBootload = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/reboot_bootloader/${networkId}`);
            const data = await response.json();
            setRebootBootloadData(data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div>
            <h1>Booting Options</h1>
            <br />
            <Button variant="dark" onClick={reboot} style={{ marginRight: "3vh" }}>Reboot</Button>
            <Button variant="dark" onClick={rebootRecovery} style={{ marginRight: "3vh" }}>Reboot Recovery</Button>
            <Button variant="dark" onClick={rebootBootload}>Reboot Bootloader</Button>
        </div>
    );
}
