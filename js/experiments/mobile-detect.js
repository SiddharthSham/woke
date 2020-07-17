export const detect = bounds => {
    const config = {
        touch: true,
        mobile: true,
        tablet: false,
        desktop: false
    }
    const {
        vw,
        vh
    } = bounds || {
        vw: window.innerWidth,
        vh: window.innerHeight
    }

    if (vh < vw) {
        config.desktop = true
        config.mobile = false
        config.tablet = false

        config.touch = ('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0);
    } else {
        config.mobile = vw < 769
        config.tablet = !config.mobile
    }

    return config
}