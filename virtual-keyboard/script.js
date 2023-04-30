import {
    allKeysLower,
    allKeysLowerRu,
    allKeysUpper,
    allKeysUpperRu,
} from "./KeysArrays.js";

const body = document.querySelector(".page");
const wrapper = document.createElement("div");
body.prepend(wrapper);
wrapper.classList.add("wrapper");
wrapper.insertAdjacentHTML(
    "afterbegin",
    ` <header class="header">
<h1 class="header__title">RSS Виртуальная клавиатура</h1>
</header>
<textarea class="keyboard-textarea" id="keyboard-area" cols="5" rows="10"></textarea>`
);

let isCapsLock = false;

const initKeyboard = () => {
    const keyboardSection = document.createElement("section");
    const container = document.createElement("div");
    // const row = document.createElement("div")

    keyboardSection.classList.add("keyboard");
    container.classList.add("keyboard__container");
    // row.classList.add("keyboard__row", "row")

    wrapper.appendChild(keyboardSection);
    keyboardSection.appendChild(container);
    // container.appendChild(row)
};
initKeyboard();

const createKeys = () => {
    const fragment = document.createDocumentFragment();
    const container = document.querySelector(".keyboard__container");
    // const row = document.querySelector(".keyboard__row")

    allKeysLower.forEach((key) => {
        const keyElement = document.createElement("div");
        const insertNewRow =
            ["delete", "backslash", "return", "right-shift", "arrow-right"].indexOf(
                key
            ) !== -1;
        const createArrow = () => {
            keyElement.classList.add(key);
            keyElement.innerHTML = `<i class="fa-solid fa-${key}"></i>`;
        };
        let textareaValue = document.querySelector(".keyboard-textarea").value;

        keyElement.classList.add("keyboard__key", "key");
        switch (key) {
            case "delete":
                keyElement.textContent = "delete";
                keyElement.addEventListener("click", () => {
                    textareaValue = textareaValue.substring(0, textareaValue.length - 1);
                });

                break;

            case "caps":
                keyElement.textContent = "caps lock";
                keyElement.addEventListener("click", () => {
                    toggleCapsLock();
                    keyElement.classList.toggle("active", isCapsLock);
                });

                break;
            case "return":
                keyElement.textContent = "return";
                keyElement.addEventListener("click", () => {
                    textareaValue += "\n";
                });

                break;

            case "space":
                keyElement.classList.add("space");
                keyElement.addEventListener("click", () => {
                    textareaValue += " ";
                });

                break;

            case "left-alt":
                keyElement.textContent = "alt";

                break;

            case "backslash":
                keyElement.textContent = "\\";

                break;

            case "tab":
                keyElement.classList.add("tab")
                keyElement.textContent = key

                break;

            case "left-shift":
                keyElement.textContent = "shift";

                break;

            case "right-shift":
                keyElement.textContent = "shift";
                keyElement.classList.add("right-shift")
                break;

            case "right-alt":
                keyElement.textContent = "alt";

                break;

            case "left-cmd":
                keyElement.textContent = "cmd";

                break;

            case "right-cmd":
                keyElement.textContent = "cmd";

                break;

            case "arrow-right":
                createArrow(key);

                break;

            case "arrow-left":
                createArrow(key);

                break;

            case "arrow-up":
                createArrow(key);

                break;

            case "arrow-down":
                createArrow(key);

                break;

            default:
                keyElement.textContent = key.toLowerCase();

                keyElement.addEventListener("click", () => {
                    textareaValue += isCapsLock ? key.toUpperCase() : key.toLowerCase();
                });

                break;
        }
        fragment.appendChild(keyElement);

        if (insertNewRow) {
            const newRow = document.createElement("div");
            newRow.classList.add("keyboard__row", "row");
            container.appendChild(newRow);
            newRow.appendChild(fragment);
        }
    });
};
createKeys();

const toggleCapsLock = () => {
    console.log("caps toggled");
};
