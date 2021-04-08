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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/main.scss */ \"./src/scss/main.scss\");\n\r\n\r\nclass webPlayer {\r\n    constructor () {\r\n        //vars\r\n        this.previous = null;\r\n        this.next = null;\r\n        this.play = null;\r\n        this.title = null;\r\n        this.autor = null;\r\n        this.durationSlider = null;\r\n        this.volumeSlider = null;\r\n        this.trackImage = null;\r\n        this.currentCount = null;\r\n        this.totalCount = null;\r\n        this.timer = null;\r\n        this.index = null;\r\n        this.playingTrack = null;\r\n        this.allTracks = null;\r\n\r\n        this.initVaribales();\r\n        this.loadTrack(this.index);\r\n        this.addEventListeners();\r\n    };\r\n\r\n    initVaribales () {\r\n        this.previous = document.getElementById('prev');\r\n        this.next = document.getElementById('next');\r\n        this.play = document.getElementById('play');\r\n        this.title = document.getElementById('title');\r\n        this.autor = document.getElementById('autor');\r\n        this.durationSlider = document.getElementById('duration_slider');\r\n        this.volumeSlider = document.getElementById('volume_slider');\r\n        this.trackImage = document.getElementById('cover_image');\r\n        this.currentCount = document.getElementById('current_number');\r\n        this.totalCount = document.getElementById('total_number');\r\n        this.index = 0;\r\n        this.playingTrack = false;\r\n        this.allTracks = [\r\n            {\r\n                name: 'Уходи',\r\n                autor: 'Anacondaz',\r\n                path: 'dist/assets/music/1.mp3',\r\n                img: 'dist/assets/img/cover_1.png'\r\n            },\r\n            {\r\n                name: 'Дождь',\r\n                autor: 'Anacondaz',\r\n                path: 'dist/assets/music/2.mp3',\r\n                img: 'dist/assets/img/cover_2.jpg'\r\n            },\r\n            {\r\n                name: 'Выпуской',\r\n                autor: 'Anacondaz',\r\n                path: 'dist/assets/music/3.mp3',\r\n                img: 'dist/assets/img/cover_1.png'\r\n            },\r\n        ];\r\n\r\n        this.track = document.createElement('audio');\r\n        this.track.volume = this.volumeSlider.value / 100;\r\n        this.totalCount.innerHTML = this.allTracks.length;\r\n    };\r\n\r\n    addEventListeners () {\r\n        this.play.addEventListener('click', () => {\r\n            this.playToggle();\r\n        });\r\n        this.next.addEventListener('click', () => {\r\n            this.nextTrack();\r\n        });\r\n        this.previous.addEventListener('click', () => {\r\n            this.prevTrack();\r\n        });\r\n        this.volumeSlider.addEventListener('input', () => {\r\n            this.changeVolume();\r\n        });\r\n        this.durationSlider.addEventListener('change', () => {\r\n            this.changeDuration();\r\n        });\r\n    };\r\n\r\n    loadTrack (index) {\r\n        let selectTrack = this.allTracks[index];\r\n        this.track.src = selectTrack.path;\r\n        this.title.innerHTML = selectTrack.name;\r\n        this.autor.innerHTML = selectTrack.autor;\r\n        this.trackImage.style.backgroundImage = `url(${selectTrack.img})`;\r\n        this.track.load();\r\n\r\n        this.currentCount.innerHTML = index + 1;\r\n\r\n        // setTimeout(() => {\r\n        //     document.getElementById('from').innerHTML = `${parseInt(this.track.duration / 60)}:${parseInt(this.track.duration % 60)}`;\r\n        // }, 200);\r\n        this.durationSlider.value = 0;\r\n        this.timer = setInterval(() => {\r\n            this.rangeDurationSlider();\r\n        }, 1000);\r\n    };\r\n\r\n    playToggle () {\r\n        if (this.playingTrack) \r\n            this.pauseTrack();\r\n        else\r\n            this.playTrack();\r\n    };\r\n\r\n    playTrack () {\r\n        this.track.play();\r\n        this.playingTrack = true;\r\n        this.play.innerHTML = '<i class=\"fas fa-pause\"></i>';\r\n    };\r\n\r\n    pauseTrack () {\r\n        this.track.pause();\r\n        this.playingTrack = false;\r\n        this.play.innerHTML = '<i class=\"fas fa-play\"></i>';\r\n    };\r\n\r\n    nextTrack () {\r\n        if (this.index < this.allTracks.length - 1) {\r\n            this.index += 1;\r\n            this.loadTrack(this.index);\r\n            this.playTrack();\r\n        } else {\r\n            this.index = 0;\r\n            this.loadTrack(this.index);\r\n            this.playTrack();\r\n        }\r\n    };\r\n\r\n    prevTrack () {\r\n        if (this.index > 0) {\r\n            this.index -= 1;\r\n            this.loadTrack(this.index);\r\n            this.playTrack();\r\n        } else {\r\n            this.index = this.allTracks.length - 1;\r\n            this.loadTrack(this.index);\r\n            this.playTrack();\r\n        }\r\n    };\r\n\r\n    changeVolume () {\r\n        this.track.volume = this.volumeSlider.value / 100;\r\n    };\r\n\r\n    changeDuration () {\r\n        let durationPosition = this.track.duration * (this.durationSlider.value / 100);\r\n        this.track.currentTime = durationPosition;\r\n    };\r\n\r\n    rangeDurationSlider () {\r\n        if (!isNaN(this.track.duration)) {\r\n            this.durationSlider.value = this.track.currentTime * (100 / this.track.duration);\r\n        }\r\n        if (this.track.ended) {\r\n            this.nextTrack();\r\n        }\r\n    };\r\n}\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n    let webPlayerInit = new webPlayer();\r\n});\n\n//# sourceURL=webpack://wep-player/./src/app.js?");

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