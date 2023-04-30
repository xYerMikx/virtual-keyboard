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

let isCapsLock = false

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
    const fragment = document.createDocumentFragment()
    allKeysLower.forEach(key => {
        const keyElement = document.createElement("div")
        const insertNewRow = ['delete', 'backslash', 'return', 'right-shift'].indexOf(key) !== -1
        const textareaValue = document.querySelector(".keyboard-textarea").value

        keyElement.classList.add("keyboard__key", "key")
        switch (key) {
            case "delete":
              keyElement.addEventListener('click', () => {
                textareaValue = textareaValue.substring(0, textareaValue.length - 1)
              })
    
              break;
            
            case "caps":
              keyElement.addEventListener('click', () => {
                toggleCapsLock()
                keyElement.classList.toggle("active", isCapsLock)
              })
    
              break;
            case "return":
              keyElement.addEventListener('click', () => {
                textareaValue += "\n"
    
              })
    
              break;
    
            case "space":
              keyElement.addEventListener('click', () => {
                textareaValue += " "
              })
    
              break;
    
            default:
              keyElement.textContent = key.toLowerCase()
    
              keyElement.addEventListener('click', () => {
                textareaValue += isCapsLock ? key.toUpperCase() : key.toLowerCase()
              })
    
              break;
          }
    })

}
createKeys()

const toggleCapsLock = () => {
    console.log('caps toggled')
}