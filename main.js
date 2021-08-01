document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    class SimplePiano {
        constructor(classContainer, varientsBtns) {
            this.piano = document.querySelector(classContainer);
            this.pianoBtns = this.piano.querySelectorAll('.piano__btn');
            this.varientsBtns = document.querySelector(varientsBtns);
            this.fullScreenBtn = document.getElementById('full__screen');
            this.audio = '';
            this.btnsSounds = {
                'KeyD': 'c',
                'KeyR': 'c♯',
                'KeyF': 'd',
                'KeyT': 'd♯',
                'KeyG': 'e',
                'KeyH': 'f',
                'KeyU': 'f♯',
                'KeyJ': 'g',
                'KeyI': 'g♯',
                'KeyK': 'a',
                'KeyO': 'a♯',
                'KeyL': 'b',
            }

            this.init = this.init.bind(this);
            this._listenerVarientsTextBtns = this._listenerVarientsTextBtns.bind(this);
            this._listenerPianoBtns = this._listenerPianoBtns.bind(this);
            this._listenerKeyPress = this._listenerKeyPress.bind(this);
            this._listenerFullScreenBtn = this._listenerFullScreenBtn.bind(this);
            this._playSound = this._playSound.bind(this);
            this._fullscreenChange = this._fullscreenChange.bind(this);
            this._fullscreenEnter = this._fullscreenEnter.bind(this);
            this._fullscreenExit = this._fullscreenExit.bind(this);
            this._exitFullscreen = this._exitFullscreen.bind(this);
        }

        // init simple slider
        init() {
            this._listenerVarientsTextBtns();
            this._listenerPianoBtns();
            this._listenerKeyPress();
            this._listenerFullScreenBtn();
        }

        // listener for varients btns
        _listenerVarientsTextBtns() {
            this.varientsBtns.addEventListener('click', (e) => {
                let target = e.target;

                if (target.classList.contains('btn__active')) return;

                if (target.classList.contains('btn')) {
                    this.varientsBtns.querySelector('.btn__active').classList.remove('btn__active');
                    target.classList.add('btn__active');

                    if (target.classList.contains('btn__notes')) {
                        this.piano.classList.add('active__notes');
                    } else {
                        this.piano.classList.remove('active__notes');
                    }
                }
            })
        }

        // listener for piano btns
        _listenerPianoBtns() {
            this.piano.addEventListener('click', (e) => {
                let target = e.target;

                if (target.classList.contains('piano__btn')) this._playSound(target.dataset.note);
            })
        }

        // listener for key press
        _listenerKeyPress() {
            document.addEventListener('keydown', (e) => {
                if (this.btnsSounds[e.code]) {
                    this.pianoBtns.forEach(element => {
                        if (element.dataset.note === this.btnsSounds[e.code]) {
                            element.classList.add('active__btn')

                            setTimeout(() => {
                                element.classList.remove('active__btn')
                            }, 300);
                        }
                    });

                    this._playSound(this.btnsSounds[e.code])
                };

            })
        }

        // listener for btn full screen
        _listenerFullScreenBtn() {
            this.fullScreenBtn.addEventListener('click', this._fullscreenChange);

            document.addEventListener('webkitfullscreenchange', this._exitFullscreen);
            document.addEventListener('mozfullscreenchange', this._exitFullscreen);
            document.addEventListener('MSFullscreenChange', this._exitFullscreen);
            document.addEventListener('fullscreenchange', this._exitFullscreen);
        }

        // change fullscreen page
        _fullscreenChange() {
            const fullscreenElement = document.fullscreenElement
                || document.mozFullscreenElement
                || document.webkitFullscreenElement;

            fullscreenElement === null
                ? this._fullscreenEnter()
                : this._fullscreenExit();
        }

        // for esc btn
        _exitFullscreen() {
            if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.mozFullscreenElement) {
                this._fullscreenExit();
            }
        }

        // enter in fullscreen
        _fullscreenEnter() {
            if (document.body.requestFullScreen) document.body.requestFullScreen();
            else if (document.body.mozRequestFullScreen) document.body.mozRequestFullScreen();
            else if (document.body.webkitRequestFullScreen) document.body.webkitRequestFullScreen();

            this.fullScreenBtn.classList.add('active__rull__screen');
        }

        // exit from fullscreen
        _fullscreenExit() {
            if (document.cancelFullScreen) document.cancelFullScreen();
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();

            this.fullScreenBtn.classList.remove('active__rull__screen');
        }

        // play music
        _playSound(soundName) {
            const audio = new Audio(`/audio/${soundName}.mp3`);
            audio.play();

            audio.addEventListener('ended', function () {
                audio.remove();
            });
        }
    }

    const slider = new SimplePiano('.piano', '.varients__wrap');
    slider.init();
})
