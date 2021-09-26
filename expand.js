export default class Drag {
    constructor(containerElement, handler, config = {}) {
        if (containerElement instanceof HTMLElement &&
            handler instanceof HTMLElement) {
            this.containerElement = containerElement
            this.handler = handler
            this.config = { ...config, max: config.max ?? 500, min: config.min ?? 0 }
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
        this.containerElement.setAttribute("style", `height: ${newHeight + 'px'}`)

        this.handler.addEventListener("touchend", () => this.#touchEndEventHandler(newHeight))
    }
    #touchEndEventHandler(newHeight) {
        if (newHeight >= (0.75 * this.config.max)) {
            this.containerElement.setAttribute("style", `height: ${this.config.max + 'px'}`)
        }

        if (newHeight <= (0.50 * this.config.max)) {
            this.containerElement.setAttribute("style", `height: ${this.config.min + 'px'}`)
        }

        if (newHeight <= (0.25 * this.config.max)) {
            this.containerElement.setAttribute("style", `height: ${0 + 'px'}`)
        }
    }
}