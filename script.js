let workDuration = 110 * 60; // 25 minutes
let shortBreakDuration = 5 * 60; // 5 minutes
let longBreakDuration = 15 * 60; // 15 minutes
let cyclesBeforeLongBreak = 4; // Number of cycles before a long break
let currentCycle = 0;
let timer;
let timeRemaining = workDuration;
let isWorkInterval = true;
let isRunning = false;

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeRemaining = workDuration;
    isWorkInterval = true;
    currentCycle = 0;
    updateTimerDisplay();
}

function updateTimer() {
    var heading = document.getElementById('heading');
    if (timeRemaining > 0) {
        timeRemaining--;
    } else {
        if (isWorkInterval) {
            currentCycle++;
            if (currentCycle % cyclesBeforeLongBreak === 0) {
                timeRemaining = longBreakDuration;
                heading.textContent = "Long Break";
            } else {
                timeRemaining = shortBreakDuration;
                heading.textContent = "Short Break";
            }
        } else {
            timeRemaining = workDuration;
            heading.textContent = "Focus";
        }
        isWorkInterval = !isWorkInterval;
    }
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('timer-display').textContent =
        `${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return number < 10 ? `0${number}` : number;
}

// Initial display update
updateTimerDisplay();

document.getElementById('fullscreen-btn').addEventListener('click', function() {
    var div = document.getElementById('fullscreen-div');

    if (div.requestFullscreen) {
        div.requestFullscreen();
    } else if (div.mozRequestFullScreen) { // Firefox
        div.mozRequestFullScreen();
    } else if (div.webkitRequestFullscreen) { // Chrome, Safari and Opera
        div.webkitRequestFullscreen();
    } else if (div.msRequestFullscreen) { // IE/Edge
        div.msRequestFullscreen();
    }

    // Add the background image class when entering fullscreen mode
    div.classList.add('fullscreen-background');
});

// Optional: Remove the background image class when exiting fullscreen mode
document.addEventListener('fullscreenchange', function() {
    var div = document.getElementById('fullscreen-div');
    if (!document.fullscreenElement) {
        div.classList.remove('fullscreen-background');
    }
});
document.addEventListener('webkitfullscreenchange', function() {
    var div = document.getElementById('fullscreen-div');
    if (!document.webkitFullscreenElement) {
        div.classList.remove('fullscreen-background');
    }
});
document.addEventListener('mozfullscreenchange', function() {
    var div = document.getElementById('fullscreen-div');
    if (!document.mozFullScreenElement) {
        div.classList.remove('fullscreen-background');
    }
});
document.addEventListener('msfullscreenchange', function() {
    var div = document.getElementById('fullscreen-div');
    if (!document.msFullscreenElement) {
        div.classList.remove('fullscreen-background');
    }
});
