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

  insertSpace(div) {
    const display = div;
    display.value += '    ';
    return false;
  }

  newLine(div) {
    const display = div;
    display.value += '\r\n';
    return false;
  }

  deleteChar(div) {
    const display = div;
    const str = display.value;
    if (str) {
      display.value = str.substring(0, str.length - 1);
      return false;
    }
    return false;
  }

  insertSymbol(name, div) {
    const display = div;
    if (display.value === '') {
      const prepareArray = [];
      prepareArray.push(name);
      display.value = prepareArray.join();
    } else {
      display.value = `${display.value}${name}`;
    }
  }

  insertCharInDisplay(name, div) {
    const display = div;
    if (this.filterKeyCode(name)) return;
    if (display.value === '') {
      const prepareArray = [];
      prepareArray.push(this.insertAgreeValue(name));
      display.value = prepareArray.join();
    } else {
      display.value = `${display.value}${this.insertAgreeValue(name)}`;
    }
  }

  filterKeyCode(name) {
    const keyCodeData = [20, 16, 17, 91, 18, 32, 93];
    if (keyCodeData.includes(Number(name))) return true;
    return false;
  }

  buttonPressAnimation(code) {
    if (code) {
      document.getElementById(String(code)).classList.add('key_active');
    }
  }

  removePressAnimation(code) {
    if (code && document.getElementById(String(code)).classList.contains('key_active')) {
      document.getElementById(String(code)).classList.remove('key_active');
    }
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

  showMessage() {
    const message = document.createElement('div');
    message.classList.add('message');
    message.innerText = 'Hi guys, this keyboard is implemented for windows if you want to change the language, please press LeftAlt + LeftShift.';
    document.body.append(message);
  }
}

export default Helper;
