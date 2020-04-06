/* eslint-disable no-restricted-syntax */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */

import { charTable } from '../data.js';

export function insertAgreeValue(key) {
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

export function insertSpace(div) {
  const display = div;
  display.value += '    ';
  return false;
}

export function newLine(div) {
  const display = div;
  display.value += '\r\n';
  return false;
}

export function deleteChar(div) {
  const display = div;
  const str = display.value;
  if (str) {
    display.value = str.substring(0, str.length - 1);
    return false;
  }
  return false;
}

export function insertSymbol(name, div) {
  const display = div;
  if (display.value === '') {
    const prepareArray = [];
    prepareArray.push(name);
    display.value = prepareArray.join();
  } else {
    display.value = `${display.value}${name}`;
  }
}

export function insertCharInDisplay(name, div) {
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

export function filterKeyCode(name) {
  const keyCodeData = [20, 16, 17, 91, 18, 32, 93];
  if (keyCodeData.includes(Number(name))) return true;
  return false;
}

export function buttonPressAnimation(code) {
  if (code) {
    document.getElementById(String(code)).classList.add('key_active');
  }
}

export function removePressAnimation(code) {
  if (code && document.getElementById(String(code)).classList.contains('key_active')) {
    document.getElementById(String(code)).classList.remove('key_active');
  }
}

export function pushDataInLocalStorage(lang) {
  const tempObj = {};
  tempObj.lang = lang;
  const obj = JSON.stringify(tempObj);
  localStorage.setItem('lang', obj);
}

export function loadDataFromLocalStorage() {
  return JSON.parse(localStorage.getItem('lang'));
}

export function showMessage(message, tag) {
  const div = document.createElement(tag);
  div.classList.add('message');
  div.innerText = message;
  document.body.append(div);
}
