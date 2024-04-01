// JavaScript for the music player functionality

let songs = ["song1", "song2", "song3"];
let currentIndex = 0;
let currentSong = document.getElementById(songs[currentIndex]);
let currentIcon = document.getElementById("ctrlIcon1");
let currentProgress = document.getElementById("progress1");
let currentVolume = document.getElementById("volume1");
let currentTimeDisplay = document.getElementById("timeDisplay1");
let interval;

function playPause(playerId) {
    let song = document.getElementById(songs[playerId - 1]);
    let icon = document.getElementById("ctrlIcon" + playerId);

    if (song.paused) {
        song.play();
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
        startTimer(playerId);
    } else {
        song.pause();
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
        clearInterval(interval);
    }
}

function startTimer(playerId) {
    let song = document.getElementById(songs[playerId - 1]);
    let progress = document.getElementById("progress" + playerId);
    let timeDisplay = document.getElementById("timeDisplay" + playerId);
    interval = setInterval(function () {
        let minutes = Math.floor(song.currentTime / 60);
        let seconds = Math.floor(song.currentTime % 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        let durationMinutes = Math.floor(song.duration / 60);
        let durationSeconds = Math.floor(song.duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }
        timeDisplay.textContent = minutes + ":" + seconds + " / " + durationMinutes + ":" + durationSeconds;
        progress.value = (song.currentTime / song.duration) * 100;
    }, 1000);
}

function nextSong() {
    if (currentIndex < songs.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    loadSong(currentIndex + 1);
}

function prevSong() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = songs.length - 1;
    }
    loadSong(currentIndex + 1);
}

function loadSong(playerId) {
    clearInterval(interval);
    currentSong.pause();
    currentSong.currentTime = 0;
    currentIcon.classList.remove("fa-pause");
    currentIcon.classList.add("fa-play");
    currentSong = document.getElementById(songs[playerId - 1]);
    currentIcon = document.getElementById("ctrlIcon" + playerId);
    currentProgress = document.getElementById("progress" + playerId);
    currentVolume = document.getElementById("volume" + playerId);
    currentTimeDisplay = document.getElementById("timeDisplay" + playerId);
    currentSong.volume = currentVolume.value / 100;
    startTimer(playerId);
}

currentVolume.addEventListener("input", function () {
    currentSong.volume = currentVolume.value / 100;
});

currentProgress.addEventListener("input", function () {
    currentSong.currentTime = (currentProgress.value / 100) * currentSong.duration;
});
