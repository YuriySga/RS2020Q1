import React, { PureComponent } from 'react';
import HeaderButton from './HeaderButton';
import SearchForm from './SearchForm';
import DataMap from './DataMap';
import Weather from './Weather';
import ChangeBackground from './ChangeBackground';
import getCityOnIp from './Requests/getCityOnIp.js';
import getPosition from './getPosition.js';
import getWeather2Days from './Requests/getWeather2Days.js';
import getWeather3Day from './Requests/getWeather3Day.js';
import ErrorMsg from './ErrorMsg'
import translate from './Requests/translate.js';

import './style.scss';

export default class App extends PureComponent {
  state = {
        scaleIsFarengeit: 
          (localStorage.fancyWeatherScaleIsFarengeit === undefined || localStorage.fancyWeatherScaleIsFarengeit == 'false') ?
            false : true,
        valueForSearchCity: null,
        pos: null,
        receivedCityName: null,
        receivedCountry: null,
        errorMsg: '',
        lang: (localStorage.fancyWeatherLang === undefined) ? 'ru' : localStorage.fancyWeatherLang,
        weather: {
          nowIcon: null,
          nowText: null,
          nowFeelslike_f: null,
          nowFeelslike_c: null,
          nowHumidity: null,
          nowWind_kph: null,
          nowWind_mph: null,
          nowTemp_c: null,
          nowTemp_f: null,
          next1DayDate: null,
          next1DayTemp_c: null,
          next1DayTemp_f: null,
          next1DayIcon: null,
          next2DayDate: null,
          next2DayTemp_c: null,
          next2DayTemp_f: null,
          next2DayIcon: null,
          next3DayDate: null,
          next3DayTemp_c: null,
          next3DayTemp_f: null,
          next3DayIcon: null,  
        }        
    }

  buttonListener = this.buttonListener.bind(this)
  langButtonListener = this.langButtonListener.bind(this)
  getValueForSearchCity = this.getValueForSearchCity.bind(this)
  getPosFromWeather = this.getPosFromWeather.bind(this)
  translateCityCountry = this.translateCityCountry.bind(this)

  getNewCityWeather() {   
      const {valueForSearchCity} = this.state
      getWeather2Days(valueForSearchCity)
        .then((weatherData) => getWeather3Day(weatherData))
        .then((weatherData) => {
          const city = weatherData.cityName;
          const country = weatherData.country;
          this.translateCityCountry(city, country, this.state.lang);
          this.setState({
            pos: weatherData.pos,
            weather: weatherData.resultWeather,          
          })
        })
        .then(() => ChangeBackground(this.state.pos.longitude))
      .catch((err) => {
        this.setState({ errorMsg: 'City not found' });
        console.log(err.message);
      })
  }

  componentDidMount() {
    getCityOnIp()
      .then((data) => this.setState({ valueForSearchCity: data.city }))
      .then(() => getPosition())      
      .then((pos) => this.setState({ pos: pos.coords }))
      .then(() => {
        const {valueForSearchCity} = this.state
        return getWeather2Days(valueForSearchCity)  
      })
      .then((weatherData) => getWeather3Day(weatherData))
      .then((weatherData) => {
        const city = weatherData.cityName;
        const country = weatherData.country;
        this.translateCityCountry(city, country, this.state.lang);
        this.setState({
          pos: weatherData.pos,
          weather: weatherData.resultWeather,          
        })
      })
      .catch((err) => { console.log(err); })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.valueForSearchCity !== this.state.valueForSearchCity) { 
      this.setState({ errorMsg: '' });     
      this.getNewCityWeather()
    }
  }

  getValueForSearchCity(value) {
    if (/^[A-z]/.test(value)) {
      this.setState({ valueForSearchCity: value });
    } else {
      this.setState({ errorMsg: 'use the Latin alphabet' });
    }
  }

  getPosFromWeather(pos) {
    this.setState({ pos });
  }

  buttonListener(target) {
    target.classList.contains('spinner') && ChangeBackground(this.state.pos.longitude);
    target.classList.contains('btnRfrshImage') && ChangeBackground(this.state.pos.longitude);
    if (target.classList.contains('farengeit')) {
      localStorage.fancyWeatherScaleIsFarengeit = 'true';
      this.setState({ scaleIsFarengeit: true })
    };
    if (target.classList.contains('celsius')) {
      localStorage.fancyWeatherScaleIsFarengeit = 'false';
      this.setState({ scaleIsFarengeit: false })
    };
  }

  translateCityCountry(city, country, newLang, oldLang = 'en') {
    const cityName = city;
    const countryName = country;
    const wordsToTranslate = `${cityName}, ${countryName}`;

    translate(wordsToTranslate, newLang, oldLang)
      .then((words) => {
        const translatedCity = words[0].split(',')[0];
        const translatedCountry = words[0].split(',')[1];
        this.setState({
          receivedCityName: translatedCity,
          receivedCountry: translatedCountry,
        });
      })
  }

  langButtonListener(newLang) {
    const { lang, receivedCityName, receivedCountry } = this.state;    
    if (newLang !== lang) {
      localStorage.fancyWeatherLang = newLang;
      this.setState({ lang: newLang });
      this.translateCityCountry(receivedCityName, receivedCountry, newLang, lang); 
      this.setState({ lang: newLang });
    }
  }

  render() {
    if (!this.state.weather.nowTemp_c) return <div> Loading... </div>;
    return (
      <div className='wrapper'>
      <div className="container app">
        <div className="row justify-content-center pt-4 mb-4">
          <div className="col-sm-12 col-md-5 col-lg-7 col-xl-7 mb-4">
            <HeaderButton
              onChange={this.buttonListener}
              onClick={this.langButtonListener}
              lang= {this.state.lang}
              scaleIsFarengeit={this.state.scaleIsFarengeit}
            />
          </div>
          <div className="text-center col-sm-12 col-md-7 col-lg-4 col-xl-4 mx-5 mx-sm-0 mx-md-0 mx-lg-0 mx-xl-0">
            <SearchForm
              getValueInput={this.getValueForSearchCity}
              lang= {this.state.lang}
            />
            <ErrorMsg errorMsg={this.state.errorMsg} />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-xl-7">
            <Weather
              weather={this.state.weather}
              scaleIsFarengeit={this.state.scaleIsFarengeit}
              lang= {this.state.lang}
              place = {{
                longitude: this.state.pos.longitude,
                city: this.state.receivedCityName,
                country: this.state.receivedCountry,
                lang: this.state.lang,
                }}
            />
          </div>
          <div className="col-12 col-xl-4 pt-0 pt-sm-0 pt-md-0 pt-lg-0 pt-xl-5">
            <DataMap
              lang= {this.state.lang}
              pos={this.state.pos}
              className="mx-auto mx-sm-auto mx-md-auto mx-lg-auto float-xl-right"
            />
          </div>
        </div>
      </div>
      </div>
    );
  }
}
