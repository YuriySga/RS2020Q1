const searchForm = document.querySelector(".search-form");
const textin = document.querySelector('.search-form__input');
const swiper = document.querySelector(".swiper");

//createTextarea();
createKeyboard();

const keyboard = document.querySelector('.keyboard');

const obj = {
  Backquote: ["tilde", "~", "`", "ё", "Ё" ],  
  Digit1: ["one", '1', '!', "1", "!" ],
  Digit2: ["two",'2','@', "2", "\""],
  Digit3: ["three",'3','#', "3", "№"],
  Digit4: ["four",'4',"$", "4", ";"],
  Digit5: ["five",'5','%', "5", "%"],
  Digit6: ["six",'6','^', "6", ":"],
  Digit7: ['seven','7','&', "7", "?"],
  Digit8: ['eight','8','*', "8", "*"],
  Digit9: ['nine','9','(', "9", "("],
  Digit0: ['zero','0',')', "0", ")"],
  Minus: ['minus','-','_', "-", "_"],
  Equal: ['equal','=','+', "=", "+"],  
  KeyQ: ['q','q','Q', "й", "Й"],
  KeyW: ['w','w','W', "ц", "Ц"],
  KeyE: ['e','e','E', "у", "У"],
  KeyR: ['r','r','R', "к", "К"],
  KeyT: ['t','t','T', "е", "Е"],
  KeyY: ['y','y','Y', "н", "Н"],
  KeyU: ['u','u','U', "г", "Г"],
  KeyI: ['i','i','I', "ш", "Ш"],
  KeyO: ['o','o','O', "щ", "Щ"],
  KeyP: ['p','p','P', "з", "З"],
  BracketLeft:['ha','[','{', "х", "Х"],
  BracketRight: ['strongSign',']','}', "ъ", "Ъ"],
  Backslash: ['slash','\\','|', "\\", "/"],  
  KeyA: ['a','a','A', "ф", "Ф"],
  KeyS: ['s','s','S', "ы", "Ы"],
  KeyD: ['d','d','D', "в", "В"],
  KeyF: ['f','f','F', "а", "А"],
  KeyG: ['g','g','G', "п", "П"],
  KeyH: ['h','h','H', "р", "Р"],
  KeyJ: ['j','j','J', "о", "О"],
  KeyK: ['k','k','K', "л", "Л"],
  KeyL: ['l','l','L', "д", "Д"],
  Semicolon: ['colon',';',':', "ж", "Ж"],
  Quote: ['quotationMarks',"'",'"', "э", "Э"], 
  KeyZ: ['z','z','Z', "я", "Я"],
  KeyX: ['x','x','X', "ч", "Ч"],
  KeyC: ['c','c','C', "с", "С"],
  KeyV: ['v','v','V', "м", "М"],
  KeyB: ['b','b','B', "и", "И"],
  KeyN: ['n','n','N', "т", "Т"],
  KeyM: ['m','m','M', "ь", "Ь"],
  Comma: ['comma',',','<', "б", "Б"],
  Period: ['point','.','>', "ю", "Ю"],
  Slash: ['questionMark','/','?', ".", ","],
  Space: ['space',' ',' ',' ',' '],
  Enter: ['enter','\n','\n','\n','\n'],
  ArrowLeft: ['arrowLeft','◄','◄', "◄", "◄"],
  ArrowRight: ['arrowRight','►','►', "►", "►"],
  ArrowDown: ['arrowDown','▼','▼', "▼", "▼"],
  ArrowUp: ['arrowUp','▲','▲', "▲", "▲"],
  Backspace: ['backspace'],
  Tab: ['tab'],
  Delete: ['del'],
  CapsLock: ['caps'],
  ShiftLeft: ['shift'],  
  ShiftRight: ['rShift'],
  ControlRight: ['rCtrl'],
  ControlLeft: ['ctrl'],
  MetaLeft: ['lang', 'en', 'ru','ru'],
  AltLeft: ['alt'],
  AltRight: ['rAlt'],   
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
    let template = '';
    let div = document.createElement('div');
    div.className = this.className; 
    div.dataset.key = this.key;
    div.dataset.code = this.code;
    div.innerHTML = this.code;
    return div;
  }
}

generatorButton();
drawKey();
textin.focus();


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

document.addEventListener('keydown', function(event) {
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
 });

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

  if (shiftCase === false && localStorage.lang === 'ENG') {
    arrVals.forEach(el => {
      let x = document.querySelector(`.${el[0]}`);
      if (el.length < 2) {
        x.innerText = el[0];
      } else if (el[0] === 'enter') {
        //nop
      } else if (el[1] !== undefined) { 
        x.innerText = el[1];
      }      
    });
  }

  if (shiftCase === true && localStorage.lang === 'ENG') {
    arrVals.forEach(el => {
      let x = document.querySelector(`.${el[0]}`);
      if (el.length < 2) {
        x.innerText = el[0];
      } else if (el[0] === 'enter') {
        //nop
      } else if (el[2] !== undefined) {
        x.innerText = el[2];
      }      
    });
  }

  if (shiftCase === false && localStorage.lang === 'RUS') {
    arrVals.forEach(el => {
      let x = document.querySelector(`.${el[0]}`);
      if (el.length < 2) {
        x.innerText = el[0];
      } else if (el[0] === 'enter') {
        //nop
      } else if (el[3] !== undefined) {
        x.innerText = el[3];
      }      
    });
  }

  if (shiftCase === true && localStorage.lang === 'RUS') {
    arrVals.forEach(el => {
      let x = document.querySelector(`.${el[0]}`);
      if (el.length < 2) {
        x.innerText = el[0];
      } else if (el[0] === 'enter') {
        //nop
      } else if (el[4] !== undefined) {
        x.innerText = el[4];
      }      
    });
  }
}


function createKeyboard() {
  let div = document.createElement('div');
  div.className = "container keyboard-container"; 
  div.innerHTML = '<div class="keyboard"></div>';
  //document.body.append(div);
  searchForm.append(div);
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






