import 'bootstrap';
import '../css/style.css';
import '../css/style.scss';
import { Card } from './Card';

//require.context("../img/", true, /\.(png|svg|jpg|gif)$/);
//require.context("../audio/", true, /\.(mp3)$/);

const cards = require('./cards.js');

const cardArr = document.querySelectorAll(".card");
const popUp = document.querySelector(".pop_up");
const popUpScore = document.querySelector(".pop_up_score");
const cardContainer = document.querySelector(".card-container");
const navPanel = document.querySelector(".nav-panel");
const menuToggle = document.querySelector(".menuToggle");
const trainPlaySwicher = document.getElementById("swich");
const startButton = document.getElementById("start-button");
const starContainer = document.querySelector(".star-container");
const lastClickedCardAltArr = [];

let navPanelFlag = false;
let lastClickCardImage = "";  /* variable for contained answer; */
let gameIsStart = false;
let gameIsTrain;
let lastAudioSrc;
let roundScorePlus = 0;
let roundScoreMinus= 0;

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

loadSecondPageTrainPlaySwicher ();

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

loadstartBtnEnDis ();

function loadSecondPageCard () {
  if (localStorage.pageIndex === undefined || localStorage.pageIndex === "0"|| localStorage.pageIndex === "9"){return;}  
  cardArr.forEach((item, index) => {
    const el = item;
    const c = (new Card (cards[localStorage.pageIndex][index]));
    el.innerHTML = '';
    el.innerHTML = c.generateCart(index);  
  }); 
}   

loadSecondPageCard ();

function loadStatisticsPageCard () {
  if (localStorage.pageIndex !== "9"){return;}  
  cardArr.forEach((item, index) => { 
    const el = item;
    el.children[0].children[0].innerHTML = '';
    for (let i = 0; i < 8; i++) { 
      const c = (new Card (cards[index+1][i]));
      el.children[0].children[0].innerHTML += c.generateStatisticsWords();                
    }    
  });  
}  

loadStatisticsPageCard ();

function setCardsOnPlayMode (bool) {
  const images = document.querySelectorAll(".card-images");
  const myCardsBody = document.querySelectorAll(".my-card-body");
  if (bool) {
    gameIsTrain = false;   
    images.forEach(item => {
      const element = item;
      element.style.height = "100%";
    });
    myCardsBody.forEach(item => {
      const element = item;
      element.style.display = "none";
    });
  } else {
    gameIsTrain = true;
    images.forEach(item => {
      const element = item;
      element.style.height = "";
    });  
    myCardsBody.forEach(item => {
      const element = item;
      element.style.display = "";
    });
  }
}

if (gameIsTrain === false) {setCardsOnPlayMode(true);}
else {setCardsOnPlayMode(false);}

function playAudio (path) {  
  const audioElement = new Audio(path);
  audioElement.play(); 
}

function rotateCard (id, bool) {
  if (bool) {
    cardArr[id].childNodes[1].style.transform = "rotateY(180deg)";
    cardArr[id].childNodes[3].style.transform = "rotateY(360deg)"; 
  } else if (!bool) {  
    cardArr[id].childNodes[1].style.transform = "";
    cardArr[id].childNodes[3].style.transform = "";  
  }
}

function rotateCardCloseEListener (id) {
  cardArr[id].onmouseleave  = () => {
    rotateCard(id, false);
    cardArr[id].onmouseleave = null;
  };
}

cardContainer.addEventListener('click', (event) => {
  /*  if user is located of first page */
  if (localStorage.audioIsOn === "false" || localStorage.pageIndex === undefined || localStorage.pageIndex === "0"){return;}

  /* play audio in train mode */
  if (event.target.alt !== "" && event.target.tagName === "IMG" && gameIsTrain === true && gameIsStart === false) {
      const foundObject = cards[localStorage.pageIndex].find(item => item.word === event.target.alt);
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
    rotateCard(event.target.id, true);
    rotateCardCloseEListener(event.target.id);   
  }
 });

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

function startBtnToRefresh (bool) {
  if (bool === true) {
    startButton.innerHTML = "";
    startButton.classList.add("btn-repeat");
  } else if (bool === false) {
    startButton.innerHTML = "Start game";
    startButton.classList.remove("btn-repeat");
  }
}

function removeStars () {
  starContainer.innerHTML = "";
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

function askQuestions (audioSrc) {  
  if (gameIsStart === false) return;
  playAudio(audioSrc);           /* play first melody in arr */  
  lastClickCardImage = "";   /* clear variable for contained answer; */
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));    
    [array[i], array[j]] = [array[j], array[i]];    
  }
  return array;
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

function popupMsg(str1, str2 ="block") { 
  popUpScore.innerHTML = `Score: ${roundScorePlus - roundScoreMinus}, Errors: ${roundScoreMinus}`;
  if (str1 === "success") {
    popUp.classList.add("pop_up_success");
    popUp.style.display = str2;    
  } else if (str1 === "failure") {
    popUp.classList.add("pop_up_failure");
    popUp.style.display = str2;    
  } else {
    popUp.classList.remove("pop_up_success");
    popUp.classList.remove("pop_up_failure");
    popUp.style.display = str2;
    document.location.href = "index.html";
  }
  setTimeout(()=>{popupMsg("clear", "none");}, 3000);    
}

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

  function checkAnswerQuestions () {
    if (lastClickCardImage.alt === found[0].word) {
      lastClickCardImage.style.opacity = "0.4";
      lastClickedCardAltArr.push(lastClickCardImage.alt);
      lastClickCardImage = "";
      roundScorePlus +=1;
      addGoldStar();
      playAudio('https://drive.google.com/uc?export=view&id=1DZELwouH5KJ2o2syzXRy_aHVSe72aFgy');
      return true;
    } 
    if (lastClickCardImage !== "" && lastClickCardImage.alt !== found[0].word) {
      lastClickCardImage = "";
      roundScoreMinus +=1;
      addWhiteStar();       
      playAudio('https://drive.google.com/uc?export=view&id=1Dpxz9szZAdlTish_ALDbWKPIZ_HibAXH');
      return false;
    } 
  }

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
          playAudio('https://drive.google.com/uc?export=view&id=1GSzt_itE77Ltm4JNeZhREzzQeteN7qwv');        
          popupMsg("success");          
        } else {
           /* DEFEAT */
          playAudio('https://drive.google.com/uc?export=view&id=1KJjnv8Ekmuh-eTaqXo0JcepSd7DiHX-v');
          popupMsg("failure");
        }
        swichSwicher("forceOff");
        lastAudioSrc = "";
        lastClickCardImage = "";
        removeStars();
        startBtnToRefresh(false);        
      }
    } else {
      setTimeout(check, 500);
    }
  }

  check();  
}

function clearImgOpacity () {
  const imgArr = document.querySelectorAll(".card-images");
    imgArr.forEach(element => {
      const el = element;
      el.style.opacity = "1";
    });
}

document.addEventListener('click',  (event) => {
  /* train/play swicher */
  if (event.target.id === "swich"&& gameIsStart === false) {   
    swichSwicher();
    swichBurger("forceOff");
  }
   /* if when game is play mode, user check switcher */
  else if (event.target.id === "swich" && gameIsStart === true) {
    gameIsStart = false;
    swichSwicher();
    swichBurger("forceOff");
    clearImgOpacity();
  }
  /* burger swicher */
  else if (event.target.id === "burger") {
    gameIsStart = false;
    clearImgOpacity();
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

 





  


