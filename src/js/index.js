import 'bootstrap';
import '../css/style.css';
import '../css/style.scss';
/* const cards = require('./cards.js'); */
 import { Card } from './Card';
/*  const Card = require('./Card'); */

const cards = require('./cards.js');

const secondPageCardsName = 'Action (set A)';   /* by default */

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
loadSecondPageCard();

function loadSecondPageCard () {
  if (localStorage.pageName === undefined) throw new Error("no data in localStorage");
  const cardArr = document.querySelectorAll(".card");
  cardArr.forEach(function(item, index) { 
    let c = (new Card (cards[localStorage.pageName][index]));
    item.innerHTML = '';
    item.innerHTML = c.generateCart(); 
  }); 
}    




const nav = document.querySelector(".nav-container");
const navPanel = document.querySelector(".nav-panel");
const menuToggle = document.querySelector(".menuToggle");

let navPanelFlag = false;




createSecondPageCards(secondPageCardsName);
function createSecondPageCards (str) {
  let ind = cards[0].indexOf(str);
  /* console.log(ind); */

  
  /* console.log( new Card(cards[ind+1][0])); */
  
  
}

document.addEventListener('click',  (event) => {
  /* console.log(cards); */
  /* if click on gamburger checkbox; */
   if (event.target.type === "checkbox") {   
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
    navPanel.style.left = "-350px";
    navPanelFlag = false;
   }                             
  });

