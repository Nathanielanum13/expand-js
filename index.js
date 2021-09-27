import Drag from "./expand.js"

const containerElement = document.querySelector("#container-element")
const handler = document.querySelector("#handler")

new Drag(containerElement, handler).listen()