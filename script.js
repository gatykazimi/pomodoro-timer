let timer = null;
let minutes = 15;
let seconds = 0;
let isPaused = false;
let breakTime = false;
let enteredTimeStudyMin = null;
let enteredTimeStudySec = null;
let enteredTimeBreakMin = null;
let enteredTimeBreakSec = null;

function startTimer() {
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const timerElement = document.getElementById('timer').querySelector('h2');
    timerElement.textContent = formatTime(minutes, seconds);

    if (minutes === 0 && seconds === 0 && !breakTime) {
        clearInterval(timer);
        timer = null;
        alert('Time is up! Have a break :)');
        breakTimer();

    } else if (minutes === 0 && seconds === 0 && breakTime) {
        clearInterval(timer);
        timer = null;
        alert('Back to work :)');
        restartTimer();
    }
    else if (!isPaused) {
        if (seconds > 0) {
            seconds--;
        } else {
            seconds = 59;
            minutes--;
        }
    }
}

function formatTime(minutes, seconds) {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function togglePauseResume() {
    const pauseResumeButton = document.querySelector('.button');

    if (!timer) {  
        startTimer();
        pauseResumeButton.textContent = 'Pause';
        isPaused = false;
        return;
    }
    isPaused = !isPaused;
    if (isPaused) {
        clearInterval(timer);
        timer = null;
        pauseResumeButton.textContent = 'Resume';
    } else {
        startTimer();
        pauseResumeButton.textContent = 'Pause';
    }
}

function breakTimer() {
    clearInterval(timer);
    timer = null;
    breakTime = true;
    minutes = enteredTimeBreakMin || 5;
    seconds = enteredTimeBreakSec || 0;
    isPaused = false;
    const timerElement = document.getElementById('timer').querySelector('h2');
    timerElement.textContent = formatTime(minutes, seconds);

    const pauseResumeButton = document.querySelector('.button');
    pauseResumeButton.textContent = 'Pause';
    startTimer();
}

function restartTimer() {
    clearInterval(timer);
    timer = null;
    minutes = enteredTimeStudyMin || 15;
    seconds = enteredTimeStudySec || 0;
    isPaused = false;

    const timerElement = document.getElementById('timer').querySelector('h2');
    timerElement.textContent = formatTime(minutes, seconds);

    const pauseResumeButton = document.querySelector('.button');
    pauseResumeButton.textContent = 'Start';
}

function changeTime() {
    const openPopup = document.getElementById('change');
    const closePopup = document.getElementById('confirm');
    const popup = document.getElementById('popup');
    open
}

//Custom Time
document.addEventListener("DOMContentLoaded", function () {
    const studyTimeInput = document.getElementById("study-time");
    const breakTimeInput = document.getElementById("break-time");

    // Apply the formatting to both inputs
    studyTimeInput.addEventListener("input", formatTimeInput);
    breakTimeInput.addEventListener("input", formatTimeInput);

    function formatTimeInput(e) {
        let cursorPos = e.target.selectionStart;
        let formattedInput = autoFormatTime(e.target);
        e.target.value = formattedInput;

        let isBackspace = e.inputType === "deleteContentBackward";
        let nextCursorPos = nextDigit(formattedInput, cursorPos, isBackspace);

        setTimeout(() => {
            e.target.setSelectionRange(nextCursorPos, nextCursorPos);
        }, 0);
    }

    function autoFormatTime(ref) {
        let timeString = ref.value.replace(/\D/g, ""); // Remove non-digits
        if (timeString.length === 0) return "";

        let minutes = timeString.slice(0, 2);
        let seconds = timeString.slice(2, 4);

        if (seconds.length === 2 && parseInt(seconds) > 59) {
            seconds = "59";
        }

        if (minutes.length === 2 && parseInt(minutes) > 59) {
            minutes = "59";
        }

        return `${minutes}${seconds ? ":" + seconds : ""}`;
    }

    function nextDigit(input, cursorPos, isBackspace) {
        if (isBackspace) {
            for (let i = cursorPos - 1; i >= 0; i--) {
                if (/\d/.test(input[i])) return i + 1;
            }
        } else {
            for (let i = cursorPos; i < input.length; i++) {
                if (/\d/.test(input[i])) return i + 1;
            }
        }
        return cursorPos;
    }
});

function confirmTime(){
    const studyTimeInput = document.getElementById("study-time").value;
    const breakTimeInput = document.getElementById("break-time").value;

    [enteredTimeBreakMin, enteredTimeBreakSec] = convertToNums(breakTimeInput);
    [enteredTimeStudyMin, enteredTimeStudySec] = convertToNums(studyTimeInput);
    
    restartTimer();
    closePopup();
};

function convertToNums(timeString) {
    if (!timeString) return [0,0]; // If empty, return 0 seconds

    let parts = timeString.split(":");
    let minutes = parseInt(parts[0]) || 0; // First part is minutes
    let seconds = parseInt(parts[1]) || 0; // Second part is seconds

    return [minutes, seconds]; 
};

//Popup function
function openPopup() {
    document.getElementById("popup").style.display = "block";
  }
  
  function closePopup() {
    document.getElementById("popup").style.display = "none";
  }