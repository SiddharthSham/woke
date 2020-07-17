import {
    lerp
} from './mathUtils'

// TODO: Add anchor link hover listener

export class Cursor {

    constructor() {
        this.shouldAnimate = false
        this.mouseDown = false
        this.init = false
        this.crsr = document.getElementById('crsr')
        this.cursorPos = {
            x: 0,
            y: 0,
            r: 0.5
        }
        this.cursorTarget = {
            x: 0,
            y: 0,
            r: 0.5
        }
        this.style()
        this.listeners()
        this.update()
    }

    style() {
        this.crsr.style = `height: 64px;
                        width: 64px;
                        z-index: 9999;
                        background: white;
                        position: fixed;
                        border-radius: 50%;
                        opacity: 0;
                        transition: opacity 0.6s ease-in-out;
                        will-change: transform;
                        display: none;
                        pointer-events: none;`
    }

    listeners() {
        window.addEventListener('mousemove', move => {
            // subtract cursor width / 2
            this.cursorPos.x = move.clientX - 32
            this.cursorPos.y = move.clientY - 32
            this.shouldAnimate = true
            if (!this.init) {
                this.cursorTarget.x = move.clientX - 32
                this.cursorTarget.y = move.clientY - 32
                this.crsr.style.display = 'block'
                setTimeout(() => {
                    this.crsr.style.opacity = 1
                }, 100)
                this.init = true
            }
        }, {
            passive: true
        })
        window.addEventListener('mousedown', event => {
            this.shouldAnimate = true
            this.cursorPos.r = 1
            this.mouseDown = true
        })
        window.addEventListener('mouseup', event => {
            this.shouldAnimate = true
            this.cursorPos.r = 0.5
            setTimeout(() => {
                this.mouseDown = false
            }, 1000)
        })
    }

    animComplete() {
        return Math.round(this.cursorTarget.x) == this.cursorPos.x &&
               Math.round(this.cursorTarget.y) == this.cursorPos.y &&
               !this.mouseDown
    }

    get isTicking() {
        return this.shouldAnimate || !this.animComplete()
    }

    update() {
        if (!this.shouldAnimate && this.animComplete()) return

        this.cursorTarget.x = lerp(this.cursorTarget.x, this.cursorPos.x, 0.1)
        this.cursorTarget.y = lerp(this.cursorTarget.y, this.cursorPos.y, 0.1)
        this.cursorTarget.r = lerp(this.cursorTarget.r, this.cursorPos.r, 0.1)
        this.crsr.style.transform = `matrix(${this.cursorTarget.r}, 0, 0, ${this.cursorTarget.r}, ${this.cursorTarget.x}, ${this.cursorTarget.y})`

        this.shouldAnimate = false
    }

}