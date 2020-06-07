import React, { PureComponent } from 'react';
import timeDateParse from '../timeDateParse.js';
import './style.scss';

export default class Time extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ date: new Date() });
  }

  render() {
    const { city, country, longitude, lang } = this.props.place;
    const { date } = this.state;

    const UTC = Math.ceil(longitude / 15);
    const yearUTC = date.getUTCFullYear();
    const monthUTC = date.getUTCMonth();
    const dateUTC = date.getUTCDate();
    const hoursUTC = date.getUTCHours();
    const minutesUTC = date.getUTCMinutes();
    const secondsUTC = date.getUTCSeconds();
    const timeUTC = new Date(yearUTC, monthUTC, dateUTC, hoursUTC, minutesUTC, secondsUTC);
    const dateThisCity = new Date(timeUTC.getTime() + (UTC * 3600000));
    const dayOfWeek = timeDateParse.daysOfWeek[lang][dateThisCity.getDay()];
    const dayOfMonth = String(dateThisCity.getDate()).padStart(2, '0');
    const month = timeDateParse.months[lang][dateThisCity.getMonth()];
    const hours = String(dateThisCity.getHours()).padStart(2, '0');
    const minutes = String(dateThisCity.getMinutes()).padStart(2, '0');
    const seconds = String(dateThisCity.getSeconds()).padStart(2, '0');
    const clock = `${dayOfWeek} ${dayOfMonth} ${month} ${hours}:${minutes}:${seconds}`;


    return (
      <div className="col-12 text-center text-xl-left cityCountryEndTime">
        <div className="cityCountryName">
          { `${city}, ${country}` }
        </div>
        <div className="dateTime">
          {clock}
        </div>
      </div>
    );
  }
}
