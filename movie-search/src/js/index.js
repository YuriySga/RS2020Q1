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

  /* slidesPerView: 3, */
  grabCursor: true,

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 40
    }
  }

 
});


//import { Card } from './Card';

//const cards = require('./cards.js');

//const cardArr = document.querySelectorAll(".card");

//let navPanelFlag = false;
console.log("Hello world");
//create(el, classNames, child, parent, ...dataAttr)

function getMovieTitle(page) {
 const url = `https://www.omdbapi.com/?s=dream&page=${page}&apikey=5d6802cf`;

 return fetch(url)
   .then(res => res.json())
   .then(data => {
     console.log(data.Search[0].Title);
     console.log(data);
   });
}

/* getMovieTitle(1); */





  


