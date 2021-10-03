export default class Drag {
    /**
     * 
     * @param {HTMLElement} containerElement 
     * @param {HTMLElement} handler 
     * @param {Object} config 
     * 
     * **NB**: The `config` argument controls the way your drag instance
     * behaves. It takes a couple of properties like,
     * ```js
     * // Add animation when you release touch
     * animationClass: String
     * // The maximum pixel value your container can clip to when touch released  
     * max: Number 
     * // The minimum pixel value your container can clip to when touch released 
     * min: Number 
     * // A number between [0 - 1] that is used to decide when your container should be clipped. Either to the `max` or `min` value
     * midPoint: Number 
     * ``` 
     * 
     */
    constructor(containerElement, handler, config = {}) {
        if (containerElement instanceof HTMLElement &&
            handler instanceof HTMLElement) {
            this.containerElement = containerElement
            this.handler = handler
            this.config = { 
                ...config, 
                max: config.max ?? this.containerElement.offsetHeight, 
                min: config.min ?? 0,
                midPoint: config.midPoint ?? .5,
                animationClass: config.animationClass ?? ""
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
        if (newHeight > this.config.max) newHeight = this.config.max
        // Remove animation class
        this.config.animationClass.length && this.containerElement.classList.remove(this.config.animationClass)
        // Stream height
        this.containerElement.setAttribute("style", `height: ${newHeight + 'px'}`)

        this.handler.addEventListener("touchend", () => this.#touchEndEventHandler(newHeight))
    }
    #touchEndEventHandler(newHeight) {
        let midPoint = this.config.midPoint * this.config.max
        // Add animation class
        this.config.animationClass.length && this.containerElement.classList.add(this.config.animationClass)
        // Set final height of container
        newHeight >= midPoint 
            ? this.containerElement.setAttribute("style", `height: ${this.config.max + 'px'}`)
            : this.containerElement.setAttribute("style", `height: ${this.config.min + 'px'}`)
    }
}