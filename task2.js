// Define variables
let startTime, updatedTime, difference, tInterval, running = false;
let hours, minutes, seconds, milliseconds;
let lapCounter = 1;

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');
const digitalClock = document.querySelector('.digital');
const analogClock = document.querySelector('.analog');
const digitalClockButton = document.getElementById('digitalClockButton');
const analogClockButton = document.getElementById('analogClockButton');
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

// Event Listeners
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
digitalClockButton.addEventListener('click', () => switchClock('digital'));
analogClockButton.addEventListener('click', () => switchClock('analog'));

// Start Timer
function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
    }
}

// Stop Timer
function stopTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
}

// Reset Timer
function resetTimer() {
    clearInterval(tInterval);
    running = false;
    document.getElementById('hours').innerHTML = '00';
    document.getElementById('minutes').innerHTML = '00';
    document.getElementById('seconds').innerHTML = '00';
    document.getElementById('milliseconds').innerHTML = '00';
    hourHand.style.transform = 'translateX(-50%) rotate(0deg)';
    minuteHand.style.transform = 'translateX(-50%) rotate(0deg)';
    secondHand.style.transform = 'translateX(-50%) rotate(0deg)';
    laps.innerHTML = '';
    lapCounter = 1;
}

// Record Lap
function recordLap() {
    if (running) {
        const lapTime = document.getElementById('hours').innerHTML + ':' +
                        document.getElementById('minutes').innerHTML + ':' +
                        document.getElementById('seconds').innerHTML + ':' +
                        document.getElementById('milliseconds').innerHTML;
        const lapEntry = document.createElement('div');
        lapEntry.classList.add('lap');
        lapEntry.innerHTML = `Lap ${lapCounter++}: ${lapTime}`;
        laps.appendChild(lapEntry);
    }
}

// Get and Show Time
function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((difference % (1000 * 60)) / 1000);
    milliseconds = Math.floor((difference % 1000) / 10);

    document.getElementById('hours').innerHTML = formatTime(hours);
    document.getElementById('minutes').innerHTML = formatTime(minutes);
    document.getElementById('seconds').innerHTML = formatTime(seconds);
    document.getElementById('milliseconds').innerHTML = formatTime(milliseconds);

    updateAnalogClock(hours, minutes, seconds);
}

// Format Time
function formatTime(value) {
    return value < 10 ? '0' + value : value;
}

// Update Analog Clock
function updateAnalogClock(hours, minutes, seconds) {
    const hourDegrees = (hours % 12) * 30 + minutes / 2;
    const minuteDegrees = minutes * 6;
    const secondDegrees = seconds * 6;

    hourHand.style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;
    secondHand.style.transform = `translateX(-50%) rotate(${secondDegrees}deg)`;
}

// Switch Clock
function switchClock(type) {
    if (type === 'digital') {
        digitalClock.style.display = 'block';
        analogClock.style.display = 'none';
        digitalClockButton.classList.add('active');
        analogClockButton.classList.remove('active');
    } else {
        digitalClock.style.display = 'none';
        analogClock.style.display = 'block';
        digitalClockButton.classList.remove('active');
        analogClockButton.classList.add('active');
    }
}
