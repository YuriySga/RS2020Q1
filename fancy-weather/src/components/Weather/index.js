// eslint-disable-next-line linebreak-style
import React, { PureComponent } from 'react';
import getWeather2Days from '../Requests/getWeather2Days.js';
import getWeather3Day from '../Requests/getWeather3Day.js';
import timeDateParse from '../Weather/timeDateParse.js';
import ChangeBackground from '../ChangeBackground';

import './style.scss';

export default class Weather extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      /* scaleIsFarengeit: this.props.scaleIsFarengeit,
      valueForSearch: this.props.valueForSearchCity,
      location: null,
      time: new Date(),
      city: null,
      country: null,
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
      ext1DayIcon: null,
      next2DayDate: null,
      next2DayTemp_c: null,
      next2DayTemp_f: null,
      next2DayIcon: null,
      next3DayDate: null,
      next3DayTemp_c: null,
      next3DayTemp_f: null,
      next3DayIcon: null, */
    };
  }

  componentWillMount() {
    /* getWeather2Days(this.state.valueForSearch)
      .then((weatherData) => getWeather3Day(weatherData))
      .then((weatherData) => this.setState(weatherData))
      .catch((err) => { console.log(err); }); */
  }


  componentDidUpdate() {
    /* this.state.scaleIsFarengeit !== this.props.scaleIsFarengeit && this.setState({ scaleIsFarengeit: this.props.scaleIsFarengeit });
    if (this.state.valueForSearch === this.props.valueForSearchCity) return;
    if (this.props.valueForSearchCity === '') return;
    this.setState({ valueForSearch: this.props.valueForSearchCity }); */

    /* getWeather2Days(this.props.valueForSearchCity)
      .then((weatherData) => getWeather3Day(weatherData))
      .then((weatherData) => {
        this.setState(weatherData);
        this.props.getPos(weatherData.location);
      })
      .then(() => ChangeBackground(this.props.valueForSearchCity))
      .catch((err) => { console.log(err); }); */
  }


  render() {
    console.log('render Weather');
    console.log(this.props);
    const { scaleIsFarengeit } = this.props;
    const {
      nowIcon,
      nowText,
      nowFeelslike_f,
      nowFeelslike_c,
      nowHumidity,
      nowWind_kph,
      nowWind_mph,
      nowTemp_c,
      nowTemp_f,
      next1DayDate,
      next1DayTemp_c,
      next1DayTemp_f,
      next1DayIcon,
      next2DayDate,
      next2DayTemp_c,
      next2DayTemp_f,
      next2DayIcon,
      next3DayDate,
      next3DayTemp_c,
      next3DayTemp_f,
      next3DayIcon,
    } = this.props.weather;

    const nowT = (scaleIsFarengeit) ? Math.trunc(nowTemp_f) : Math.trunc(nowTemp_c);
    const nowFeelslikeT = (scaleIsFarengeit) ? Math.trunc(nowFeelslike_f) + '°' : Math.trunc(nowFeelslike_c) + '°';
    const nowWind = `${(nowWind_kph * 1000 / 3600).toFixed(1)} m/s`;
    const next1DayTemp = (scaleIsFarengeit) ? Math.trunc(next1DayTemp_f) + '°' : Math.trunc(next1DayTemp_c) + '°';
    const next2DayTemp = (scaleIsFarengeit) ? Math.trunc(next2DayTemp_f) + '°' : Math.trunc(next2DayTemp_c) + '°';
    const next3DayTemp = (scaleIsFarengeit) ? Math.trunc(next3DayTemp_f) + '°' : Math.trunc(next3DayTemp_c) + '°';

    const next1Day = timeDateParse.daysOfWeek[new Date(next1DayDate).getDay()];
    const next2Day = timeDateParse.daysOfWeek[new Date(next2DayDate).getDay()];
    const next3Day = timeDateParse.daysOfWeek[new Date(next3DayDate).getDay()];

    return (
      <div className="row justify-content-center data-weather">
        <div className="col-12 text-center text-xl-left cityCountryEndTime">
          <div className="cityCountryName">
            {/* { `${city}, ${country}` } */}
          </div>
          <div className="dateTime">
            {/* {timeClock} */}
          </div>
        </div>
        <div className="col-sm-12 text-center text-sm-center col-md-6 col-lg-5 col-xl-7 mt-0 mt-sm-5 mt-md-5 mt-lg-5 mt-xl-5 mb-0 mb-sm-4 mb-md-4 mb-lg-4 mb-xl-4 nowTemp">
          { nowT }
        </div>
        <div className="text-center col-12 col-sm-6 col-md-5 col-lg-4 col-xl-5 weatherSettings">
          <img className="weatherSettings__img" src={nowIcon} alt="" />
          <ul className="weatherSettings__list p-0">
            <li>{String(nowText).toUpperCase()}</li>
            <li>{`FEELS LIKE: ${nowFeelslikeT}`}</li>
            <li>{`WIND: ${nowWind}`}</li>
            <li>{`HUMIDITY: ${nowHumidity}%`}</li>
          </ul>
        </div>
        <div className="col-8 col-sm-6 col-md-10 col-lg-8 col-xl-12 row nextDaysWeather">
          <div className="col-12 col-md-4 col-lg-4 col-xl-4 mt-4 mt-sm-0 mt-md-0 mt-lg-0 mt-xl-0">
            <p className="nextDaysWeather__next1DayOfWeek">{next1Day}</p>
            <div className="row">
              <p className="col-8 nextDaysWeather__next1DayTemp">{next1DayTemp}</p>
              <img className="col pl-0 nextDaysWeather__next1DayImg" src={next1DayIcon} alt="" />
            </div>
          </div>
          <div className="col-12 col-md-4 col-lg-4 col-xl-4 mt-4 mt-sm-0 mt-md-0 mt-lg-0 mt-xl-0">
            <p className="nextDaysWeather__next2DayOfWeek">{next2Day}</p>
            <div className="row">
              <p className="col-8 nextDaysWeather__next2DayTemp">{next2DayTemp}</p>
              <img className="col pl-0 nextDaysWeather__next2DayImg" src={next2DayIcon} alt="" />
            </div>
          </div>
          <div className="col-12 col-md-4 col-lg-4 col-xl-4 mt-4 mt-sm-0 mt-md-0 mt-lg-0 mt-xl-0">
            <p className="nextDaysWeather__next3DayOfWeek">{next3Day}</p>
            <div className="row">
              <p className="col-8 nextDaysWeather__next3DayTemp">{next3DayTemp}</p>
              <img className="col pl-0 nextDaysWeather__next3DayImg" src={next3DayIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
