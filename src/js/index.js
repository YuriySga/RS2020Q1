import 'bootstrap';
import '../css/style.css';
import '../css/style.scss';
import { Card } from './Card';

require.context("../img/", true, /\.(png|svg|jpg|gif)$/);
require.context("../audio/", true, /\.(mp3)$/);

const cards = require('./cards.js');

const cardArr = document.querySelectorAll(".card");
const pop_up = document.querySelector(".pop_up");
const cardContainer = document.querySelector(".card-container");
const nav = document.querySelector(".nav-container");
const navPanel = document.querySelector(".nav-panel");
const menuToggle = document.querySelector(".menuToggle");
const trainPlaySwicher = document.getElementById("swich");
const startButton = document.getElementById("start-button");
/* const images = document.querySelectorAll(".card-images"); */

let navPanelFlag = false;
let lastClickCardImageAlt = "";  /* variable for contained answer; */
let refreshButtonIsPress = false;
let gameIsStart= false;
let lastAudioSrc;
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





/* push button start, then play audio random */
function startQuestions () {  
  if (gameIsStart === false) return;
  let found = cards[localStorage.pageIndex];
  shuffle(found);
  lastAudioSrc = found[0].audioSrc;
  askQuestions(lastAudioSrc);
  check();
  


  function check () {
    if (gameIsStart === false) return;
    if (checkAnswerQuestions() === true) {
      found.shift(); 
      if (found.length !== 0){ 
        lastAudioSrc = found[0].audioSrc;
        setTimeout(()=>{playAudio(lastAudioSrc);}, 700);
        setTimeout(check, 1000);
      } else {
        /* YOU WIN */
        console.log('you win');
        playAudio('audio/success.mp3');
        popupMsg();
        return;
       }
    } else {
      setTimeout(check, 500);
    }
  }

  function checkAnswerQuestions () {       
    /* if (lastClickCardImageAlt === "") {}  */ 
    /* if refresh button is press, need again play audio */
    /* if (refreshButtonIsPress === true) {
      askQuestions ();
    } */
    if (lastClickCardImageAlt === found[0].word) {
      lastClickCardImageAlt = "";
      /* addGoldStar();*/
      playAudio('audio/correct.mp3');
      return true;
    }
    if (lastClickCardImageAlt !== "" && lastClickCardImageAlt !== found[0].word) {
      lastClickCardImageAlt = "";
      /* addWhiteStar();*/        
      playAudio('audio/error.mp3');
    }
  console.log('end check'); 
  }
}

function askQuestions (audioSrc) {  
  if (gameIsStart === false) return;
  playAudio(audioSrc);   /* play first melody in arr */  
  lastClickCardImageAlt = "";   /* clear variable for contained answer; */
  /* refreshButtonIsPress = false;  */ /* clear variable; */
}





function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));    
    [array[i], array[j]] = [array[j], array[i]];    
  }
  return array;
}

/* function random() {
  let slidesPortfolio = document.querySelectorAll('.picture');
  slidesPortfolio.forEach((item, index) => {
    if (Math.random() > 0.5) { 
      image_art.append(slidesPortfolio[index]);
    }
  });
}
 */









cardContainer.addEventListener('click', (event) => {
 /*  if user is located of first page */
  if (localStorage.audioIsOn === "false" || localStorage.pageIndex === undefined || localStorage.pageIndex === "0"){return;}
 
  /* play audio in train mode */
  if (event.target.alt !== "" && event.target.tagName === "IMG" && localStorage.trainPlayFlagChecked === "false") {
      const foundObject = cards[localStorage.pageIndex].find(item => item.word === event.target.alt);
      playAudio(foundObject.audioSrc);  
  }
  /* Check answer the questions */
  if (event.target.alt !== "" && event.target.tagName === "IMG" && gameIsStart === true) {
    lastClickCardImageAlt = event.target.alt;
  }
    /* cllick of rotate icon to rotate card */
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
  console.log(event.target.id);
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
        gameIsStart = false;
      }     
    }    
  }
  /* burger swicher */
  else if (event.target.id === "burger") {
    if (navPanelFlag === false) {
    console.log(navPanel.style.left); 
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
  } 
  /* start button press */
  else if (event.target.id === "start-button") { 
    if (localStorage.trainPlayFlagChecked === "true" && gameIsStart === false) {
      gameIsStart = true; 
      /* refreshButtonIsPress = false; */
      startQuestions();      
    } else if (localStorage.trainPlayFlagChecked === "true" && gameIsStart === true) {
      /* refreshButtonIsPress = true; */
      askQuestions(lastAudioSrc);
    }
  }  
  else {
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
  
  function popupMsg(str ="block") {    
    pop_up.style.display = str;
    setTimeout(()=>{popupMsg("none");}, 3000);
  }