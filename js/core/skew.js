import {
    map
} from './mathUtils'

export class Skew {
    constructor() {
        this.skew = 0
        this.cards = document.querySelectorAll('.card')
    }

    update(s) {
        this.skew = map(s.curScroll - s.targetScroll, 0, s.scrollWidth, 0, 30)
        this.cards.forEach(card => {
            card.style.transform = `skewX(${this.skew}deg)`
        })
    }
}