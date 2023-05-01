import {
    allKeysLowerEn,
    allKeysShiftEn,
    allKeysLowerRu,
    allKeysShiftRu,
} from "./KeysObjects.js";
import { Keyboard, Key } from "./Keyboard.js";

const body = document.querySelector(".page");
const wrapper = document.createElement("div");

body.prepend(wrapper);
wrapper.classList.add("wrapper");
wrapper.insertAdjacentHTML(
    "afterbegin",
    ` <header class="header">
<h1 class="header__title">RSS Виртуальная клавиатура</h1>
</header>
<textarea class="keyboard-textarea" id="keyboard-area" cols="5" rows="8"></textarea>`
);
wrapper.insertAdjacentHTML("afterend", `<p class="description">This virtual keyboard was made using MacOS. To switch languages use LeftOption (LeftAlt) + LeftShift</p>`)

const textarea = document.querySelector(".keyboard-textarea")
let isCapsLock = false,
    lang = "en";


const focusOnTextarea = () => {
    textarea.focus()
}
// keyboard init 

const main = document.createElement("section")
const container = document.createElement("div"),
    row = document.createElement("div"),
    keyElement = document.createElement("div")

main.classList.add("keyboard")
container.classList.add("keyboard__container")
row.classList.add("keyboard__row", "row")
keyElement.classList.add("keyboard__key", "key")



const keyboard = new Keyboard({
    main: main,
    container: container,
    row: row,
})

keyboard.init()
keyboard.createKeys(allKeysLowerEn)
const keysArr = document.querySelectorAll(".keyboard__key")
focusOnTextarea()

document.addEventListener("keydown", (e) => {
    const clickedKey = document.querySelector(`.${e.code}`)

    if (clickedKey) {
        clickedKey.classList.add("active")
        if (e.shiftKey && e.altKey) {
            if (lang === 'en') {
                const rows = document.querySelectorAll(".row")
                rows.forEach(row => {
                    row.remove()
                })
                keyboard.createKeys(allKeysLowerRu)
                lang = 'ru'
            } else {
                const rows = document.querySelectorAll(".row")
                rows.forEach(row => {
                    row.remove()
                })
                keyboard.createKeys(allKeysLowerEn)
                lang = 'en'
            }

        }
    }

})

document.addEventListener("keyup", (e) => {
    const clickedKey = document.querySelector(`.${e.code}`)

    if (clickedKey) {
        clickedKey.classList.remove("active")
    }
})

wrapper.addEventListener("mousedown", (e) => {
    const clickedKey = document.querySelector(`.${e.target.classList}`)
    if (clickedKey) {
        clickedKey.classList.add("active")
    }

})

wrapper.addEventListener("mouseup", (e) => {
    const clickedKey = document.querySelector(`.${e.code}`)

    if (clickedKey) {
        clickedKey.classList.remove("active")
    }
})

