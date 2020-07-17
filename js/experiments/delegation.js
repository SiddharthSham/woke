export class Delegate {

    constructor() {
        this.tasks = {}
    }

    add(eventName) {
        document.addEventListener(eventName, e => {
            this.tasks[eventName].forEach(task => {
                if(e.target.matches(task.selector)) {
                    task.callback.apply(null, task.args)
                    return
                }
            })
        })
    }

    listen(eventName, selector, callback, args) {
        if(!this.tasks[eventName]) {
            this.tasks[eventName] = []
            this.add(eventName)
        }
        this.tasks[eventName].push({
            selector: selector,
            callback: callback,
            args: args
        })
    }

}