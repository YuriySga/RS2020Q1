import 'bootstrap';
import '../css/style.css';
import '../css/style.scss';
import { Card } from './Card';

require.context("../img/", true, /\.(png|svg|jpg|gif)$/);
require.context("../audio/", true, /\.(mp3)$/);

const cards = require('./cards.js');

const cardArr = document.querySelectorAll(".card");
const cardContainer = document.querySelector(".card-container");
const nav = document.querySelector(".nav-container");
const navPanel = document.querySelector(".nav-panel");
const menuToggle = document.querySelector(".menuToggle");
const trainPlaySwicher = document.getElementById("swich");
const startButton = document.getElementById("start-button");
/* const images = document.querySelectorAll(".card-images"); */

let navPanelFlag = false;
/* const audioElement = new Audio('../audio/bird.mp3'); */

/* import {
  moduleOne
} from './moduleOne';
/*

const helloArr = require('./moduleOne.js');

class TestClass {
  constructor() {
    const msg = "Using ES2015+ syntax";
    console.log(msg);
  }
}

const test = new TestClass();

// Пример массива
console.log(helloArr);

/* пример подключения модуля
let mod = moduleOne(2, 3);

console.log(mod);

 */
loadSecondPageTrainPlaySwicher ();
loadstartBtnEnDis();
loadSecondPageCard();
if (localStorage.trainPlayFlagChecked === "true") {setCardsOnPlayMode(true);}
else {setCardsOnPlayMode(false);} 




cardContainer.addEventListener('click', (event) => {
  if (localStorage.audioIsOn === "false" || localStorage.pageIndex === undefined || localStorage.pageIndex === "0"){return;}
  if (event.target.alt !== "" && event.target.tagName === "IMG" && localStorage.trainPlayFlagChecked === "false") {
      const foundObject = cards[localStorage.pageIndex].find(item => item.word === event.target.alt);
      playAudio(foundObject.audioSrc);  
  }
  if (event.target.classList.contains("rotate")) {
    rotateCardTrue(event.target.id);
    rotateCardCloseEListener(event.target.id);   
  }
});










/* createSecondPageCards(secondPageCardsName);
function createSecondPageCards (str) {
  let ind = cards[0].indexOf(str);
  /* console.log(ind); */

  
  /* console.log( new Card(cards[ind+1][0]));
  
  
} */
function setCardsOnPlayMode (bool) {
  const images = document.querySelectorAll(".card-images");
  const myCardsBody = document.querySelectorAll(".my-card-body");
  if (bool) {
    localStorage.trainPlayFlagChecked = true;   
    images.forEach(element => {
      element.style.height = "100%";
    });

    myCardsBody.forEach(element => {
      element.style.display = "none";
    });
  } else {
    localStorage.trainPlayFlagChecked = false; 
    images.forEach(element => {
      element.style.height = "";
    });
  
    myCardsBody.forEach(element => {
      element.style.display = "";
    });
  }
}




document.addEventListener('click',  (event) => {
  /* train/play swicher first page */
  if (event.target.id === "swich") {    
    if (localStorage.pageIndex === "0") {
      if (event.target.checked === true) {
        firstPageSetColorCards(true);        
      } else {
        firstPageSetColorCards(false);        
      }
    } else if (localStorage.pageIndex !== "0") { 
      /* train/play swicher second page */   
      if (event.target.checked === true) {
        startBtnEnDis(true);
        setCardsOnPlayMode(true);
      } else {
        startBtnEnDis(false);
        setCardsOnPlayMode(false);
      }     
    }    
  }
  /* berger swicher */
  if (event.target.id === "burger") {   
    if (navPanelFlag === false) {
    navPanel.style.left = "0";
    navPanelFlag = true;
    menuToggle.classList.remove("burger_left");
    menuToggle.classList.add("burger_right");
    } else {
    menuToggle.classList.remove("burger_right");
    menuToggle.classList.add("burger_left");
    navPanel.style.left = "-350px";
    navPanelFlag = false;
    }
    } else {
      menuToggle.classList.remove("burger_right");
      menuToggle.classList.add("burger_left");
      navPanel.style.left = "-350px";
      navPanelFlag = false;
    }                             
});
  
  function startBtnEnDis (bool) {
    if (bool === true) {
      startButton.classList.remove("disabled");
      localStorage.trainPlayFlagChecked = true;
    } else if (bool === false) {
      startButton.classList.add("disabled");
      localStorage.trainPlayFlagChecked = false;
    }
  }

  function loadstartBtnEnDis () {
    if (localStorage.pageIndex === undefined || localStorage.pageIndex === "0"){  return;}
    if (localStorage.trainPlayFlagChecked === "true") {
      startBtnEnDis(true);
    } else {
      startBtnEnDis(false);
    }
  }

  function loadSecondPageTrainPlaySwicher () {
    if (localStorage.trainPlayFlagChecked === "true") {
      trainPlaySwicher.checked = true;
      /* setCardsOnPlayMode(true); */
    } else {
      trainPlaySwicher.checked = false;
      /* setCardsOnPlayMode(false); */
    }
  }

  function playAudio (path) {  
    const audioElement = new Audio(path);
    audioElement.play(); 
  }

  function firstPageSetColorCards(bool) {
    if (bool === true) {
      localStorage.trainPlayFlagChecked = true;
      cardArr.forEach(element => {
        element.classList.add("play");
      });
    } else if (bool === false) {
      cardArr.forEach(element => {
        element.classList.remove("play");
        localStorage.trainPlayFlagChecked = false;
      });
    }
  }

  function loadSecondPageCard () {
    if (localStorage.pageIndex === undefined || localStorage.pageIndex === "0"){return;}  
    cardArr.forEach(function(item, index) { 
      const c = (new Card (cards[localStorage.pageIndex][index]));
      item.innerHTML = '';
      item.innerHTML = c.generateCart(index);  
    }); 
  }   
  
  function rotateCardTrue (id) {
    cardArr[id].childNodes[1].style.transform = "rotateY(180deg)";
    cardArr[id].childNodes[3].style.transform = "rotateY(360deg)"; 
  }
  
  function rotateCardFalse (id) {
    cardArr[id].childNodes[1].style.transform = "";
    cardArr[id].childNodes[3].style.transform = "";  
  }
  
  function rotateCardCloseEListener (id) {
    cardArr[id].onmouseleave  = () => {
      rotateCardFalse(id);
      cardArr[id].onmouseleave = null;
    };
  } 