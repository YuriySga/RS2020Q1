import React, { PureComponent } from 'react';
import HeaderButton from './HeaderButton';
import SearchForm from './SearchForm';
import DataMap from './DataMap';
import Weather from './Weather';
import Time from './Time';
import ChangeBackground from './ChangeBackground';
import getCityOnIp from './Requests/getCityOnIp.js';
import getPosition from './getPosition.js';
import getWeather2Days from './Requests/getWeather2Days.js';
import getWeather3Day from './Requests/getWeather3Day.js';
import './style.scss';

export default class App extends PureComponent {
  state = {
        scaleIsFarengeit: false,
        valueForSearchCity: null,

        pos: null,
        receivedCityName: null,
        receivedCountry: null,

        UTC: null,

        //city: null,
        weather: {
          //receivedCityName: null,
          //country: null,
          //location: null,
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
  getValueForSearchCity = this.getValueForSearchCity.bind(this)
  getPosFromWeather = this.getPosFromWeather.bind(this)

  componentWillMount() {
    console.log('componentWillMount')
    /* ChangeBackground();
    getCityOnIp()
      .then((data) => {
        this.setState({ valueForSearchCity: data.city, country: data.country });
      })
      .then(() => getPosition())
      .then((pos) => { this.setState({ pos: pos.coords }); })
      .catch((err) => { console.log(err); });

    getPosition()
      .then((pos) => { this.setState({ pos: pos.coords }); })
      .catch((err) => { console.log(err); }); */
  }

  getUtcDate() {
    console.log('getUtcDate');
    const { longitude } = this.state.pos
    const utc = Math.ceil(longitude / 15)
    this.setState({ UTC: utc })     
  }


  componentDidMount() {
    console.log('componentDidMount')    
    ChangeBackground();
    getCityOnIp()
      .then((data) => this.setState({ valueForSearchCity: data.city }))
      .then(() => getPosition())      
      .then((pos) => this.setState({ pos: pos.coords }))
      .then(() => this.getUtcDate())

      .then(() => {
        const {valueForSearchCity} = this.state
        return getWeather2Days(valueForSearchCity)        
      })
      .then((weatherData) => getWeather3Day(weatherData))
      .then((weatherData) => {
        this.setState({
          pos: weatherData.pos,
          receivedCityName: weatherData.cityName,
          receivedCountry: weatherData.country,
          weather: weatherData.resultWeather,          
        })
      })
      .catch((err) => { console.log(err); })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate')
    if(prevState.valueForSearchCity !== this.state.valueForSearchCity) {
                 
    }
  }

  getValueForSearchCity(value) {
    this.setState({ valueForSearchCity: value });
  }

  getPosFromWeather(pos) {
    this.setState({ pos });
  }

  buttonListener(target) {
    target.classList.contains('spinner') && ChangeBackground();
    target.classList.contains('btnRfrshImage') && ChangeBackground();
    target.classList.contains('farengeit') && this.setState({ scaleIsFarengeit: true });
    target.classList.contains('celsius') && this.setState({ scaleIsFarengeit: false });
  }

  render() {
    console.log('renderAPP')

    if (!this.state.valueForSearchCity) return <div> Loading... </div>;
    if (!this.state.UTC) return <div> Loading... </div>;
    if (!this.state.weather.nowTemp_c) return <div> Loading... </div>;

    return (
      <div className="container app">
        <Time UTC = {this.state.UTC} />

        <div className="row justify-content-center pt-4 mb-4">
          <div className="col-sm-12 col-md-5 col-lg-7 col-xl-7 mb-4">
            <HeaderButton onChange={this.buttonListener} />
          </div>
          <div className="col-sm-12 col-md-7 col-lg-4 col-xl-4">
            <SearchForm getValueInput={this.getValueForSearchCity} />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-xl-7">
            <Weather weather={this.state.weather} scaleIsFarengeit={this.state.scaleIsFarengeit} />
          </div>
          <div className="col-12 col-xl-4 pt-0 pt-sm-0 pt-md-0 pt-lg-0 pt-xl-5">
            <DataMap pos={this.state.pos} className="mx-auto mx-sm-auto mx-md-auto mx-lg-auto float-xl-right" />
          </div>
        </div>
      </div>
    );
  }
}
