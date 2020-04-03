/* eslint-disable import/extensions */

import { keysDataEn, keysDataRu } from './data.js';
import Keyboard from './modules/Keyboard.js';
import Helper from './modules/Helper.js';

window.onload = () => {
  const keyboard = new Keyboard();
  const helper = new Helper();

  keyboard.createKeyboard();

  const insertCurrentLanguage = (data) => {
    const { lang } = data;
    if (lang === 'en') {
      keyboard.paintKeyboard(keysDataEn);
      helper.pushDataInLocalStorage(keyboard.lang = 'en');
    }
    if (lang === 'ru') {
      keyboard.paintKeyboard(keysDataRu);
      helper.pushDataInLocalStorage(keyboard.lang = 'ru');
    }
  };

  const value = helper.loadDataFromLocalStorage();
  if (value) {
    insertCurrentLanguage(value);
  } else {
    keyboard.paintKeyboard(keysDataEn);
    helper.pushDataInLocalStorage(keyboard.lang = 'en');
  }

  document.addEventListener('click', (event) => {
    const display = document.getElementById('keyBoardDisplay');
    let flag = true;
    if (event.target.type === 'submit') {
      if (event.target.name === '8') {
        flag = helper.deleteChar(display);
        display.focus();
      }
      if (event.target.name === '13') {
        flag = helper.newLine(display);
        display.focus();
      }
      if (event.target.name === '37'
        || event.target.name === '38'
        || event.target.name === '39'
        || event.target.name === '40') {
        helper.insertSymbol(event.target.innerHTML, display);
        display.focus();
        flag = false;
      }
      if (flag) {
        helper.insertCharInDisplay(event.target.name, display);
        display.focus();
      }
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.altKey && event.shiftKey && keyboard.lang === 'en') {
      keyboard.paintKeyboard(keysDataRu);
      helper.pushDataInLocalStorage(keyboard.lang = 'ru');
    } else if (event.altKey && event.shiftKey && keyboard.lang === 'ru') {
      keyboard.paintKeyboard(keysDataEn);
      helper.pushDataInLocalStorage(keyboard.lang = 'en');
    }
    if (event.code) helper.buttonPressAnimation(event.code);
  });

  document.addEventListener('keyup', (event) => {
    helper.removePressAnimation(event.code);
  });

  helper.showMessage();
};
