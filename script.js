// Store settings
let settings = {
    logLimit: 50,
    queryLimit: 30000,
    stringSizeLimit: 500,
    maxLogSize: 20000,
    showRequestHeaders: false,
    showResponseHeaders: false,
    screenshotPath: "",
};

// Sample console logs for demonstration
const sampleConsoleLogs = [
    { type: 'log', message: 'Page loaded successfully', timestamp: new Date().toISOString() },
    { type: 'info', message: 'User session started', timestamp: new Date(Date.now() - 60000).toISOString() },
    { type: 'warn', message: 'Resource loading slow', timestamp: new Date(Date.now() - 120000).toISOString() },
    { type: 'error', message: 'Failed to load resource: net::ERR_CONNECTION_REFUSED', timestamp: new Date(Date.now() - 180000).toISOString() }
];

// Sample network requests for demonstration
const sampleNetworkRequests = [
    { 
        url: 'https://api.example.com/data', 
        method: 'GET', 
        status: 200, 
        type: 'fetch', 
        timestamp: new Date().toISOString(),
        responseSize: '1.2KB'
    },
    { 
        url: 'https://api.example.com/users', 
        method: 'POST', 
        status: 201, 
        type: 'xhr', 
        timestamp: new Date(Date.now() - 30000).toISOString(),
        responseSize: '0.8KB'
    },
    { 
        url: 'https://cdn.example.com/image.jpg', 
        method: 'GET', 
        status: 404, 
        type: 'img', 
        timestamp: new Date(Date.now() - 90000).toISOString(),
        responseSize: '0KB'
    }
];

// Function to display console logs
function displayConsoleLogs() {
    const consoleLogsContainer = document.getElementById('console-logs');
    consoleLogsContainer.innerHTML = '';
    
    if (sampleConsoleLogs.length === 0) {
        consoleLogsContainer.innerHTML = '<p>No logs available</p>';
        return;
    }
    
    const table = document.createElement('table');
    table.className = 'logs-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Type</th>
                <th>Message</th>
                <th>Time</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    
    const tbody = table.querySelector('tbody');
    
    sampleConsoleLogs.forEach(log => {
        const row = document.createElement('tr');
        row.className = `log-${log.type}`;
        
        const typeCell = document.createElement('td');
        typeCell.textContent = log.type.toUpperCase();
        
        const messageCell = document.createElement('td');
        messageCell.textContent = log.message;
        
        const timeCell = document.createElement('td');
        timeCell.textContent = new Date(log.timestamp).toLocaleTimeString();
        
        row.appendChild(typeCell);
        row.appendChild(messageCell);
        row.appendChild(timeCell);
        
        tbody.appendChild(row);
    });
    
    consoleLogsContainer.appendChild(table);
}

// Function to display network requests
function displayNetworkRequests() {
    const networkLogsContainer = document.getElementById('network-logs');
    networkLogsContainer.innerHTML = '';
    
    if (sampleNetworkRequests.length === 0) {
        networkLogsContainer.innerHTML = '<p>No network requests available</p>';
        return;
    }
    
    const table = document.createElement('table');
    table.className = 'logs-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th>URL</th>
                <th>Method</th>
                <th>Status</th>
                <th>Type</th>
                <th>Size</th>
                <th>Time</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    
    const tbody = table.querySelector('tbody');
    
    sampleNetworkRequests.forEach(request => {
        const row = document.createElement('tr');
        row.className = request.status >= 400 ? 'request-error' : 'request-success';
        
        const urlCell = document.createElement('td');
        urlCell.textContent = request.url;
        urlCell.className = 'url-cell';
        
        const methodCell = document.createElement('td');
        methodCell.textContent = request.method;
        
        const statusCell = document.createElement('td');
        statusCell.textContent = request.status;
        
        const typeCell = document.createElement('td');
        typeCell.textContent = request.type;
        
        const sizeCell = document.createElement('td');
        sizeCell.textContent = request.responseSize;
        
        const timeCell = document.createElement('td');
        timeCell.textContent = new Date(request.timestamp).toLocaleTimeString();
        
        row.appendChild(urlCell);
        row.appendChild(methodCell);
        row.appendChild(statusCell);
        row.appendChild(typeCell);
        row.appendChild(sizeCell);
        row.appendChild(timeCell);
        
        tbody.appendChild(row);
    });
    
    networkLogsContainer.appendChild(table);
}

// Function to save settings
function saveSettings() {
    console.log('Settings saved:', settings);
    // In a real app, this would save to localStorage or send to a server
}

// Initialize event listeners for settings inputs
function initializeSettingsListeners() {
    document.getElementById('log-limit').addEventListener('change', (e) => {
        settings.logLimit = parseInt(e.target.value, 10);
        saveSettings();
    });
    
    document.getElementById('query-limit').addEventListener('change', (e) => {
        settings.queryLimit = parseInt(e.target.value, 10);
        saveSettings();
    });
    
    document.getElementById('string-size-limit').addEventListener('change', (e) => {
        settings.stringSizeLimit = parseInt(e.target.value, 10);
        saveSettings();
    });
    
    document.getElementById('max-log-size').addEventListener('change', (e) => {
        settings.maxLogSize = parseInt(e.target.value, 10);
        saveSettings();
    });
    
    document.getElementById('show-request-headers').addEventListener('change', (e) => {
        settings.showRequestHeaders = e.target.checked;
        saveSettings();
    });
    
    document.getElementById('show-response-headers').addEventListener('change', (e) => {
        settings.showResponseHeaders = e.target.checked;
        saveSettings();
    });
    
    document.getElementById('screenshot-path').addEventListener('change', (e) => {
        settings.screenshotPath = e.target.value;
        saveSettings();
    });
}

// Function to simulate taking a screenshot
function simulateTakeScreenshot() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
            const filename = `screenshot-${timestamp}.png`;
            resolve({
                success: true,
                filename: filename,
                path: settings.screenshotPath ? `${settings.screenshotPath}/${filename}` : filename
            });
        }, 1000);
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Display sample data
    displayConsoleLogs();
    displayNetworkRequests();
    
    // Initialize settings listeners
    initializeSettingsListeners();
    
    // Capture screenshot button
    const captureScreenshotButton = document.getElementById('capture-screenshot');
    captureScreenshotButton.addEventListener('click', async () => {
        captureScreenshotButton.textContent = 'Capturing...';
        captureScreenshotButton.disabled = true;
        
        try {
            const result = await simulateTakeScreenshot();
            if (result.success) {
                captureScreenshotButton.textContent = `Captured: ${result.filename}`;
            } else {
                captureScreenshotButton.textContent = 'Failed to capture!';
            }
        } catch (error) {
            console.error('Screenshot error:', error);
            captureScreenshotButton.textContent = 'Error!';
        }
        
        setTimeout(() => {
            captureScreenshotButton.textContent = 'Capture Screenshot';
            captureScreenshotButton.disabled = false;
        }, 2000);
    });
    
    // Wipe logs button
    const wipeLogsButton = document.getElementById('wipe-logs');
    wipeLogsButton.addEventListener('click', () => {
        wipeLogsButton.textContent = 'Wiping...';
        wipeLogsButton.disabled = true;
        
        setTimeout(() => {
            // Clear sample data
            sampleConsoleLogs.length = 0;
            sampleNetworkRequests.length = 0;
            
            // Update UI
            displayConsoleLogs();
            displayNetworkRequests();
            
            wipeLogsButton.textContent = 'Logs Wiped!';
            
            setTimeout(() => {
                wipeLogsButton.textContent = 'Wipe All Logs';
                wipeLogsButton.disabled = false;
            }, 2000);
        }, 1000);
    });
});