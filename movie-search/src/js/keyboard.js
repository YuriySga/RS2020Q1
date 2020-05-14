const searchForm = document.querySelector(".search-form");
const textin = document.querySelector('.search-form__input');
const swiper = document.querySelector(".swiper");
const searchForm__buttonKeyboard = document.querySelector('.search-form__button-keyboard');
let keyboard;
let keyboardIsOn = false;

//createTextarea();
createKeyboardTemplate();

const obj = {
  Backquote: ["key-tilde", "~", "`", "ё", "Ё" ],  
  Digit1: ["key-one", '1', '!', "1", "!" ],
  Digit2: ["key-two",'2','@', "2", "\""],
  Digit3: ["key-three",'3','#', "3", "№"],
  Digit4: ["key-four",'4',"$", "4", ";"],
  Digit5: ["key-five",'5','%', "5", "%"],
  Digit6: ["key-six",'6','^', "6", ":"],
  Digit7: ['key-seven','7','&', "7", "?"],
  Digit8: ['key-eight','8','*', "8", "*"],
  Digit9: ['key-nine','9','(', "9", "("],
  Digit0: ['key-zero','0',')', "0", ")"],
  Minus: ['key-minus','-','_', "-", "_"],
  Equal: ['key-equal','=','+', "=", "+"],  
  KeyQ: ['key-q','q','Q', "й", "Й"],
  KeyW: ['key-w','w','W', "ц", "Ц"],
  KeyE: ['key-e','e','E', "у", "У"],
  KeyR: ['key-r','r','R', "к", "К"],
  KeyT: ['key-t','t','T', "е", "Е"],
  KeyY: ['key-y','y','Y', "н", "Н"],
  KeyU: ['key-u','u','U', "г", "Г"],
  KeyI: ['key-i','i','I', "ш", "Ш"],
  KeyO: ['key-o','o','O', "щ", "Щ"],
  KeyP: ['key-p','p','P', "з", "З"],
  BracketLeft:['key-ha','[','{', "х", "Х"],
  BracketRight: ['key-strongSign',']','}', "ъ", "Ъ"],
  Backslash: ['key-slash','\\','|', "\\", "/"],  
  KeyA: ['key-a','a','A', "ф", "Ф"],
  KeyS: ['key-s','s','S', "ы", "Ы"],
  KeyD: ['key-d','d','D', "в", "В"],
  KeyF: ['key-f','f','F', "а", "А"],
  KeyG: ['key-g','g','G', "п", "П"],
  KeyH: ['key-h','h','H', "р", "Р"],
  KeyJ: ['key-j','j','J', "о", "О"],
  KeyK: ['key-k','k','K', "л", "Л"],
  KeyL: ['key-l','l','L', "д", "Д"],
  Semicolon: ['key-colon',';',':', "ж", "Ж"],
  Quote: ['key-quotationMarks',"'",'"', "э", "Э"], 
  KeyZ: ['key-z','z','Z', "я", "Я"],
  KeyX: ['key-x','x','X', "ч", "Ч"],
  KeyC: ['key-c','c','C', "с", "С"],
  KeyV: ['key-v','v','V', "м", "М"],
  KeyB: ['key-b','b','B', "и", "И"],
  KeyN: ['key-n','n','N', "т", "Т"],
  KeyM: ['key-m','m','M', "ь", "Ь"],
  Comma: ['key-comma',',','<', "б", "Б"],
  Period: ['key-point','.','>', "ю", "Ю"],
  Slash: ['key-questionMark','/','?', ".", ","],
  Space: ['key-space',' ',' ',' ',' '],
  Enter: ['key-enter','\n','\n','\n','\n'],
  ArrowLeft: ['key-arrowLeft','◄','◄', "◄", "◄"],
  ArrowRight: ['key-arrowRight','►','►', "►", "►"],
  ArrowDown: ['key-arrowDown','▼','▼', "▼", "▼"],
  ArrowUp: ['key-arrowUp','▲','▲', "▲", "▲"],
  Backspace: ['key-backspace'],
  Tab: ['key-tab'],
  Delete: ['key-del'],
  CapsLock: ['key-caps'],
  ShiftLeft: ['key-shift'],  
  ShiftRight: ['key-rShift'],
  ControlRight: ['key-rCtrl'],
  ControlLeft: ['key-ctrl'],
  MetaLeft: ['key-lang', 'en', 'ru','ru'],
  AltLeft: ['key-alt'],
  AltRight: ['key-rAlt'],   
};

let MousLastPressButton = '';
if (localStorage.lang === undefined) localStorage.lang = 'ENG';
let shiftCase = false;
let shiftCaseLeft = false;
let altCaseLeft = false;
let changeLangUpKeyFlag = false;
let capsLock = false;

class Button {
  constructor ({code, key, style, ...Rest}) {
    this.className = `keyboard-button ${style}`; 
    this.key = key;
    this.code = code; 
  }

  //Button generator
  generateButton() {
    let div = document.createElement('div');
    div.className = this.className; 
    div.dataset.key = this.key;
    div.dataset.code = this.code;
    div.innerHTML = this.code;
    return div;
  }
}

searchForm__buttonKeyboard.addEventListener('click', () => {
  if (keyboardIsOn === false) {
    keyboardTurnOn(true);
    keyboardIsOn = true;
  } else {
    keyboardTurnOn(false);
    keyboardIsOn = false;
  }
});

function keyboardTurnOn(enableKeyboard) {
  const keyboardTemplate = document.querySelector('.keyboard-template');
  if (enableKeyboard === true) {
    const clone = document.importNode(keyboardTemplate.content, true);
    keyboardTemplate.before(clone);
    keyboard = document.querySelector('.keyboard');
    generatorButton();
    drawKey();
    addAllEventListener();
  } else {
    const keyboardContainer = document.querySelector('.keyboard-container');
    keyboardContainer.remove();
  }
}

function addAllEventListener () {
  keyboard.addEventListener('mousedown', function(event) {
    textin.focus();
    if (event.target.classList[0] === "keyboard") return;
    MousLastPressButton = event.target;
    setStyle(event.target, true);
    identifyKey(event.target.dataset, "down");
    drawKey();
  });
  
  keyboard.addEventListener('mouseup', function(event) {
    textin.focus();
    if (event.target.dataset.code === "CapsLock") return;
    removeLastPressButtonStyle();
    identifyKey(event.target.dataset, "up");
    drawKey();
  });
  
  /* document.addEventListener('keydown', function(event) {
    if (event.repeat) return;
    event.preventDefault(); 
    setStyle (document.querySelector(`.${obj[event.code][0]}`), true);  
    identifyKey(event, 'down');
    checkLang();
    drawKey();
  });
  
  document.addEventListener('keyup', function(event) { 
    if (event.repeat) return;
    if (event.key === "CapsLock") return;
    setStyle (document.querySelector(`.${obj[event.code][0]}`), false);
    identifyKey(event, 'up');
    checkLang();
    drawKey();
   }); */
}

function setStyle (code, bool) {
  if (bool) code.classList.add("active");
  else code.classList.remove("active");
}

function removeLastPressButtonStyle () {
  MousLastPressButton.classList.remove("active");
}

function capsButtonIsPress() {
  if (capsLock === true) {
    capsLock = false;
  } else {
    capsLock = true;
  } 

  if (shiftCase === true) {
    shiftCase = false;
  } else {
    shiftCase = true;
  } 
}

function deleteButtonIsPress() {
  let arr = textin.value.split('');
  let pos = textin.selectionStart;
  arr.splice(pos, 1);
  textin.value = arr.join('');
  textin.selectionStart = textin.selectionEnd = pos;
}

function backspaceButtonIsPress() {
  let arr = textin.value.split('');
  let pos = textin.selectionStart;
  if (pos === 0) return;
  arr.splice(pos - 1, 1);
  textin.value = arr.join('');
  textin.selectionStart = textin.selectionEnd = pos -1;
}

function printKeyCode(key) {
  let arr = textin.value.split('');
  let pos = textin.selectionStart;
  arr.splice(pos, 0, key);
  textin.value = arr.join('');
  textin.selectionStart = textin.selectionEnd = pos + 1;
}

function identifyKey(event, updown) {
  textin.focus(); 
  if (event.code === "ShiftLeft") {
    if (shiftCaseLeft) shiftCaseLeft = false;
    else shiftCaseLeft = true;
  }  

  if (event.code === "AltLeft") {
    if (altCaseLeft) altCaseLeft = false;
    else altCaseLeft = true;
  } 

  if (event.code === "CapsLock") {
    if (capsLock === true) {
      setStyle (document.querySelector(`.${obj[event.code][0]}`), false);  
    }
    capsButtonIsPress();
  } 
  
  if (event.key === "shift" || event.key === "rShift" || event.key === "Shift") {
    capsButtonIsPress();
    return;
  } 

  if (updown === "down"){
    if (event.code === "MetaLeft") {
      langButtonButtonIsPress();
      return;
    }
    
    if (event.code === "ArrowRight") {
      arrowRightButtonIsPress();
      return;
    }

    if (event.code === "ArrowLeft") {
      arrowLeftButtonIsPress();
      return;
    }

    if (event.code === "ArrowUp") {
      return;
    }

    if (event.code === "ArrowDown") {
      return;
    }

    if (event.code === "Tab") {
      tabCase();
    } 

    if (event.code === "Backspace") {
      backspaceButtonIsPress();
    } 
  
    if (event.code === "Delete") {
      deleteButtonIsPress();
    } 

    if (shiftCase === false && localStorage.lang === 'ENG') {   
        if (obj[event.code][1] !== undefined) {
          printKeyCode(obj[event.code][1]);
        }      
    }

    if (shiftCase === true && localStorage.lang === 'ENG') {
        if (obj[event.code][2] !== undefined) {
          printKeyCode(obj[event.code][2]);
        }      
    }

    if (shiftCase === false && localStorage.lang === 'RUS') {
        if (obj[event.code][3] !== undefined) {
          printKeyCode(obj[event.code][3]);
        }      
    }

    if (shiftCase === true && localStorage.lang === 'RUS') {
        if (obj[event.code][4] !== undefined) {
          printKeyCode(obj[event.code][4]);
        }      
    }

    if (event.code === "Enter") {
      enterButtonIsPress();
    }   
  }  
}

function langButtonButtonIsPress() {
  changeLang();
}

function arrowLeftButtonIsPress() {
  let arr = textin.value.split('');
  let pos = textin.selectionStart;
  arr.splice(pos, 0, "");
  textin.value = arr.join('');
  textin.selectionStart = textin.selectionEnd = pos - 1;
}

function arrowRightButtonIsPress() {
  let arr = textin.value.split('');
  let pos = textin.selectionStart;
  arr.splice(pos, 0, "");
  textin.value = arr.join('');
  textin.selectionStart = textin.selectionEnd = pos + 1;
}

function enterButtonIsPress() {
  let event = new Event("submit");
  searchForm.dispatchEvent(event);
}

function tabCase() {
  let arr = textin.value.split('');
  let pos = textin.selectionStart;
  arr.splice(pos, 0, "    ");
  textin.value = arr.join('');
  textin.selectionStart = textin.selectionEnd = pos + 4;
}

function checkLang() {
  if (changeLangUpKeyFlag) {
    if (altCaseLeft === false && shiftCaseLeft === false) {
      changeLangUpKeyFlag = false;
      changeLang();
      drawKey();
    }  
  } else if (altCaseLeft === true && shiftCaseLeft === true) {
    changeLangUpKeyFlag = true;
  }  else return;     
}

function changeLang () {
  if (localStorage.lang === 'ENG') {
    localStorage.lang = 'RUS';
  } else {
    localStorage.lang = 'ENG';
  } 
}

function drawKey() {
  let arrVals = Object.values(obj);
  arrVals.forEach(el => {
    let x = document.querySelector(`.${el[0]}`);
    if (el[0] === 'key-enter' || el.length === 1) {
      //nop;
    } else if (el.length < 2) {
      x.innerText = el[0];
    } else if (shiftCase === false && localStorage.lang === 'ENG') {
      x.innerText = el[1];
    } else if (shiftCase === true && localStorage.lang === 'ENG') {
      x.innerText = el[2];
    } else if (shiftCase === false && localStorage.lang === 'RUS') {
      x.innerText = el[3];
    } else if (shiftCase === true && localStorage.lang === 'RUS') {
      x.innerText = el[4];
    }
  });
}

function createKeyboardTemplate() {
  const template = document.createElement('template');
  template.className = 'keyboard-template'; 
  const keyboardDiv = document.createElement('div');
  keyboardDiv.className = 'keyboard'; 
  keyboardDiv.style.gridGap = '4px';
  keyboardDiv.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr';
  keyboardDiv.style.gridTemplateAreas = `"tilde one two three four five six seven eight nine zero minus equal backspace backspace backspace"
                                          "tab q w e r t y u i o p ha strongSign slash del del"
                                          "caps caps a s d f g h j k l colon quotationMarks enter enter enter"
                                          "shift shift shift z x c v b n m comma point questionMark arrowUp rShift rShift"
                                          "ctrl win alt space space space space space space space rAlt rCtrl rCtrl arrowLeft arrowDown arrowRight"`;
  const keyboardContainerDiv = document.createElement('div');
  keyboardContainerDiv.className = 'container keyboard-container'; 
  keyboardContainerDiv.append(keyboardDiv);
  template.content.append(keyboardContainerDiv);
  searchForm.append(template);
}

function createTextarea() {
  let textarea = document.createElement('textarea');
  textarea.className = "textin";
  textarea.value = "Клавиатура создавалась в OS Windows";
  document.body.append(textarea);
}

function generatorButton () {
  let ar = [];
  let arr = Object.keys(obj);
  arr.forEach(el => {
     ar.push(new Button({
      code: el,
      key: obj[el][0],
      style: obj[el][0],      
    })); 
  });
   ar.forEach(el => {
    keyboard.append(el.generateButton());
  }) ; 
}