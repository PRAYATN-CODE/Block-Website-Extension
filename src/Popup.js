/* global chrome */
import React, { useState } from "react";
import "./Popup.css";

const Popup = () => {
    const [enabled, setEnabled] = useState(true);

    const toggleBlocker = () => {
        const newEnabled = !enabled;
        setEnabled(newEnabled);

        if (chrome.runtime && chrome.runtime.sendMessage) {
            chrome.runtime.sendMessage(
                { action: "toggleBlocker", enabled: newEnabled },
                (response) => {
                    if (chrome.runtime.lastError) {
                        console.error("Error: ", chrome.runtime.lastError);
                    } else {
                        console.log(response.status);
                    }
                }
            );
        }
    };

    return (
        <div className="popup-container">
            <h1 className="popup-title">Website Blocker</h1>
            <p className="popup-description">
                Block predefined websites with ease. Toggle to enable or disable the blocker.
            </p>
            <button className="toggle-btn" onClick={toggleBlocker}>
                {enabled ? "Disable Blocker" : "Enable Blocker"}
            </button>
            <div className={`status ${enabled ? 'enabled' : 'disabled'}`}>
                {enabled ? "Blocker is ON" : "Blocker is OFF"}
            </div>
        </div>
    );
};

export default Popup;
