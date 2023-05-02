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
const isCapsLock = false;
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
keyboard.createKeys(allKeysLowerEn);
focusOnTextarea();

const setLocalStorage = () => {
  localStorage.setItem('lang', lang);
};

document.addEventListener('keydown', (e) => {
  const clickedKey = document.querySelector(`.${e.code}`);

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
    if (e.code === 'Backspace') {
      textarea.textContent.slice(0, -1);
      // textarea.textContent += clickedKey.textContent
    } else if (e.code === 'ArrowLeft') {
      textarea.textContent += '◄';
    } else if (e.code === 'ArrowRight') {
      textarea.textContent += '►';
    } else if (e.code === 'ArrowUp') {
      textarea.textContent += '▲';
    } else if (e.code === 'ArrowDown') {
      textarea.textContent += '▼';
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

wrapper.addEventListener('mousedown', (e) => {
  const clickedKey = document.querySelector(`.${e.target.classList}`);
  if (clickedKey) {
    clickedKey.classList.add('active');
  }
});

wrapper.addEventListener('mouseup', (e) => {
  const clickedKey = document.querySelector(`.${e.code}`);

  if (clickedKey) {
    clickedKey.classList.remove('active');
  }
});
window.addEventListener('beforeunload', setLocalStorage);
