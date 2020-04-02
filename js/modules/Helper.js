/* eslint-disable no-restricted-syntax */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */

import { charTable } from '../data.js';

class Helper {
  insertAgreeValue(key) {
    let result = '';
    let flag = true;
    const code = key.keyCode || key;
    for (const i in charTable) {
      if (String(code) === i) {
        flag = false;
        return charTable[i];
      }
    }
    if (flag) {
      result = String.fromCharCode(code);
    }
    return result;
  }

  insertCharInDisplay(name, div) {
    const display = div;
    if (display.value === '') {
      const prepareArray = [];
      prepareArray.push(this.insertAgreeValue(name));
      display.value = prepareArray.join();
    } else {
      display.value = `${display.value}${this.insertAgreeValue(name)}`;
    }
  }

  buttonPressAnimation(code) {
    document.getElementById(String(code)).classList.add('key_active');
  }

  removePressAnimation(code) {
    document.getElementById(String(code)).classList.remove('key_active');
  }

  pushDataInLocalStorage(lang) {
    const tempObj = {};
    tempObj.lang = lang;
    const obj = JSON.stringify(tempObj);
    localStorage.setItem('lang', obj);
  }

  loadDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem('lang'));
  }
}

export default Helper;
