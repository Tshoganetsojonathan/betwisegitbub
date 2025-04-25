<script>
    // Get elements
    const timerDisplay = document.getElementById('timer');
    const startButton = document.getElementById('start-btn');
    const timeInput = document.getElementById('time-input');
    
    let countdown;
    let remainingTime = localStorage.getItem('remainingTime') || 0; // Get saved time or 0 if no time saved
    let isRunning = false;

    // Function to start or resume the timer
    function startTimer() {
        const time = parseInt(timeInput.value);

        if (isNaN(time) || time <= 0 || time > 20) {
            alert('Addiction kills. Please set a time between 1 and 20 minutes.');
            return;
        }

        // Save the input time in localStorage
        localStorage.setItem('remainingTime', time * 60); // Store in seconds

        // Reset timer and start countdown
        remainingTime = time * 60;
        isRunning = true;
        countdown = setInterval(updateTimer, 1000);
        startButton.textContent = "Pause Timer"; // Change button text
    }

    // Function to update the timer
    function updateTimer() {
        if (remainingTime <= 0) {
            clearInterval(countdown);
            startButton.textContent = "Start Timer";
            alert("Time's up! You should take a break.");
            isRunning = false;
            return;
        }

        remainingTime--;
        localStorage.setItem('remainingTime', remainingTime); // Save updated time
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    // Function to pause the timer
    function pauseTimer() {
        clearInterval(countdown);
        startButton.textContent = "Resume Timer";
        isRunning = false;
    }

    // Handle start/resume/pause button click
    startButton.addEventListener('click', () => {
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    });

    // On page load, check if there's saved time and resume countdown
    window.addEventListener('load', () => {
        if (remainingTime > 0) {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            startButton.textContent = "Pause Timer";
        } else {
            timerDisplay.textContent = "0:00";
            startButton.textContent = "Start Timer";
        }
    });
</script>
