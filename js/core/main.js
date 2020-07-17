import {
    map
} from './mathUtils';
import {
    Cursor
} from './cursor'
import {
    Scroller
} from './scroller';
import {
    Skew
} from './skew';

window.onload = () => {
    init()
}

// init events
const init = () => {

    // instantiate effects
    const cursor = new Cursor()
    const s = new Scroller()
    const skew = new Skew()
    const titles = document.querySelectorAll('.titles')

    // core rAF ticker thread
    let lastFrameTime = 0;
    const render = elapsedTime => {

        // framerate control
        let delta = elapsedTime - (lastFrameTime || 0);
        window.requestAnimationFrame(render)
        if (lastFrameTime && (delta < 16)) return
        lastFrameTime = elapsedTime;

        // perform updates
        s.update()
        cursor.update()
        skew.update(s)

        // extra effect synced with scroller
        if (s.isTicking) {
            titles.forEach(title => {
                title.style.transform = `translateY(-${map(s.targetScroll, 0, s.scrollWidth, 0, title.scrollHeight)}px)`
            })
        }
    }
    window.requestAnimationFrame(render)
}