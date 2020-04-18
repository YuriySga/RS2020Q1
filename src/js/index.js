import 'bootstrap';
import '../css/style.css';
import '../css/style.scss';
import { Card } from './Card';


require.context("../img/", true, /\.(png|svg|jpg|gif)$/);
require.context("../audio/", true, /\.(mp3)$/);

const cards = require('./cards.js');

const cardArr = document.querySelectorAll(".card");
const pop_up = document.querySelector(".pop_up");
const pop_up_score = document.querySelector(".pop_up_score");
const cardContainer = document.querySelector(".card-container");
const navPanel = document.querySelector(".nav-panel");
const menuToggle = document.querySelector(".menuToggle");
const trainPlaySwicher = document.getElementById("swich");
const startButton = document.getElementById("start-button");
const starContainer = document.querySelector(".star-container");
/* const images = document.querySelectorAll(".card-images"); */

let navPanelFlag = false;
let lastClickCardImage = "";  /* variable for contained answer; */
let gameIsStart = false;
let gameIsTrain;
let lastAudioSrc;
let roundScorePlus = 0;
let roundScoreMinus= 0;
let lastClickedCardAltArr = [];


loadSecondPageTrainPlaySwicher ();
loadstartBtnEnDis ();
loadSecondPageCard ();
loadStatisticsPageCard ();
if (gameIsTrain === false) {setCardsOnPlayMode(true);}
else {setCardsOnPlayMode(false);}

function startQuestions () {  
  if (gameIsStart === false) return;
  startBtnToRefresh(true);
  roundScorePlus = 0;
  roundScoreMinus = 0;
  lastClickedCardAltArr.length = 0;
  const found = cards[localStorage.pageIndex].slice();
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
        /* Game over */
        const roundRes = roundScorePlus - roundScoreMinus;
        if (roundRes === 8) {
          /* WIN */
          playAudio('audio/success.mp3');        
          popupMsg("success");          
        } else {
           /* DEFEAT */
          playAudio('audio/failure.mp3');
          popupMsg("failure");
        }
        swichSwicher("forceOff");
        lastAudioSrc = "";
        lastClickCardImage = "";
        removeStars();
        startBtnToRefresh(false);        
        return;
      }
    } else {
      setTimeout(check, 500);
    }
  }
  function checkAnswerQuestions () {
    if (lastClickCardImage.alt === found[0].word) {
      lastClickCardImage.style.opacity = "0.4";
      lastClickedCardAltArr.push(lastClickCardImage.alt);
      lastClickCardImage = "";
      roundScorePlus +=1;
      addGoldStar();
      playAudio('audio/correct.mp3');
      return true;
    }
    if (lastClickCardImage !== "" && lastClickCardImage.alt !== found[0].word) {
      lastClickCardImage = "";
      roundScoreMinus +=1;
      addWhiteStar();       
      playAudio('audio/error.mp3');
      return false;
    }
  }
}

/* function checkingPreviouslyClickedCards(cardAlt) {
  lastClickedCardAltArr.includes(cardAlt);
} */

function askQuestions (audioSrc) {  
  if (gameIsStart === false) return;
  playAudio(audioSrc);           /* play first melody in arr */  
  lastClickCardImage = "";   /* clear variable for contained answer; */
}

function removeStars () {
  starContainer.innerHTML = "";
}

function addGoldStar() {
  const span = document.createElement("span");
  span.classList.add("goldStar");
  starContainer.append(span);
}

function addWhiteStar() {
  const span = document.createElement("span");
  span.classList.add("whiteStar");
  starContainer.append(span);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));    
    [array[i], array[j]] = [array[j], array[i]];    
  }
  return array;
}

cardContainer.addEventListener('click', (event) => {
 /*  if user is located of first page */
  if (localStorage.audioIsOn === "false" || localStorage.pageIndex === undefined || localStorage.pageIndex === "0"){return;}
 
  /* play audio in train mode */
  if (event.target.alt !== "" && event.target.tagName === "IMG" && gameIsTrain === true && gameIsStart === false) {
      let foundObject = cards[localStorage.pageIndex].find(item => item.word === event.target.alt);
      playAudio(foundObject.audioSrc);  
  }
  /* Check answer the questions */
  if (event.target.alt !== "" && event.target.tagName === "IMG" && gameIsStart === true) {
    if (lastClickedCardAltArr.includes(event.target.alt) !== true) {
      lastClickCardImage = event.target;
    } else { return; }
  }
    /* cllick of rotate icon to rotate card */
  if (event.target.classList.contains("rotate")) {
    rotateCardTrue(event.target.id);
    rotateCardCloseEListener(event.target.id);   
  }
});

function setCardsOnPlayMode (bool) {
  const images = document.querySelectorAll(".card-images");
  const myCardsBody = document.querySelectorAll(".my-card-body");
  if (bool) {
    gameIsTrain = false;   
    images.forEach(element => {
      element.style.height = "100%";
    });

    myCardsBody.forEach(element => {
      element.style.display = "none";
    });
  } else {
    gameIsTrain = true;
    images.forEach(element => {
      element.style.height = "";
    });
  
    myCardsBody.forEach(element => {
      element.style.display = "";
    });
  }
}

function swichSwicher(str) {
  if (str === "forceOff") {   
      trainPlaySwicher.checked = false;
      swichSwicher();
  }
  if (str === "forceOn") {
      trainPlaySwicher.checked = true;
      swichSwicher();
  }  
  if (localStorage.pageIndex === "0") {
    /* train/play swicher firsst page */
    if (trainPlaySwicher.checked === true) {
      localStorage.trainPlayFlagChecked = true;
      firstPageSetColorCards(true);        
    } else {
      localStorage.trainPlayFlagChecked = false;
      firstPageSetColorCards(false);        
    }
  } else if (localStorage.pageIndex !== "0" && localStorage.pageIndex !== "9") { 
    /* train/play swicher second page */   
    if (trainPlaySwicher.checked === true) {
      startBtnEnDis(true);
      setCardsOnPlayMode(true);
      gameIsTrain = false;
    } else {
      startBtnEnDis(false);
      setCardsOnPlayMode(false);
      gameIsStart = false;
      gameIsTrain = true;
      startBtnToRefresh(false);
      removeStars();
    }     
  }
}

function swichBurger(str) {
  if (str === "forceOff") {
    navPanelFlag = false;
    swichBurger();
  }
  if (navPanelFlag === false) {
    navPanel.style.left = "0";
    navPanelFlag = true;
    menuToggle.classList.remove("burger_left");
    menuToggle.classList.add("burger_right");
    navPanel.children[localStorage.pageIndex].classList.add("active-link");
  } else {
    menuToggle.classList.remove("burger_right");
    menuToggle.classList.add("burger_left");
    navPanel.style.left = "-350px";
    navPanelFlag = false;
  }
}

document.addEventListener('click',  (event) => {
  /* train/play swicher */
  console.log(event.target);
  if (event.target.id === "swich") {   
    swichSwicher();
    swichBurger("forceOff");
  }
  /* burger swicher */
  else if (event.target.id === "burger") {
    gameIsStart = false;
    swichBurger();
    swichSwicher("forceOff");
  } 
  /* start button press */
  else if (event.target.id === "start-button") { 
    if (gameIsTrain === false && gameIsStart === false) {
      gameIsStart = true;
      startQuestions();      
    } else if (gameIsTrain === false && gameIsStart === true) {
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


function startBtnToRefresh (bool) {
  if (bool === true) {
    startButton.innerHTML = "";
    startButton.classList.add("btn-repeat");
  } else if (bool === false) {
    startButton.innerHTML = "Start game";
    startButton.classList.remove("btn-repeat");
  }
}

  function startBtnEnDis (bool) {
    if (bool === true) {
      startButton.classList.remove("disabled");
      gameIsTrain = false;
    } else if (bool === false) {
      startButton.classList.add("disabled");
      gameIsTrain = true;
    }
  }

  function loadstartBtnEnDis () {
    if (localStorage.pageIndex === undefined || localStorage.pageIndex === "0" || localStorage.pageIndex === "9"){  return;}
    if (gameIsTrain === false) {
      startBtnEnDis(true);
    } else {
      startBtnEnDis(false);
    }
  }

  function loadSecondPageTrainPlaySwicher () {
    if (localStorage.trainPlayFlagChecked === "true") {
      trainPlaySwicher.checked = true;
      localStorage.trainPlayFlagChecked = false;   /* for if page is refresh swich on of train mode */
      gameIsTrain = false;
    } else {
      trainPlaySwicher.checked = false;
      gameIsTrain = true; 
    }
  }

  function playAudio (path) {  
    const audioElement = new Audio(path);
    audioElement.play(); 
  }

  function firstPageSetColorCards(bool) {
    if (bool === true) {
      gameIsTrain = false;
      cardArr.forEach(element => {
        element.classList.add("play");
      });
    } else if (bool === false) {
      cardArr.forEach(element => {
        element.classList.remove("play");
        gameIsTrain = true;
      });
    }
  }

  function loadSecondPageCard () {
    if (localStorage.pageIndex === undefined || localStorage.pageIndex === "0"|| localStorage.pageIndex === "9"){return;}  
    cardArr.forEach(function(item, index) { 
      const c = (new Card (cards[localStorage.pageIndex][index]));
      item.innerHTML = '';
      item.innerHTML = c.generateCart(index);  
    }); 
  }   
 
  function loadStatisticsPageCard () {
    if (localStorage.pageIndex !== "9"){return;}  
    cardArr.forEach((item, index) => { 
      item.children[0].children[0].innerHTML = '';
      for (let i = 0; i < 8; i++) { 
        const c = (new Card (cards[index+1][i]));
        item.children[0].children[0].innerHTML += c.generateStatisticsWords();                
      }    
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
  
  function popupMsg(str1, str2 ="block") { 
    pop_up_score.innerHTML = `Score: ${roundScorePlus - roundScoreMinus}, Errors: ${roundScoreMinus}`;
    if (str1 === "success") {
      pop_up.classList.add("pop_up_success");
      pop_up.style.display = str2;    
    } else if (str1 === "failure") {
      pop_up.classList.add("pop_up_failure");
      pop_up.style.display = str2;    
    } else {
      pop_up.classList.remove("pop_up_success");
      pop_up.classList.remove("pop_up_failure");
      pop_up.style.display = str2;
      document.location.href = "index.html";
      return false;      
    }
    setTimeout(()=>{popupMsg("clear", "none");}, 3000);    
  }


  


