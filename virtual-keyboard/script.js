import {
  allKeysLowerEn,
  allKeysShiftEn,
  allKeysLowerRu,
  allKeysShiftRu,
} from './KeysObjects.js';
import { Keyboard } from './Keyboard.js';

const body = document.querySelector('.page');
const wrapper = document.createElement('div');

body.prepend(wrapper);
wrapper.classList.add('wrapper');
wrapper.insertAdjacentHTML(
  'afterbegin',
  ` <header class="header">
<h1 class="header__title">RSS Виртуальная клавиатура</h1>
</header>
<textarea class="keyboard-textarea" id="keyboard-area" cols="5" rows="8"></textarea>`,
);
wrapper.insertAdjacentHTML('afterend', '<p class="description">This virtual keyboard was made using MacOS. To switch languages use LeftOption (LeftAlt) + LeftShift</p>');

const textarea = document.querySelector('.keyboard-textarea');
let isCapsLock = false;
let lang = localStorage.getItem('lang') || 'en';

const focusOnTextarea = () => {
  textarea.focus();
};
// keyboard init

const main = document.createElement('section');
const container = document.createElement('div');
const row = document.createElement('div');
const keyElement = document.createElement('div');

main.classList.add('keyboard');
container.classList.add('keyboard__container');
row.classList.add('keyboard__row', 'row');
keyElement.classList.add('keyboard__key', 'key');

const keyboard = new Keyboard({
  main,
  container,
  row,
});

keyboard.init();
if (localStorage.getItem("lang") === 'en') {
  keyboard.createKeys(allKeysLowerEn)
} else {
  keyboard.createKeys(allKeysLowerRu)
}
focusOnTextarea();
const allKeys = document.querySelectorAll(".key")

const setLocalStorage = () => {
  localStorage.setItem('lang', lang);
};

document.addEventListener('keydown', (e) => {
  const clickedKey = document.querySelector(`.${e.code}`);
  focusOnTextarea()
  if (clickedKey) {
    clickedKey.classList.add('active');
    if (e.shiftKey && e.altKey) {
      lang = lang === 'en' ? 'ru' : 'en';
      setLocalStorage();
      setTimeout(() => {
        if (lang === 'en') {
          const rows = document.querySelectorAll('.row');
          rows.forEach((row) => {
            row.remove();
          });
          keyboard.createKeys(allKeysLowerRu);
        } else if (lang === 'ru') {
          const rows = document.querySelectorAll('.row');
          rows.forEach((row) => {
            row.remove();
          });
          keyboard.createKeys(allKeysLowerEn);
        }
      }, 100);
    }
    if (e.code === "CapsLock") {
      allKeys.forEach(key => {
        if (key.textContent !== "backspace" &&
          key.textContent !== "tab" &&
          key.textContent !== "caps lock" &&
          key.textContent !== "return" &&
          key.textContent !== "shift" &&
          key.textContent !== "ctrl" &&
          key.textContent !== "cmd" &&
          key.textContent !== "alt") {
          if (!isCapsLock) {
            key.textContent = key.textContent.toUpperCase()
            isCapsLock == true
            return
          } else if (isCapsLock) {
            key.textContent = key.textContent.toLowerCase()
            isCapsLock == false
          }
        }
      })
    }
    if (e.code === 'Backspace') {
      textarea.textContent.slice(0, -1);
    } else if (e.code === 'ArrowLeft') {
      textarea.textContent += '◄';
    } else if (e.code === 'ArrowRight') {
      textarea.textContent += '►';
    } else if (e.code === 'ArrowUp') {
      textarea.textContent += '▲';
    } else if (e.code === 'ArrowDown') {
      textarea.textContent += '▼';
    } else if (e.code === "Tab") {
      e.preventDefault()
      textarea.textContent += "    "
    } else if (e.code === "ShiftLeft" ||
      e.code === "ShiftRight" ||
      e.code === "AltLeft" ||
      e.code === "MetaLeft" ||
      e.code === "AltRight" ||
      e.code === "MetaRight" ||
      e.code === "ControlLeft" ||
      e.code === "Enter" ||
      e.code === "CapsLock") {
      textarea.textContent += ""
    } else {
      textarea.textContent += clickedKey.textContent
    }
    if (e.key === 'Shift' && !isCapsLock) {
      setTimeout(() => {
        if (lang === 'en') {
          const rows = document.querySelectorAll('.row');
          rows.forEach((row) => {
            row.remove();
          });
          keyboard.createKeys(allKeysShiftEn);
        } else if (lang === 'ru') {
          const rows = document.querySelectorAll('.row');
          rows.forEach((row) => {
            row.remove();
          });
          keyboard.createKeys(allKeysShiftRu);
        }
      }, 100);
    } else if (e.key === 'Shift' && isCapsLock) {
      setTimeout(() => {
        if (lang === 'en') {
          const rows = document.querySelectorAll('.row');
          rows.forEach((row) => {
            row.remove();
          });
          keyboard.createKeys(allKeysLowerEn);
        } else if (lang === 'ru') {
          const rows = document.querySelectorAll('.row');
          rows.forEach((row) => {
            row.remove();
          });
          keyboard.createKeys(allKeysLowerRu);
        }
      }, 100);
    }
  }
});

document.addEventListener('keyup', (e) => {
  const clickedKey = document.querySelector(`.${e.code}`);

  if (clickedKey) {
    clickedKey.classList.remove('active');
    if (e.code === "CapsLock") {
      allKeys.forEach(key => {
        if (key.textContent !== "backspace" &&
          key.textContent !== "tab" &&
          key.textContent !== "caps lock" &&
          key.textContent !== "return" &&
          key.textContent !== "shift" &&
          key.textContent !== "ctrl" &&
          key.textContent !== "cmd" &&
          key.textContent !== "alt") {
          if (!isCapsLock) {
            key.textContent = key.textContent.toUpperCase()
            isCapsLock == true
            return
          } else if (isCapsLock) {
            key.textContent = key.textContent.toLowerCase()
            isCapsLock == false
          }
        }
      })
    }
    if (e.key === 'Shift' && !isCapsLock) {
      setTimeout(() => {
        if (lang === 'en') {
          const rows = document.querySelectorAll('.row');
          rows.forEach((row) => {
            row.remove();
          });
          keyboard.createKeys(allKeysLowerEn);
        } else if (lang === 'ru') {
          const rows = document.querySelectorAll('.row');
          rows.forEach((row) => {
            row.remove();
          });
          keyboard.createKeys(allKeysLowerRu);
        }
      }, 100);
    } else if (e.key === 'Shift' && isCapsLock) {
      setTimeout(() => {
        if (lang === 'en') {
          const rows = document.querySelectorAll('.row');
          rows.forEach((row) => {
            row.remove();
          });
          keyboard.createKeys(allKeysShiftEn);
        } else if (lang === 'ru') {
          const rows = document.querySelectorAll('.row');
          rows.forEach((row) => {
            row.remove();
          });
          keyboard.createKeys(allKeysShiftRu);
        }
      }, 100);
    }
  }
});

container.addEventListener('mousedown', (e) => {
  const clickedClassName = e.target.classList
  if (clickedClassName) {
    clickedClassName.add('active');
    if ((clickedClassName.contains("ShiftRight") ||
      clickedClassName.contains("ShiftLeft")) && !isCapsLock) {
      setTimeout(() => {
        if (lang === 'en') {
          const rows = document.querySelectorAll('.row');
          rows.forEach((row) => {
            row.remove();
          });
          keyboard.createKeys(allKeysShiftEn);
        } else if (lang === 'ru') {
          const rows = document.querySelectorAll('.row');
          rows.forEach((row) => {
            row.remove();
          });
          keyboard.createKeys(allKeysShiftRu);
        }
      }, 100);
    } else if ((clickedClassName.contains("ShiftRight") ||
      clickedClassName.contains("ShiftLeft")) && isCapsLock) {
      setTimeout(() => {
        if (lang === 'en') {
          const rows = document.querySelectorAll('.row');
          rows.forEach((row) => {
            row.remove();
          });
          keyboard.createKeys(allKeysLowerEn);
        } else if (lang === 'ru') {
          const rows = document.querySelectorAll('.row');
          rows.forEach((row) => {
            row.remove();
          });
          keyboard.createKeys(allKeysLowerRu);
        }
      }, 100);
    }
    if (clickedClassName.contains("Backspace")) {
      textarea.textContent = textarea.textContent.slice(0, -1);
    } else if (clickedClassName.contains('ArrowLeft')) {
      textarea.textContent += '◄';
    } else if (clickedClassName.contains('ArrowRight')) {
      textarea.textContent += '►';
    } else if (clickedClassName.contains('ArrowUp')) {
      textarea.textContent += '▲';
    } else if (clickedClassName.contains('ArrowDown')) {
      textarea.textContent += '▼';
    } else if (clickedClassName.contains("Tab")) {
      e.preventDefault()
      textarea.textContent += "    "
    } else if (clickedClassName.contains("MetaRight") ||
      clickedClassName.contains("AltRight") ||
      clickedClassName.contains("MetaLeft") ||
      clickedClassName.contains("ControlLeft") ||
      clickedClassName.contains("AltLeft") ||
      clickedClassName.contains("Enter") ||
      clickedClassName.contains("CapsLock") ||
      clickedClassName.contains("ShiftLeft") ||
      clickedClassName.contains("ShiftRight")) {
      textarea.textContent += ""
    } else if (clickedClassName.contains("keyboard__container") ||
      clickedClassName.contains("keyboard__row")) {
      textarea.textContent += ""
    } else {
      textarea.textContent += e.target.textContent
    }
  }
});

container.addEventListener('mouseup', (e) => {
  const clickedClassName = e.target.classList
  if (clickedClassName) {
    clickedClassName.remove('active');
    if ((clickedClassName.contains("ShiftRight") ||
    clickedClassName.contains("ShiftLeft")) && !isCapsLock) {
      setTimeout(() => {
        if (lang === 'en') {
          const rows = document.querySelectorAll('.row');
          rows.forEach((row) => {
            row.remove();
          });
          keyboard.createKeys(allKeysLowerEn);
        } else if (lang === 'ru') {
          const rows = document.querySelectorAll('.row');
          rows.forEach((row) => {
            row.remove();
          });
          keyboard.createKeys(allKeysLowerRu);
        }
      }, 100);
    } else if ((clickedClassName.contains("ShiftRight") ||
    clickedClassName.contains("ShiftLeft")) && isCapsLock) {
      setTimeout(() => {
        if (lang === 'en') {
          const rows = document.querySelectorAll('.row');
          rows.forEach((row) => {
            row.remove();
          });
          keyboard.createKeys(allKeysShiftEn);
        } else if (lang === 'ru') {
          const rows = document.querySelectorAll('.row');
          rows.forEach((row) => {
            row.remove();
          });
          keyboard.createKeys(allKeysShiftRu);
        }
      }, 100);
    }
  }
});
window.addEventListener('beforeunload', setLocalStorage);