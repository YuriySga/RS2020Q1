import 'bootstrap';
import '../css/style.css';
import '../css/style.scss';
/* import '../../node_modules/swiper/js/swiper.min.js'; */
import Swiper from 'swiper';

import create from './utils/create.js';

const mySwiper = new Swiper ('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

 
});


//import { Card } from './Card';

//const cards = require('./cards.js');

//const cardArr = document.querySelectorAll(".card");

//let navPanelFlag = false;
console.log("Hello world");
//create(el, classNames, child, parent, ...dataAttr)






  


