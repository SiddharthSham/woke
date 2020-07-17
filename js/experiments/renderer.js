// does not work, use Frame instead

export class Renderer {
    constructor(targetFramerate) {
        this.raf = window.requestAnimationFrame
        this.lastFrameTime = 0
        this.targetFramerate = 1000/targetFramerate
    }

    schedule(elapsedTime) {
        this.delta = elapsedTime - (this.lastFrameTime || 0);
        this.currentFrame = window.requestAnimationFrame(this.schedule.bind(this))
        if (this.lastFrameTime && this.delta < this.targetFramerate) return
        this.lastFrameTime = this.elapsedTime;

        this.render()
    }

    render(fn, args) {
        this.schedule()
        fn.apply(null, args)
    }
}

