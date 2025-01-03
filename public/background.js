let blockerEnabled = false;

// Array of blocked sites
const blockedSites = [
    "https://www.imdb.com/*",
    "https://www.onlinegdb.com/*"
];

// Handle messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleBlocker") {
        blockerEnabled = message.enabled;

        if (blockerEnabled) {
            console.log("Blocker enabled");
            addBlockingRules();
        } else {
            console.log("Blocker disabled");
            removeBlockingRules();
        }

        sendResponse({ status: `Blocker ${blockerEnabled ? "enabled" : "disabled"}` });
    }
    return true; // Keep the message port open for async response
});

// Function to add blocking rules using declarativeNetRequest
const addBlockingRules = () => {
    chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [
            {
                id: 1,
                priority: 1,
                action: {
                    type: "block"
                },
                condition: {
                    urlFilter: "https://www.imdb.com/*", // Block imdb
                    resourceTypes: ["main_frame", "sub_frame"]
                }
            },
            {
                id: 2,
                priority: 1,
                action: {
                    type: "block"
                },
                condition: {
                    urlFilter: "https://www.onlinegdb.com/*", // Block onlinegdb
                    resourceTypes: ["main_frame", "sub_frame"]
                }
            }
        ]
    }, () => {
        if (chrome.runtime.lastError) {
            console.error("Error adding rules: ", chrome.runtime.lastError);
        } else {
            console.log("Blocking rules added successfully");
        }
    });
};

// Function to remove blocking rules
const removeBlockingRules = () => {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1, 2]  // Remove both rules
    }, () => {
        if (chrome.runtime.lastError) {
            console.error("Error removing rules: ", chrome.runtime.lastError);
        } else {
            console.log("Blocking rules removed successfully");
        }
    });
};

// Optional: When the extension is installed or reloaded
chrome.runtime.onInstalled.addListener(() => {
    console.log("Website Blocker Extension Installed");
});
