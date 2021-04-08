import './scss/main.scss'

class webPlayer {
    constructor () {
        //vars
        this.previous = null;
        this.next = null;
        this.play = null;
        this.title = null;
        this.autor = null;
        this.durationSlider = null;
        this.volumeSlider = null;
        this.trackImage = null;
        this.currentCount = null;
        this.totalCount = null;
        this.timer = null;
        this.index = null;
        this.playingTrack = null;
        this.allTracks = null;
        this.currentTime = null;
        this.totalTime = null;

        this.initVaribales();
        this.loadTrack(this.index);
        this.addEventListeners();
    };

    initVaribales () {
        this.previous = document.getElementById('prev');
        this.next = document.getElementById('next');
        this.play = document.getElementById('play');
        this.title = document.getElementById('title');
        this.autor = document.getElementById('autor');
        this.durationSlider = document.getElementById('duration_slider');
        this.volumeSlider = document.getElementById('volume_slider');
        this.trackImage = document.getElementById('cover_image');
        this.currentCount = document.getElementById('current_number');
        this.totalCount = document.getElementById('total_number');
        this.index = 0;
        this.playingTrack = false;
        this.currentTime = document.getElementById('current_time');;
        this.totalTime = document.getElementById('total_time');;
        this.allTracks = [
            {
                name: 'Уходи',
                autor: 'Anacondaz',
                path: 'dist/assets/music/1.mp3',
                img: 'dist/assets/img/cover_1.png'
            },
            {
                name: 'Дождь',
                autor: 'Anacondaz',
                path: 'dist/assets/music/2.mp3',
                img: 'dist/assets/img/cover_2.jpg'
            },
            {
                name: 'Выпуской',
                autor: 'Anacondaz',
                path: 'dist/assets/music/3.mp3',
                img: 'dist/assets/img/cover_1.png'
            },
        ];

        this.track = document.createElement('audio');
        this.track.volume = this.volumeSlider.value / 100;
        this.totalCount.innerHTML = this.allTracks.length;
    };

    addEventListeners () {
        this.play.addEventListener('click', () => {
            this.playToggle();
        });
        this.next.addEventListener('click', () => {
            this.nextTrack();
        });
        this.previous.addEventListener('click', () => {
            this.prevTrack();
        });
        this.volumeSlider.addEventListener('input', () => {
            this.changeVolume();
        });
        this.durationSlider.addEventListener('change', () => {
            this.changeDuration();
        });
    };

    loadTrack (index) {
        let selectTrack = this.allTracks[index];
        this.track.src = selectTrack.path;
        this.title.innerHTML = selectTrack.name;
        this.autor.innerHTML = selectTrack.autor;
        this.trackImage.style.backgroundImage = `url(${selectTrack.img})`;
        this.track.load();

        //onLoad track
        this.track.addEventListener('loadeddata', () => {
            this.durationSlider.value = 0;
            this.setIntervalTrack();
            this.setTotalTime();
        });

        this.currentCount.innerHTML = index + 1;
        document.title = `${selectTrack.autor} - ${selectTrack.name}`;
        
        // setTimeout(() => {
        //     document.getElementById('from').innerHTML = `${parseInt(this.track.duration / 60)}:${parseInt(this.track.duration % 60)}`;
        // }, 200);
    };

    setIntervalTrack () {
        this.timer = setInterval(() => {
            this.rangeDurationSlider();
        }, 1000);
    };

    playToggle () {
        if (this.playingTrack) 
            this.pauseTrack();
        else
            this.playTrack();
    };

    playTrack () {
        this.track.play();
        this.playingTrack = true;
        this.play.innerHTML = '<i class="fas fa-pause"></i>';
        this.setIntervalTrack();
    };

    pauseTrack () {
        this.track.pause();
        this.playingTrack = false;
        this.play.innerHTML = '<i class="fas fa-play"></i>';
        clearInterval(this.timer);
    };

    nextTrack () {
        if (this.index < this.allTracks.length - 1) {
            this.index += 1;
            this.loadTrack(this.index);
            this.playTrack();
        } else {
            this.index = 0;
            this.loadTrack(this.index);
            this.playTrack();
        }
    };

    prevTrack () {
        if (this.index > 0) {
            this.index -= 1;
            this.loadTrack(this.index);
            this.playTrack();
        } else {
            this.index = this.allTracks.length - 1;
            this.loadTrack(this.index);
            this.playTrack();
        }
    };

    changeVolume () {
        this.track.volume = this.volumeSlider.value / 100;
    };

    changeDuration () {
        let durationPosition = this.track.duration * (this.durationSlider.value / 100);
        this.track.currentTime = durationPosition;
        this.setCurrentTime();
    };

    rangeDurationSlider () {
        this.setCurrentTime();
        if (!isNaN(this.track.duration)) {
            this.durationSlider.value = this.track.currentTime * (100 / this.track.duration);
        }
        if (this.track.ended) {
            this.nextTrack();
        }
    };

    setCurrentTime () {
        let minutes = parseInt(this.track.currentTime / 60);
        let seconds = parseInt(this.track.currentTime % 60);
        this.currentTime.innerHTML = this.getNormalTime(minutes, seconds);
    };
    
    setTotalTime () {
        let minutes = parseInt(this.track.duration / 60);
        let seconds = parseInt(this.track.duration % 60);
        this.totalTime.innerHTML = this.getNormalTime(minutes, seconds);
    };

    getNormalTime (minutes, seconds) {
        if (+minutes < 10) minutes = `0${minutes}`;
        if (+seconds < 10) seconds = `0${seconds}`;
        return `${minutes}:${seconds}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let webPlayerInit = new webPlayer();
});