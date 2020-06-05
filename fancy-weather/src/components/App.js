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
import ErrorMsg from './ErrorMsg'
import './style.scss';

export default class App extends PureComponent {
  state = {
        scaleIsFarengeit: false,
        valueForSearchCity: null,
        pos: null,
        receivedCityName: null,
        receivedCountry: null,
        errorMsg: '',
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
  getValueForSearchCity = this.getValueForSearchCity.bind(this)
  getPosFromWeather = this.getPosFromWeather.bind(this)

  componentWillMount() {
    console.log('componentWillMount APP')
  }

  getNewCityWeather() {   
      const {valueForSearchCity} = this.state
      getWeather2Days(valueForSearchCity)
        .then((weatherData) => getWeather3Day(weatherData))
        .then((weatherData) => {
          this.setState({
            pos: weatherData.pos,
            receivedCityName: weatherData.cityName,
            receivedCountry: weatherData.country,
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
    console.log('componentDidMountAPP')
    //ChangeBackground();
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
    console.log('componentDidUpdateAPP')
    if(prevState.valueForSearchCity !== this.state.valueForSearchCity) { 
      this.setState({ errorMsg: '' });     
      this.getNewCityWeather()
    }
  }

  getValueForSearchCity(value) {
    this.setState({ valueForSearchCity: value });
  }

  getPosFromWeather(pos) {
    this.setState({ pos });
  }

  buttonListener(target) {
    target.classList.contains('spinner') && ChangeBackground(this.state.pos.longitude);
    target.classList.contains('btnRfrshImage') && ChangeBackground(this.state.pos.longitude);
    target.classList.contains('farengeit') && this.setState({ scaleIsFarengeit: true });
    target.classList.contains('celsius') && this.setState({ scaleIsFarengeit: false });
  }

  render() {
    console.log('renderAPP');
    console.log(this.state.errorMsg);

    if (!this.state.valueForSearchCity) return <div> Loading... </div>;
    if (!this.state.weather.nowTemp_c) return <div> Loading... </div>;

    return (
      <div className="container app">
        <Time
          place = {{
            longitude: this.state.pos.longitude,
            city: this.state.receivedCityName,
            country: this.state.receivedCountry
            }}
        />
        <div className="row justify-content-center pt-4 mb-4">
          <div className="col-sm-12 col-md-5 col-lg-7 col-xl-7 mb-4">
            <HeaderButton onChange={this.buttonListener} />
          </div>
          <div className="col-sm-12 col-md-7 col-lg-4 col-xl-4">
            <SearchForm getValueInput={this.getValueForSearchCity} />
            <ErrorMsg errorMsg={this.state.errorMsg}/>
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
