export class Keyboard {
    constructor(elements, props) {
        this.main = elements.main
        this.container = elements.container
        this.row = elements.row
    }

    init() {
        const wrapper = document.querySelector(".wrapper")
        this.main.appendChild(this.container)
        wrapper.appendChild(this.main)
    }

    createKeys(keysObject) {
        const fragment = document.createDocumentFragment()

        for (let key in keysObject) {
            const keyEl = document.createElement("div")
            keyEl.classList.add("keyboard__key", "key", `${key}`)

            const createArrow = () => {
                keyEl.classList.add(key);
                const classArrow = key.toLowerCase().slice(0, 5) + '-' + key.toLowerCase().slice(5)
                keyEl.innerHTML = `<i class="fa-solid fa-${classArrow}"></i>`;
            };
            if (key === "ArrowUp" || key === "ArrowDown" || key === "ArrowLeft" || key === "ArrowRight") {
                createArrow()
            } else if (key === "Space") {
                keyEl.classList.add("space")
            } else {
                keyEl.innerHTML = keysObject[key]
            }
            const insertNewRow = ["Backspace", "Backslash", "Enter", "ShiftRight", "ArrowRight"].indexOf(
                key
            ) !== -1;

            fragment.appendChild(keyEl);
            if (insertNewRow) {
                const newRow = document.createElement("div");
                newRow.classList.add("keyboard__row", "row");
                this.container.appendChild(newRow);
                newRow.appendChild(fragment);
            }

        }
    }
}

export class Key {
    constructor (key, value) {
        this.key = key 
        this.value = value
    }
}
