/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import * as helper from './helper.js';

class Keyboard {
  constructor() {
    this.lang = 'en';
  }

  createKeyboard() {
    const keyboardBlock = document.createElement('div');
    const keyboardDisplay = document.createElement('textarea');
    const keyboardKeys = document.createElement('div');

    keyboardBlock.classList.add('main-block');
    keyboardDisplay.classList.add('keyboard-display');
    keyboardKeys.classList.add('keyboard-keys');
    keyboardKeys.id = 'keyBoardKeys';
    keyboardDisplay.id = 'keyBoardDisplay';

    keyboardBlock.append(keyboardDisplay);
    keyboardBlock.append(keyboardKeys);
    document.body.append(keyboardBlock);

    this.board = keyboardKeys;
  }

  paintKeyboard(array) {
    this.board.innerHTML = '';
    array.forEach((element) => {
      this.createButton(element);
    });
  }

  createButton(array) {
    array.forEach((key) => {
      const btn = document.createElement('button');
      const div = document.getElementById('keyBoardKeys');
      btn.innerHTML = helper.insertAgreeValue(key);
      btn.style.width = `${key.size}px`;
      btn.setAttribute('name', `${key.keyCode}`);
      btn.setAttribute('id', `${key.code}`);
      btn.classList.add('key');
      div.append(btn);
    });
  }
}

export default Keyboard;
