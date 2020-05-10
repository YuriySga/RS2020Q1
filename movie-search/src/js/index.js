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
let keyboardContainerIsOn = false;

const mySwiper = new Swiper ('.swiper-container', swiper_settings);

const searchForm = document.querySelector(".search-form");
const searchForm__input = document.querySelector(".search-form__input");
const searchForm__loadIndicator = document.querySelector(".search-form__load-indicator");
const notice = document.querySelector(".notice-container_text");
const searchForm__imgButtonClear = document.querySelector(".search-form__img-button-clear");
const searchForm__imgButtonKeyboard = document.querySelector(".search-form__img-button-keyboard");

mySwiper.on('reachEnd', function () {
  if (mySwiper.slides.length === 0) {
    return;
  } else {  
    loadIndicatorOn(true);
    loadablePage +=1;
    getMovie(searchFilm, loadablePage)
      .then(() => getMovie(searchFilm, loadablePage))
      .then(data => addSlides(data))
      .then(() => imgOnload()) 
      .then(() => loadIndicatorOn(false))
      .catch(() => {
        loadIndicatorOn(false);
        notice.innerHTML = `No more results for "${searchFilm}"`;        
      });
  }
});

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (searchForm__input.value === "") {
   return;
  } else if (/^[А-яёЁ]*$/.test(searchForm__input.value)) {
    notice.innerHTML = `Error: do not use the Cyrillic`;
    return;    
  } else {
    loadablePage = 1;
    searchFilm = searchForm__input.value;
    loadIndicatorOn(true);
    getMovie(searchFilm, loadablePage)
      .then(() => getMovie(searchFilm, loadablePage)) 
      .then(arr => createSlides(arr))
      .then(() => imgOnload()) 
      .then(() => loadIndicatorOn(false))
      .catch(() => {
        loadIndicatorOn(false);
        notice.innerHTML = `No results for "${searchFilm}"`;        
      });      
  }
}); 

searchForm__imgButtonClear.addEventListener('click', (event) => {
  searchForm__input.value = "";
  searchFilm = "Terminator";
});

searchForm__imgButtonKeyboard.addEventListener('click', (event) => {
  const keyboardContainer = document.querySelector(".keyboard-container");
  if (keyboardContainerIsOn) {
    keyboardContainer.style.display = "none";
    keyboardContainerIsOn = false;
  } else {
    keyboardContainer.style.display = "block";
    keyboardContainerIsOn = true;    
  }  
});

function removeWhitespaces(value) {
  let notCorrectedTitle = value;
  //notCorrectedTitle = notCorrectedTitle.trim();
  //let strArr = str.split(" ");
  let correctedTitleArr = [];
  notCorrectedTitle.split(" ").forEach((word) => {    
    if (word !== "") correctedTitleArr.push(word);
  });
  //console.log(arr);
  //str = str.replace(/ /g, '%20');
  return correctedTitleArr.join('%20');
}

function getMovie(title, page) {
  let clearTitle = removeWhitespaces(title); 
  console.log(clearTitle); 
  const url = `https://www.omdbapi.com/?s=${clearTitle}&type=movie&page=${page}&apikey=${apikeyOmdb}`;
  
  return fetch(url)
    .then(response => {
      //console.log(response);
      //console.log(response);
      if (response.ok === true) {
        notice.innerHTML = `Showing results for "${title}"`;
        return response;
      } else {    
        notice.innerHTML = `Ошибка HTTP: ${response.status}`;  
        throw new Error("Ошибка!");      
      }
    })
    .then(response => response.json())
    .then(responseJson => {
      //console.log(responseJson);
      if (responseJson.Response === "True") {
        return responseJson;
      } else {
        //notice.innerHTML = `No results for "${title}"`;
        throw new Error(`No results for "${title}"`);
      }
    })    
    //.then(() => imgOnload()) 
    .then(data => addRatingInSlides(data))
    /* .catch(() => {
      loadIndicatorOn(false);
      notice.innerHTML = `No results for "${searchFilm}"`;        
    }); */
}

function getMovieReiting(filmId) {  
  const url = `https://www.omdbapi.com/?i=${filmId}&apikey=${apikeyOmdb}`;
  
  return fetch(url)
    .then(response => {
      //console.log(response);
      if (response.ok === true) {
        return response;
      } else {
        notice.innerHTML = `Ошибка HTTP: ${response.status}`;
        throw new Error("Ошибка!");  
      }
    })
    .then(response => response.json())
    .then(responseJson => {      
      if (responseJson.Response === "True") {
        return responseJson.imdbRating;
      } else {
        throw new Error("Ошибка imdbRating!");
      }   
    });
}

function createSlides(arr) {  
  return new Promise(function(resolve, reject) {  
    const arrMovies = arr;
    let arrSlides = [];
    mySwiper.removeAllSlides();    
    arrMovies.forEach((film) => { 
      //console.log(55555);
      //console.log(film.Poster);     
      const slide = (new Slide (film));
      arrSlides.push(slide.generateSlide());
    });
      mySwiper.appendSlide(arrSlides);       
      resolve();
  }); 
}

function addSlides(arr) {
  return new Promise(function(resolve, reject) {
    const arrMovies = arr;
    let arrSlides = [];
    arrMovies.forEach((film) => {       
      const slide = (new Slide (film));
      arrSlides.push(slide.generateSlide());
    });    
    mySwiper.appendSlide(arrSlides);
    resolve(arrMovies);    
  });
}


function addRatingInSlides(data) {
    //console.log(data);
    return new Promise(function(resolve, reject) { 
      let arrMovies = data.Search;
      arrMovies.forEach((film) => {
        getMovieReiting(film.imdbID)
          .then(id => film.Rating = id);
      }); 
      setTimeout(() => {        
        resolve(arrMovies);
      }, 1000);      
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
  .then(() => getMovie(searchFilm, loadablePage))
  //.then(data => addRatingInSlides(data))
  .then(arr => createSlides(arr))
  .then(() => imgOnload()) 
  .catch(() => {
    loadIndicatorOn(false);
    notice.innerHTML = `No results for "${searchFilm}"`;        
  });


 


function imgOnload () {
  return new Promise(function(resolve, reject) {
    [].forEach.call(document.querySelectorAll('img[data-src].swiper-slide__img'), function(img) {
      img.setAttribute('src', img.getAttribute('data-src'));
      img.onload = function() {
        img.removeAttribute('data-src');
      };
    });
    resolve();
  });
}


