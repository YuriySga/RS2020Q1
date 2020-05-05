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
const notice = document.querySelector(".notice-container_text");
const searchForm__imgButtonClear = document.querySelector(".search-form__img-button-clear");


mySwiper.on('reachEnd', function () {
  if (mySwiper.slides.length === 0) {
    return;
  } else {  
    loadIndicatorOn(true);
    loadablePage +=1;
    getMovie(searchFilm, loadablePage)
      .then(data => addRatingInSlides(data))
      .then(data => addSlides(data))
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
  } else {
    loadablePage = 1;
    searchFilm = searchForm__input.value;
    loadIndicatorOn(true);
    getMovie(searchFilm, loadablePage)
      .then(data => addRatingInSlides(data))
      .then(arr => createSlides(arr))
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

console.log("Hello world");

function removeWhitespaces(value) {
  let str = value;
  str = str.trim();
  str = str.replace(/ /g, '%20');
  return str;
}

function getMovie(title, page) {
  let clearTitle = removeWhitespaces(title); 
  console.log(clearTitle); 
  const url = `https://www.omdbapi.com/?s=${clearTitle}&page=${page}&apikey=${apikeyOmdb}`;
  
  return fetch(url)
    .then(response => {
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
      console.log(responseJson);
      if (responseJson.Response === "True") {
        return responseJson;
      } else {
        //notice.innerHTML = `No results for "${title}"`;
        throw new Error(`No results for "${title}"`);
      }
    });
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
      console.log(responseJson);
      if (responseJson.Response === "True") {
        return responseJson.imdbRating;
      } else {
        throw new Error("Ошибка imdbRating!");
      }   
    });
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


function addRatingInSlides(data) {
    console.log(data);
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
  .then(data => addRatingInSlides(data))
  .then(arr => createSlides(arr))
  .catch(() => {
    loadIndicatorOn(false);
    notice.innerHTML = `No results for "${searchFilm}"`;        
  });
//notice.innerHTML = `Showing results`;
 

  

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



  


