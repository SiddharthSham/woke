import {
    lerp
} from './mathUtils';

const bounds = () => {
    return {
        vw: window.innerWidth,
        vh: window.innerHeight
    }
}

export class Scroller {
    constructor() {
        // select elements
        this.scrollContent = document.getElementById('scroll-content')
        this.scrollWrapper = document.getElementById('scroll-wrapper')
        this.body = document.body

        // init values
        this.curScroll = 0, this.targetScroll = 0

        // setup events
        this.listeners()
        this.style()
        this.dragger()
        this.resize()
    }

    // style elements
    style() {
        this.scrollContent.style = `height: 100%;
                                    padding: 0 12.5vw 0 25vw;
                                    min-width: 200vw;
                                    will-change: transform;`
        this.scrollWrapper.style = `position: fixed;`
    }

    // add event listener
    listeners() {
        window.addEventListener('scroll', event => {
            this.curScroll = document.documentElement.scrollTop
            this.shouldAnimate = true
        }, {
            passive: true
        })
        window.addEventListener('resize', () => {
            this.resize()
        }, {
            passive: true
        })
    }

    // handle resize
    resize() {
        this.dim = bounds()
        this.scrollWidth = this.scrollContent.scrollWidth
        this.body.style.height = `${this.scrollWidth - (this.dim.vw - this.dim.vh)}px`;
    }

    // extend with dragging
    // NOTE: This logic is incomplete/buggy
    dragger () {
        let initPos;
        let isDragging = false
        const slider = document.getElementById('slider')

        slider.addEventListener('mousedown', e => {
            initPos = e.clientX
            isDragging = true
        })
        slider.addEventListener('mousemove', e => {
            e.preventDefault()
            if (!isDragging) return
            document.documentElement.scrollTop += (3 * (initPos - e.clientX))
        })
        slider.addEventListener('mouseup', e => {
            isDragging = false
        })
    }

    // check if the current animations is complete
    animComplete() {
        return Math.round(this.curScroll) == Math.round(this.targetScroll)
    }

    // check if animation is ticking
    get isTicking() {
        return this.shouldAnimate || !this.animComplete()
    }

    // progress animation by one step
    // meant to be used with an external rAF loop
    update() {
        if (!this.shouldAnimate && this.animComplete()) return

        this.targetScroll = Math.max(lerp(this.targetScroll, this.curScroll, 0.1), 0.0001)
        this.scrollContent.style.transform = `translateX(${-1*this.targetScroll}px)`;

        this.shouldAnimate = false
    }
}