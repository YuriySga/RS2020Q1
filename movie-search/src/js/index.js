import 'bootstrap';
import '../css/style.css';
import '../css/style.scss';

import Swiper from 'swiper';
import { Slide } from './Slide';

const swiper_settings = require('./swiper_settings.js');
const apikeyOmdb = '5d6802cf';
const mySwiper = new Swiper('.swiper-container', swiper_settings);
const searchForm = document.querySelector('.search-form');
const searchForm__input = document.querySelector('.search-form__input');
const searchForm__loadIndicator = document.querySelector('.search-form__load-indicator');
const notice = document.querySelector('.notice__text');
const searchForm__buttonClear = document.querySelector('.search-form__button-clear');
const searchForm__buttonKeyboard = document.querySelector('.search-form__button-keyboard');

let loadablePage = 1;
let searchFilm = 'Terminator';
let foundFilm = '';
let keyboardContainerIsOn = false;

startSearchMovie();

function startSearchMovie () {
  loadIndicatorOn(true);
    getMovie(searchFilm, loadablePage)
      .then((arr) => createSlides(arr))
      .then(() => imgOnload())
      .then(() => loadIndicatorOn(false))
      .then(() => foundFilm = searchFilm)
      .catch(() => {
        loadIndicatorOn(false);
        notice.innerHTML = `No results were found for "${searchFilm}"`;
      });
}

function loadIndicatorOn(indicatorTurnOn) {
  if (indicatorTurnOn) {
    searchForm__loadIndicator.classList.add('search-form__load-indicator_active');
  } else {
    searchForm__loadIndicator.classList.remove('search-form__load-indicator_active');
  }
}

function getMovie(title, page) {
  let clearTitle = removeWhitespaces(title);
  const url = `https://www.omdbapi.com/?s=${clearTitle}&type=movie&page=${page}&apikey=${apikeyOmdb}`;

  return fetch(url)
    .then((response) => {
      if (response.ok === true) {
        notice.innerHTML = `Showing results for "${title}"`;
        return response;
      } else {
        notice.innerHTML = `Ошибка HTTP: ${response.status}`;
        throw new Error('Ошибка!');
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.Response === 'True') {
        return responseJson;
      } else {
        throw new Error(`No results were found for "${title}"`);
      }
    })
    .then((data) => addRatingInSlides(data));
}

function createSlides(arr) {
  return new Promise(function (resolve) {
    const arrMovies = arr;
    let arrSlides = [];
    mySwiper.removeAllSlides();
    arrMovies.forEach((film) => {
      const slide = new Slide(film);
      arrSlides.push(slide.generateSlide());
    });
    mySwiper.appendSlide(arrSlides);
    resolve();
  });
}

function imgOnload() {
  return new Promise(function (resolve, reject) {
    [].forEach.call(
      document.querySelectorAll('img[data-src].swiper-slide__img'),
      function (img) {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.onload = function () {
          img.removeAttribute('data-src');
        };
      }
    );
    resolve();
  });
}

function removeWhitespaces(value) {
  let notCorrectedTitle = value;
  let correctedTitleArr = [];
  notCorrectedTitle.split(' ').forEach((word) => {
    if (word !== '') correctedTitleArr.push(word);
  });
  return correctedTitleArr.join('%20');
}

function addRatingInSlides(data) {
  return new Promise(function (resolve) {
    let arrMovies = data.Search;
    arrMovies.forEach((film) => {
      getMovieReiting(film.imdbID).then((id) => (film.Rating = id));
    });
    setTimeout(() => {
      resolve(arrMovies);
    }, 1000);
  });
}

function getMovieReiting(filmId) {
  const url = `https://www.omdbapi.com/?i=${filmId}&apikey=${apikeyOmdb}`;

  return fetch(url)
    .then((response) => {
      if (response.ok === true) {
        return response;
      } else {
        notice.innerHTML = `Ошибка HTTP: ${response.status}`;
        throw new Error('Ошибка!');
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.Response === 'True') {
        return responseJson.imdbRating;
      } else {
        throw new Error('Ошибка imdbRating!');
      }
    });
}

mySwiper.on('reachEnd', function () {
  if (mySwiper.slides.length === 0) {
    return;
  } else {
    addMoreMovieInSlider();    
  }
});

function addMoreMovieInSlider() {
  loadIndicatorOn(true);
  loadablePage += 1;
  getMovie(foundFilm, loadablePage)
    .then((data) => addSlides(data))
    .then(() => imgOnload())
    .then(() => loadIndicatorOn(false))
    .catch(() => {
      loadIndicatorOn(false);
      notice.innerHTML = `No more results for "${foundFilm}"`;
    });
}

function addSlides(arr) {
  return new Promise(function (resolve) {
    const arrMovies = arr;
    let arrSlides = [];
    arrMovies.forEach((film) => {
      const slide = new Slide(film);
      arrSlides.push(slide.generateSlide());
    });
    mySwiper.appendSlide(arrSlides);
    resolve(arrMovies);
  });
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (searchForm__input.value === '') {
    return;
  } else if (/^[А-яёЁ]*$/.test(searchForm__input.value)) {
    notice.innerHTML = `Error: do not use the Cyrillic`;
    return;
  } else {
    loadablePage = 1;
    searchFilm = searchForm__input.value;
    startSearchMovie();   
  }
});

searchForm__buttonClear.addEventListener('click', (event) => {
  searchForm__input.value = '';
});

searchForm__buttonKeyboard.addEventListener('click', (event) => {
  const keyboardContainer = document.querySelector('.keyboard-container');
  if (keyboardContainerIsOn) {
    keyboardContainer.style.display = 'none';
    keyboardContainerIsOn = false;
  } else {
    keyboardContainer.style.display = 'block';
    keyboardContainerIsOn = true;
  }
});