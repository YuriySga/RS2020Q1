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
const searchForm__loadIndicator = document.querySelector(".search-form__load-indicator");


mySwiper.on('reachEnd', function () {
  if (mySwiper.slides.length === 0) {
    return;
  } else {  
    loadIndicatorOn(true);
    loadablePage +=1;
    getMovie(searchFilm, loadablePage)
      .then(data => addIdInSlides(data))
      .then(data => addSlides(data))
      .then(() => loadIndicatorOn(false));
  }
});



searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (searchForm__input.value === "") {
   return;
  } else {
    searchFilm = searchForm__input.value;
    getMovie(searchFilm, loadablePage)
      .then(data => addIdInSlides(data))
      .then(arr => createSlides(arr));
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

function getMovie(title, page) {
  let clearTitle = removeWhitespaces(title);  
  const url = `https://www.omdbapi.com/?s=${clearTitle}&page=${page}&apikey=${apikeyOmdb}`;
  
  return fetch(url)
    .then(response => response.json());
}

function getMovieReiting(filmId) {  
  const url = `https://www.omdbapi.com/?i=${filmId}&apikey=${apikeyOmdb}`;
  
  return fetch(url)
    .then(response => response.json())
    .then((data) => data.imdbRating);
}

function createSlides(arr) {  
    const arrMovies = arr;
    mySwiper.removeAllSlides();    
    arrMovies.forEach((film) => {       
      const slide = (new Slide (film));      
      mySwiper.appendSlide(slide.generateSlide());
    });     
}

function addSlides(arr) {
  return new Promise(function(resolve, reject) {
    const arrMovies = arr;
    arrMovies.forEach((film) => {       
      const slide = (new Slide (film));
      mySwiper.appendSlide(slide.generateSlide());
    });
    resolve(arrMovies);    
  });
}


function addIdInSlides(data) {
    return new Promise(function(resolve, reject) { 
      let arrMovies = data.Search;
      arrMovies.forEach((film) => {
        getMovieReiting(film.imdbID)
          .then(id => film.Rating = id);
      }); 
      setTimeout(() => {        
        resolve(arrMovies);
      }, 1000);
      //resolve(arrMovies);
    });
  }

function loadIndicatorOn(indicatorTurnOn) {
  if (indicatorTurnOn) {
    searchForm__loadIndicator.classList.add('search-form__load-indicator_active');
  } else {
    searchForm__loadIndicator.classList.remove('search-form__load-indicator_active');
  }
}


getMovie(searchFilm, loadablePage)
  .then(data => addIdInSlides(data))
  .then(arr => createSlides(arr));
 

  

  //.then(showAvatar)
  //.then(githubUser => alert(`Показ аватара ${githubUser.name} завершён`));
  
 /*  fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise(function(resolve, reject) { // (*)
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser); // (**)
    }, 3000);
  }))
  // срабатывает через 3 секунды
  .then(githubUser => alert(`Закончили показ ${githubUser.name}`));
  
 */



  


