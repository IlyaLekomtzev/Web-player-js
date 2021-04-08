/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://wep-player/./src/scss/main.scss?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/main.scss */ \"./src/scss/main.scss\");\n\r\n\r\nclass webPlayer {\r\n    constructor () {\r\n        this.initVaribales();\r\n        this.initBaseActions();\r\n        this.loadTrack(this.index);\r\n        this.addEventListeners();\r\n    };\r\n\r\n    /**\r\n     * Устанавливает переменные\r\n     */\r\n    initVaribales () {\r\n        this.previous = document.getElementById('prev'); //Кнопка \"предыдущий трек\"\r\n        this.next = document.getElementById('next'); //Кнопка \"следующий трек\"\r\n        this.play = document.getElementById('play'); //Кнопка \"воспроизведение/пауза\"\r\n        this.title = document.getElementById('title'); //Название трека\r\n        this.autor = document.getElementById('autor'); //Исполнитель трека\r\n        this.durationSlider = document.getElementById('duration_slider'); //Прогрессбар таймера воспроизведения\r\n        this.volumeSlider = document.getElementById('volume_slider'); //Ползунок громкости\r\n        this.volumeButton = document.getElementById('volume_button'); //Кнопка \"вкл/выкл звук\"\r\n        this.volume = true; //Свитчер звука\r\n        this.lastVolume = 0.9; //Предыдущее значение громкости\r\n        this.trackImage = document.getElementById('cover_image'); //Изображение трека\r\n        this.currentCount = document.getElementById('current_number'); //Текущий номер трека\r\n        this.totalCount = document.getElementById('total_number'); //Общее количество треков\r\n        this.index = 0; //Текущий индекс трека\r\n        this.playingTrack = false; //Свитчер воспроизведения трека\r\n        this.currentTime = document.getElementById('current_time'); //Текущее время воспроизведения\r\n        this.totalTime = document.getElementById('total_time'); //Общее время трека\r\n        this.timer = null; //Таймер\r\n        this.durationHover = false;\r\n        this.allTracks = [\r\n            {\r\n                name: 'Уходи',\r\n                autor: 'Anacondaz',\r\n                path: 'dist/assets/music/1.mp3',\r\n                img: 'dist/assets/img/cover_1.png'\r\n            },\r\n            {\r\n                name: 'Дождь',\r\n                autor: 'Anacondaz',\r\n                path: 'dist/assets/music/2.mp3',\r\n                img: 'dist/assets/img/cover_2.jpg'\r\n            },\r\n            {\r\n                name: 'Выпуской',\r\n                autor: 'Anacondaz',\r\n                path: 'dist/assets/music/3.mp3',\r\n                img: 'dist/assets/img/cover_1.png'\r\n            },\r\n        ]; //Массив треков\r\n    };\r\n\r\n    /**\r\n     * Совершает базовые действия при загрузке страницы\r\n     */\r\n    initBaseActions () {\r\n        this.track = document.createElement('audio');\r\n        this.volumeSlider.value = this.lastVolume * 100;\r\n        this.track.volume = this.volumeSlider.value / 100;\r\n        this.totalCount.innerHTML = this.allTracks.length;\r\n    }\r\n\r\n    /**\r\n     * Устанавливает обработчики событий\r\n     */\r\n    addEventListeners () {\r\n        this.play.addEventListener('click', () => {\r\n            this.playToggle();\r\n        });\r\n        document.addEventListener('keydown', e => {\r\n            if (e.code == 'Space') this.playToggle();\r\n        });\r\n        this.next.addEventListener('click', () => {\r\n            this.nextTrack();\r\n        });\r\n        this.previous.addEventListener('click', () => {\r\n            this.prevTrack();\r\n        });\r\n        this.volumeSlider.addEventListener('input', () => {\r\n            this.changeVolume();\r\n        });\r\n        this.volumeButton.addEventListener('click', () => {\r\n            this.toggleVolume();\r\n        });\r\n        this.durationSlider.addEventListener('change', () => {\r\n            this.changeDuration();\r\n        });\r\n        this.durationSlider.addEventListener('mouseenter', () => {\r\n            this.durationHover = true;\r\n        });\r\n        this.durationSlider.addEventListener('mouseleave', () => {\r\n            this.durationHover = false;\r\n        });\r\n    };\r\n\r\n    /**\r\n     * Загружает и устанавливет информацию о треке\r\n     * @param {*} index\r\n     */\r\n    loadTrack (index) {\r\n        let selectTrack = this.allTracks[index];\r\n        this.track.src = selectTrack.path;\r\n        this.title.innerHTML = selectTrack.name;\r\n        this.autor.innerHTML = selectTrack.autor;\r\n        this.trackImage.style.backgroundImage = `url(${selectTrack.img})`;\r\n        this.track.load();\r\n\r\n        this.track.addEventListener('loadeddata', () => {\r\n            this.durationSlider.value = 0;\r\n            this.setIntervalTrack();\r\n            this.setTotalTime();\r\n        });\r\n\r\n        this.currentCount.innerHTML = index + 1;\r\n        document.title = `${selectTrack.autor} - ${selectTrack.name}`;\r\n    };\r\n\r\n    /**\r\n     * Устанаваливет периодичный вызов метода обновления таймера\r\n     */\r\n    setIntervalTrack () {\r\n        this.timer = setInterval(() => {\r\n            this.rangeDurationSlider();\r\n        }, 1000);\r\n    };\r\n\r\n    /**\r\n     * Вызывает метод проигрывания или паузы\r\n     */\r\n    playToggle () {\r\n        if (this.playingTrack) \r\n            this.pauseTrack();\r\n        else\r\n            this.playTrack();\r\n    };\r\n\r\n    /**\r\n     * Вызывает воспроизведение трека\r\n     */\r\n    playTrack () {\r\n        this.track.play();\r\n        this.playingTrack = true;\r\n        this.play.innerHTML = '<i class=\"fas fa-pause\"></i>';\r\n        this.setIntervalTrack();\r\n    };\r\n\r\n    /**\r\n     * Ставит трек на паузу\r\n     */\r\n    pauseTrack () {\r\n        this.track.pause();\r\n        this.playingTrack = false;\r\n        this.play.innerHTML = '<i class=\"fas fa-play\"></i>';\r\n        clearInterval(this.timer);\r\n    };\r\n\r\n    /**\r\n     * Вызывает следующий трек\r\n     */\r\n    nextTrack () {\r\n        if (this.index < this.allTracks.length - 1) {\r\n            this.index += 1;\r\n            this.loadTrack(this.index);\r\n            this.playTrack();\r\n        } else {\r\n            this.index = 0;\r\n            this.loadTrack(this.index);\r\n            this.playTrack();\r\n        }\r\n    };\r\n\r\n    /**\r\n     * Вызывает предыдущий трек\r\n     */\r\n    prevTrack () {\r\n        if (this.index > 0) {\r\n            this.index -= 1;\r\n            this.loadTrack(this.index);\r\n            this.playTrack();\r\n        } else {\r\n            this.index = this.allTracks.length - 1;\r\n            this.loadTrack(this.index);\r\n            this.playTrack();\r\n        }\r\n    };\r\n\r\n    /**\r\n     * Событие при изменении громкости\r\n     */\r\n    changeVolume () {\r\n        this.track.volume = this.volumeSlider.value / 100;\r\n        if (+this.track.volume === 0) {\r\n            this.volume = false;\r\n            this.volumeButton.innerHTML = '<i class=\"fas fa-volume-mute\"></i>';\r\n            this.volumeButton.classList.add('mute');\r\n        } else {\r\n            this.volume = true;\r\n            this.volumeButton.innerHTML = '<i class=\"fas fa-volume-up\"></i>';\r\n            this.volumeButton.classList.remove('mute');\r\n        }\r\n    };\r\n\r\n    /**\r\n     * Событие при изменении прогрессбара таймера\r\n     */\r\n    changeDuration () {\r\n        let durationPosition = this.track.duration * (this.durationSlider.value / 100);\r\n        this.track.currentTime = durationPosition;\r\n        this.setCurrentTime();\r\n    };\r\n\r\n    /**\r\n     * Изменяет прогресс таймер\r\n     */\r\n    rangeDurationSlider () {\r\n        this.setCurrentTime();\r\n        if (!this.durationHover) {\r\n            if (!isNaN(this.track.duration)) {\r\n                this.durationSlider.value = this.track.currentTime * (100 / this.track.duration);\r\n            }\r\n        }\r\n        if (this.track.ended) {\r\n            this.nextTrack();\r\n        }\r\n    };\r\n\r\n    /**\r\n     * Устанавливает текущий тайминг проигрывания трека\r\n     */\r\n    setCurrentTime () {\r\n        let minutes = parseInt(this.track.currentTime / 60);\r\n        let seconds = parseInt(this.track.currentTime % 60);\r\n        this.currentTime.innerHTML = this.getNormalTime(minutes, seconds);\r\n    };\r\n    \r\n    /**\r\n     * Устанавливает общее время трека\r\n     */\r\n    setTotalTime () {\r\n        let minutes = parseInt(this.track.duration / 60);\r\n        let seconds = parseInt(this.track.duration % 60);\r\n        this.totalTime.innerHTML = this.getNormalTime(minutes, seconds);\r\n    };\r\n\r\n    /**\r\n     * Возвращает время в нормально виде\r\n     * @param {*} minutes \r\n     * @param {*} seconds \r\n     * @returns время в виде 00:00\r\n     */\r\n    getNormalTime (minutes, seconds) {\r\n        if (+minutes < 10) minutes = `0${minutes}`;\r\n        if (+seconds < 10) seconds = `0${seconds}`;\r\n        return `${minutes}:${seconds}`;\r\n    };\r\n\r\n    /**\r\n     * Событие при изменени режима громкости (вкл/выкл)\r\n     */\r\n    toggleVolume () {\r\n        if (this.volume)\r\n            this.turnOffVolume();\r\n        else \r\n            this.turnOnVolume();\r\n        \r\n    };\r\n\r\n    /**\r\n     * Включает громкость проигрывания\r\n     */\r\n    turnOnVolume () {\r\n        this.track.volume = this.lastVolume;\r\n        this.volumeSlider.value = this.track.volume * 100;\r\n        this.volume = true;\r\n        this.volumeButton.innerHTML = '<i class=\"fas fa-volume-up\"></i>';\r\n        this.volumeButton.classList.remove('mute');\r\n    }\r\n\r\n    /**\r\n     * Выключает громкость проигрывания\r\n     */\r\n    turnOffVolume () {\r\n        this.lastVolume = this.track.volume;\r\n        this.track.volume = 0;\r\n        this.volumeSlider.value = 0;\r\n        this.volume = false;\r\n        this.volumeButton.innerHTML = '<i class=\"fas fa-volume-mute\"></i>';\r\n        this.volumeButton.classList.add('mute');\r\n    }\r\n}\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n    let webPlayerInit = new webPlayer();\r\n});\n\n//# sourceURL=webpack://wep-player/./src/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;