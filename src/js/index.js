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

 




cardContainer.addEventListener('click', (event) => {
  console.log(event);
  if (localStorage.audioIsOn === "false" || localStorage.pageIndex === undefined || localStorage.pageIndex === "0"){return;}
  if (event.target.tagName === "IMG") {
      const foundObject = cards[localStorage.pageIndex].find(item => item.word === event.target.alt);
      playAudio(foundObject.audioSrc);    
  }
});





/* createSecondPageCards(secondPageCardsName);
function createSecondPageCards (str) {
  let ind = cards[0].indexOf(str);
  /* console.log(ind); */

  
  /* console.log( new Card(cards[ind+1][0]));
  
  
} */




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
      } else {
        startBtnEnDis(false);
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
    } else {
      trainPlaySwicher.checked = false;
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
      let c = (new Card (cards[localStorage.pageIndex][index]));
      item.innerHTML = '';
      item.innerHTML = c.generateCart();
    }); 
  }   
  