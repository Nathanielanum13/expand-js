export default class Drag {
    constructor(containerElement, handler, config = {}) {
        if (containerElement instanceof HTMLElement &&
            handler instanceof HTMLElement) {
            this.containerElement = containerElement
            this.handler = handler
            this.config = { 
                ...config, 
                max: config.max ?? this.containerElement.offsetHeight, 
                min: config.min ?? 0,
                midPoint: config.midPoint ?? .5
            }
        } else {
            throw ("containerElement or handler should be of type HTMLElement")
        }
    }
    listen() {
        this.handler.addEventListener("touchmove", (e) => this.#touchMoveEventHandler(e))
    }
    #touchMoveEventHandler(touchEvent) {
        let heightToAdd = this.containerElement.offsetTop - touchEvent.touches[0].pageY
        let newHeight = this.containerElement.clientHeight + heightToAdd

        if (newHeight < 0) newHeight = 0 
        this.containerElement.setAttribute("style", `height: ${newHeight + 'px'}`)

        this.handler.addEventListener("touchend", () => this.#touchEndEventHandler(newHeight))
    }
    #touchEndEventHandler(newHeight) {
        let midPoint = this.config.midPoint * this.config.max
        newHeight >= midPoint 
            ? this.containerElement.setAttribute("style", `height: ${this.config.max + 'px'}`)
            : this.containerElement.setAttribute("style", `height: ${this.config.min + 'px'}`)
    }
}