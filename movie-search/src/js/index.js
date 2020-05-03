import 'bootstrap';
import '../css/style.css';
import '../css/style.scss';

import Swiper from 'swiper';
import { Slide } from './Slide';
import create from './utils/create.js';
const swiper_settings = require('./swiper_settings.js');

const apikeyOmdb = "5d6802cf";
let loadablePage = 1;
let searchFilm = "Terminator";

const mySwiper = new Swiper ('.swiper-container', swiper_settings);

const searchForm = document.querySelector(".search-form");
const searchForm__input = document.querySelector(".search-form__input");


mySwiper.on('reachEnd', function () {
  if (mySwiper.slides.length === 0) {
    return;
  } else {  
    //loadIndicatorOn();
    loadablePage +=1;
    getMovie(searchFilm, loadablePage)
      .then(data => addSlides(data));
  }
});



searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (searchForm__input.value === "") {
   return;
  } else {
    searchFilm = searchForm__input.value;
    getMovie(searchFilm, loadablePage)
      .then(data => createSlides(data));
  }
}); 



//const cards = require('./cards.js');

//const cardArr = document.querySelectorAll(".card");

//let navPanelFlag = false;
console.log("Hello world");
//create(el, classNames, child, parent, ...dataAttr)

//getMovieTitle("Terminator", "1");

function removeWhitespaces(value) {
  let str = value;
  str = str.trim();
  str = str.replace(/ /g, '%20');
  return str;
}

function getMovieTitle(title, page) {
  let clearTitle = removeWhitespaces(title);

  
 const url = `https://www.omdbapi.com/?s=${clearTitle}&page=${page}&apikey=${apikeyOmdb}`;

 return fetch(url)
   .then(res => res.json())
   .then(data => {
     console.log([data.Search]);
     console.log(data);
   });
}

/* getMovieTitle(1); */


function getMovie(title, page) {
  let clearTitle = removeWhitespaces(title);  
  const url = `https://www.omdbapi.com/?s=${clearTitle}&page=${page}&apikey=${apikeyOmdb}`;
  console.log(url);

  return fetch(url)
    .then(response => response.json());
}

/* function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`)
    .then(response => response.json());
} */

function createSlides(data) {
  console.log(data);
  return new Promise(function(resolve, reject) {
    const arrMovies = data.Search;
    mySwiper.removeAllSlides();
    arrMovies.forEach((film) => {       
      const slide = (new Slide (film));
      //const swiper_wrapper = document.querySelector(".swiper-wrapper");
      mySwiper.appendSlide(slide.generateSlide());
    });
    resolve(data);
  });
}

function addSlides(data) {
  return new Promise(function(resolve, reject) {
    const arrMovies = data.Search;
    arrMovies.forEach((film) => {       
      const slide = (new Slide (film));
      //const swiper_wrapper = document.querySelector(".swiper-wrapper");
      mySwiper.appendSlide(slide.generateSlide());
    });
    resolve(data);
  });
}

/* mySwiper.prependSlide('<div class="swiper-slide">Slide 0"</div>')
mySwiper.prependSlide([
   '<div class="swiper-slide">Slide 1"</div>',
   '<div class="swiper-slide">Slide 2"</div>'
]); */


/* function showAvatar(githubUser) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
} */

// Используем их:

getMovie(searchFilm, loadablePage)
  //.then(data => createSlides(data))
  .then(data => createSlides(data));

  

  //.then(showAvatar)
  //.then(githubUser => alert(`Показ аватара ${githubUser.name} завершён`));
  



  




  


