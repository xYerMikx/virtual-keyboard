import { allKeysLower, allKeysLowerRu, allKeysUpper, allKeysUpperRu } from './KeysArrays.js'

const body = document.querySelector('.page')
const wrapper = document.createElement('div')
body.prepend(wrapper)
wrapper.classList.add('wrapper')
wrapper.insertAdjacentHTML(
  'afterbegin',
  ` <header class="header">
<h1 class="header__title">RSS Виртуальная клавиатура</h1>
</header>
<textarea class="keyboard-textarea" id="keyboard-area" cols="5" rows="10"></textarea>`,
)

const initKeyboard = () => {
    const keyboardSection = document.createElement("section")
    const container = document.createElement("div")
    const row = document.createElement("div")

    keyboardSection.classList.add("keyboard")
    container.classList.add("keyboard__container")
    row.classList.add("keyboard__row", "row")

    wrapper.appendChild(keyboardSection)
    keyboardSection.appendChild(container)
    container.appendChild(row)
}
initKeyboard()
const createKeys = () => {
    console.log(allKeysLower)
}
