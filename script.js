document.addEventListener('DOMContentLoaded', () => {
    const clockDisplay = document.getElementById('clockDisplay');
    const stopwatchDisplay = document.getElementById('stopwatchDisplay');
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const resetButton = document.getElementById('resetButton');

    let clockInterval;
    let stopwatchInterval;
    let startTime;
    let elapsedTime = 0;
    let stopwatchRunning = false;

    // --- Clock Logic ---
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

    // --- Stopwatch Logic ---
    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        const milliseconds = String(ms % 1000).padStart(3, '0');
        return `${minutes}:${seconds}.${milliseconds}`;
    }

    function updateStopwatchDisplay() {
        const currentTime = Date.now();
        const currentElapsed = currentTime - startTime + elapsedTime;
        stopwatchDisplay.textContent = formatTime(currentElapsed);
    }

    function startStopwatch() {
        if (!stopwatchRunning) {
            startTime = Date.now();
            stopwatchInterval = setInterval(updateStopwatchDisplay, 10); // Update every 10ms for smoother display
            stopwatchRunning = true;
            startButton.disabled = true;
            stopButton.disabled = false;
            resetButton.disabled = true; // Disable reset while running
        }
    }

    function stopStopwatch() {
        if (stopwatchRunning) {
            clearInterval(stopwatchInterval);
            const currentTime = Date.now();
            elapsedTime += (currentTime - startTime); // Accumulate elapsed time
            stopwatchRunning = false;
            startButton.disabled = false;
            stopButton.disabled = true;
            resetButton.disabled = false; // Enable reset when stopped
        }
    }

    function resetStopwatch() {
        clearInterval(stopwatchInterval);
        elapsedTime = 0;
        stopwatchDisplay.textContent = formatTime(0);
        stopwatchRunning = false;
        startButton.disabled = false;
        stopButton.disabled = true;
        resetButton.disabled = true; // Disable reset until it's started then stopped or just started
    }

    // --- Event Listeners ---
    startButton.addEventListener('click', startStopwatch);
    stopButton.addEventListener('click', stopStopwatch);
    resetButton.addEventListener('click', resetStopwatch);

    // --- Initialization ---
    function initialize() {
        // Clock
        updateClock(); // Initial clock display
        clockInterval = setInterval(updateClock, 1000); // Update clock every second

        // Stopwatch
        stopwatchDisplay.textContent = formatTime(0);
        stopButton.disabled = true;
        resetButton.disabled = true; // Initially, reset is disabled
    }

    initialize();

    // Clean up intervals when the page is about to be unloaded (optional, good practice)
    window.addEventListener('beforeunload', () => {
        clearInterval(clockInterval);
        clearInterval(stopwatchInterval);
    });
});