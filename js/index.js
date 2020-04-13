/* eslint-disable import/extensions */

import { keysDataEn, keysDataRu } from './data.js';
import Keyboard from './modules/Keyboard.js';
import * as helper from './modules/helper.js';

window.onload = () => {
  const keyboard = new Keyboard();

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

  const lang = helper.loadDataFromLocalStorage();
  if (lang) {
    insertCurrentLanguage(lang);
  } else {
    keyboard.paintKeyboard(keysDataEn);
    helper.pushDataInLocalStorage(keyboard.lang = 'en');
  }

  document.addEventListener('click', (event) => {
    const arrows = {
      left: '37',
      up: '38',
      right: '39',
      down: '40',
    };

    const display = document.getElementById('keyBoardDisplay');
    let isPrintable = true;
    if (event.target.type === 'submit') {
      if (event.target.innerText === 'Backspace') {
        isPrintable = helper.deleteChar(display);
        display.focus();
      }
      if (event.target.innerText === 'Enter') {
        isPrintable = helper.newLine(display);
        display.focus();
      }
      if (event.target.innerText === 'Tab') {
        isPrintable = helper.insertSpace(display);
        display.focus();
      }
      if (event.target.name === arrows.left
        || event.target.name === arrows.up
        || event.target.name === arrows.right
        || event.target.name === arrows.down) {
        helper.insertSymbol(event.target.innerHTML, display);
        display.focus();
        isPrintable = false;
      }
      if (isPrintable) {
        helper.insertCharInDisplay(event.target.name, display);
        display.focus();
      }
    }
  });

  document.addEventListener('keydown', (event) => {
    const kbdLang = {
      en: 'en',
      ru: 'ru',
    };

    if (event.altKey && event.shiftKey && keyboard.lang === kbdLang.en) {
      keyboard.paintKeyboard(keysDataRu);
      helper.pushDataInLocalStorage(keyboard.lang = kbdLang.ru);
    } else if (event.altKey && event.shiftKey && keyboard.lang === kbdLang.ru) {
      keyboard.paintKeyboard(keysDataEn);
      helper.pushDataInLocalStorage(keyboard.lang = kbdLang.en);
    }
    if (event.code) helper.buttonPressAnimation(event.code);
  });

  document.addEventListener('keyup', (event) => {
    helper.removePressAnimation(event.code);
  });

  const hint = 'Hi guys, this keyboard is implemented for windows if you want to change the language, please press LeftAlt + LeftShift.';

  helper.showMessage(hint, 'div');
};
