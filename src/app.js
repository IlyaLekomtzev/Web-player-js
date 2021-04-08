import './scss/main.scss'

class webPlayer {
    constructor () {
        this.initVaribales();
        this.initBaseActions();
        this.loadTrack(this.index);
        this.addEventListeners();
    };

    /**
     * Устанавливает переменные
     */
    initVaribales () {
        this.previous = document.getElementById('prev'); //Кнопка "предыдущий трек"
        this.next = document.getElementById('next'); //Кнопка "следующий трек"
        this.play = document.getElementById('play'); //Кнопка "воспроизведение/пауза"
        this.title = document.getElementById('title'); //Название трека
        this.autor = document.getElementById('autor'); //Исполнитель трека
        this.durationSlider = document.getElementById('duration_slider'); //Прогрессбар таймера воспроизведения
        this.volumeSlider = document.getElementById('volume_slider'); //Ползунок громкости
        this.volumeButton = document.getElementById('volume_button'); //Кнопка "вкл/выкл звук"
        this.volume = true; //Свитчер звука
        this.lastVolume = 0.9; //Предыдущее значение громкости
        this.trackImage = document.getElementById('cover_image'); //Изображение трека
        this.currentCount = document.getElementById('current_number'); //Текущий номер трека
        this.totalCount = document.getElementById('total_number'); //Общее количество треков
        this.index = 0; //Текущий индекс трека
        this.playingTrack = false; //Свитчер воспроизведения трека
        this.currentTime = document.getElementById('current_time'); //Текущее время воспроизведения
        this.totalTime = document.getElementById('total_time'); //Общее время трека
        this.timer = null; //Таймер
        this.durationHover = false;
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
        ]; //Массив треков
    };

    /**
     * Совершает базовые действия при загрузке страницы
     */
    initBaseActions () {
        this.track = document.createElement('audio');
        this.volumeSlider.value = this.lastVolume * 100;
        this.track.volume = this.volumeSlider.value / 100;
        this.totalCount.innerHTML = this.allTracks.length;
    }

    /**
     * Устанавливает обработчики событий
     */
    addEventListeners () {
        this.play.addEventListener('click', () => {
            this.playToggle();
        });
        document.addEventListener('keydown', e => {
            if (e.code == 'Space') this.playToggle();
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
        this.volumeButton.addEventListener('click', () => {
            this.toggleVolume();
        });
        this.durationSlider.addEventListener('change', () => {
            this.changeDuration();
        });
        this.durationSlider.addEventListener('mouseenter', () => {
            this.durationHover = true;
        });
        this.durationSlider.addEventListener('mouseleave', () => {
            this.durationHover = false;
        });
    };

    /**
     * Загружает и устанавливет информацию о треке
     * @param {*} index
     */
    loadTrack (index) {
        let selectTrack = this.allTracks[index];
        this.track.src = selectTrack.path;
        this.title.innerHTML = selectTrack.name;
        this.autor.innerHTML = selectTrack.autor;
        this.trackImage.style.backgroundImage = `url(${selectTrack.img})`;
        this.track.load();

        this.track.addEventListener('loadeddata', () => {
            this.durationSlider.value = 0;
            this.setIntervalTrack();
            this.setTotalTime();
        });

        this.currentCount.innerHTML = index + 1;
        document.title = `${selectTrack.autor} - ${selectTrack.name}`;
    };

    /**
     * Устанаваливет периодичный вызов метода обновления таймера
     */
    setIntervalTrack () {
        this.timer = setInterval(() => {
            this.rangeDurationSlider();
        }, 1000);
    };

    /**
     * Вызывает метод проигрывания или паузы
     */
    playToggle () {
        if (this.playingTrack) 
            this.pauseTrack();
        else
            this.playTrack();
    };

    /**
     * Вызывает воспроизведение трека
     */
    playTrack () {
        this.track.play();
        this.playingTrack = true;
        this.play.innerHTML = '<i class="fas fa-pause"></i>';
        this.setIntervalTrack();
    };

    /**
     * Ставит трек на паузу
     */
    pauseTrack () {
        this.track.pause();
        this.playingTrack = false;
        this.play.innerHTML = '<i class="fas fa-play"></i>';
        clearInterval(this.timer);
    };

    /**
     * Вызывает следующий трек
     */
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

    /**
     * Вызывает предыдущий трек
     */
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

    /**
     * Событие при изменении громкости
     */
    changeVolume () {
        this.track.volume = this.volumeSlider.value / 100;
        if (+this.track.volume === 0) {
            this.volume = false;
            this.volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
            this.volumeButton.classList.add('mute');
        } else {
            this.volume = true;
            this.volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
            this.volumeButton.classList.remove('mute');
        }
    };

    /**
     * Событие при изменении прогрессбара таймера
     */
    changeDuration () {
        let durationPosition = this.track.duration * (this.durationSlider.value / 100);
        this.track.currentTime = durationPosition;
        this.setCurrentTime();
    };

    /**
     * Изменяет прогресс таймер
     */
    rangeDurationSlider () {
        this.setCurrentTime();
        if (!this.durationHover) {
            if (!isNaN(this.track.duration)) {
                this.durationSlider.value = this.track.currentTime * (100 / this.track.duration);
            }
        }
        if (this.track.ended) {
            this.nextTrack();
        }
    };

    /**
     * Устанавливает текущий тайминг проигрывания трека
     */
    setCurrentTime () {
        let minutes = parseInt(this.track.currentTime / 60);
        let seconds = parseInt(this.track.currentTime % 60);
        this.currentTime.innerHTML = this.getNormalTime(minutes, seconds);
    };
    
    /**
     * Устанавливает общее время трека
     */
    setTotalTime () {
        let minutes = parseInt(this.track.duration / 60);
        let seconds = parseInt(this.track.duration % 60);
        this.totalTime.innerHTML = this.getNormalTime(minutes, seconds);
    };

    /**
     * Возвращает время в нормально виде
     * @param {*} minutes 
     * @param {*} seconds 
     * @returns время в виде 00:00
     */
    getNormalTime (minutes, seconds) {
        if (+minutes < 10) minutes = `0${minutes}`;
        if (+seconds < 10) seconds = `0${seconds}`;
        return `${minutes}:${seconds}`;
    };

    /**
     * Событие при изменени режима громкости (вкл/выкл)
     */
    toggleVolume () {
        if (this.volume)
            this.turnOffVolume();
        else 
            this.turnOnVolume();
        
    };

    /**
     * Включает громкость проигрывания
     */
    turnOnVolume () {
        this.track.volume = this.lastVolume;
        this.volumeSlider.value = this.track.volume * 100;
        this.volume = true;
        this.volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        this.volumeButton.classList.remove('mute');
    }

    /**
     * Выключает громкость проигрывания
     */
    turnOffVolume () {
        this.lastVolume = this.track.volume;
        this.track.volume = 0;
        this.volumeSlider.value = 0;
        this.volume = false;
        this.volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        this.volumeButton.classList.add('mute');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let webPlayerInit = new webPlayer();
});