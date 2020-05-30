import React, {Component, PureComponent} from 'react'
import './style.scss'

export default class Weather extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            scaleIsFarengeit: this.props.scaleIsFarengeit,
            time: new Date(),
            city: null,
            country: null,
            //weather now
            nowIcon: null,
            nowText: null,
            nowFeelslike_f: null,
            nowFeelslike_c: null,
            nowHumidity: null,
            nowWind_kph: null,
            nowWind_mph: null,
            nowTemp_c: null,
            nowTemp_f: null,
            //weather next 2 days(1)
            next1DayDate: null,
            next1DayTemp_c: null,
            next1DayTemp_f: null,
            ext1DayIcon: null,
            //(2)
            next2DayDate: null,
            next2DayTemp_c: null,
            next2DayTemp_f: null,
            next2DayIcon: null,
            //(3)
            next3DayDate: null,
            next3DayTemp_c: null,
            next3DayTemp_f: null,
            next3DayIcon: null
        }
    }

    componentWillMount() {
        const getCityOnIp = function ()  {             
            const ipinfoToken = 'f2e8d5915cf4d9'
            const ipinfoUrl = `https://ipinfo.io/json?token=${ipinfoToken}`
            return fetch(ipinfoUrl)
                .then((response) => {
                    if (response.ok !== true) {
                        throw new Error('Ошибка!')   
                    } else {
                        return response;
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    setS( {city: data.city } )                              
                    return data.city 
                })                
        }

        const getWeather2Days = function (city)  {
            const weatherapiKey = 'e663d7507066491f896180617202405'
            const urlWeather = `https://api.weatherapi.com/v1/forecast.json?key=${weatherapiKey}&q=${city}&days=4`
            return fetch(urlWeather)
                .then((response) => {
                    if (response.ok !== true) {
                        throw new Error('Ошибка!')   
                    } else {
                        return response;
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    setS( {
                        country: data.location.country,
                        nowIcon: data.forecast.forecastday[0].day.condition.icon,
                        nowText: data.forecast.forecastday[0].day.condition.text,
                        nowFeelslike_f: data.current.feelslike_f,
                            
                        nowFeelslike_c: data.current.feelslike_c,
                        nowHumidity: data.forecast.forecastday[0].day.avghumidity,
                        nowWind_kph: data.current.wind_kph,
                        nowWind_mph: data.current.wind_mph,
                        nowTemp_c: data.forecast.forecastday[0].day.avgtemp_c,
                        nowTemp_f: data.forecast.forecastday[0].day.avgtemp_f,
                            
                        next1DayDate: data.forecast.forecastday[1].date,
                        next1DayTemp_c: data.forecast.forecastday[1].day.maxtemp_c,
                        next1DayTemp_f: data.forecast.forecastday[1].day.maxtemp_f,
                        next1DayIcon: data.forecast.forecastday[1].day.condition.icon,
                            
                        next2DayDate: data.forecast.forecastday[2].date,
                        next2DayTemp_c: data.forecast.forecastday[2].day.maxtemp_c,
                        next2DayTemp_f: data.forecast.forecastday[2].day.maxtemp_f,
                        next2DayIcon: data.forecast.forecastday[2].day.condition.icon
                    } )

                    localStorage.fancyWeaterCountry = data.location.country
                        
                    return city
                })
        }
        
        const getWeather3Day = function (city)  {
            const date = new Date(Date.now() + (3600000*24*3))
            const dateParse = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`
            const weatherapiKey = 'e663d7507066491f896180617202405'
            const urlWeather = `https://api.weatherapi.com/v1/forecast.json?key=${weatherapiKey}&q=${city}&dt=${dateParse}`

            return fetch(urlWeather,{mode: "cors"})
                .then((response) => {
                    if (response.ok !== true) {
                        console.log(`Ошибка HTTP: ${response.status}`)
                        throw new Error('Ошибка!')   
                    } else {
                        return response;
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    setS( {
                        //weather next 3 day
                        next3DayDate: data.forecast.forecastday[0].date,
                        next3DayTemp_c: data.forecast.forecastday[0].day.maxtemp_c,
                        next3DayTemp_f: data.forecast.forecastday[0].day.maxtemp_f,
                        next3DayIcon: data.forecast.forecastday[0].day.condition.icon                        
                    } )
                    return 
                })
        }

        getCityOnIp()
            .then (city => getWeather2Days(city))
            .then (city => getWeather3Day(city))
            .catch(err => {
            });
            
        const setS = (objState) => {
            this.setState( objState )
        }
    }

    componentDidMount() { 
    }

    componentDidUpdate() {
        this.state.scaleIsFarengeit !== this.props.scaleIsFarengeit && this.setState( {scaleIsFarengeit: this.props.scaleIsFarengeit} )
    }

    render() {
        const timeDateParse = {
            daysOfWeek: {
                0: "Sunday",
                1: "Monday",
                2: "Tuesday",
                3: "Wednesday",
                4: "Thursday",
                5: "Friday",
                6: "Saturday"
            },
            daysOfWeekMin: {
                0: "Sun",
                1: "Mon",
                2: "Tues",
                3: "Wed",
                4: "Thurs",
                5: "Fri",
                6: "Sat"
            },
            months: {
                0: "January",
                1: "February",
                2: "March",
                3: "April",
                4: "May",
                5: "June",
                6: "July",
                7: "August",
                8: "September",
                9: "Oktober",
                10: "November",
                11: "December"
            } 
        }   
        
        /* setTimeout(()=>{ this.setState( {time: new Date()} ) }, 1000) */
          
        let city = ''
        let country =''
        let dayOfWeek = timeDateParse.daysOfWeek[this.state.time.getDay()]
        let dayOfMonth = String(this.state.time.getDate()).padStart(2, '0')
        let month = timeDateParse.months[this.state.time.getMonth()]
        let hours = String(this.state.time.getHours()).padStart(2, '0')
        let minutes = String(this.state.time.getMinutes()).padStart(2, '0')
        let seconds = String(this.state.time.getSeconds()).padStart(2, '0')
        let timeClock = `${dayOfWeek} ${dayOfMonth} ${month} ${hours}:${minutes}:${seconds}`
        let next1Day= timeDateParse.daysOfWeek[new Date(this.state.next1DayDate).getDay()]
        let next2Day= timeDateParse.daysOfWeek[new Date(this.state.next2DayDate).getDay()]
        let next3Day= timeDateParse.daysOfWeek[new Date(this.state.next3DayDate).getDay()]
        
        let nowT = (this.state.scaleIsFarengeit) ?  Math.trunc(this.state.nowTemp_f) + '°' : Math.trunc(this.state.nowTemp_c) + '°'
        let nowFeelslikeT = (this.state.scaleIsFarengeit) ? Math.trunc(this.state.nowFeelslike_f) : Math.trunc(this.state.nowFeelslike_c) + '°'
        let nowWind = `${(this.state.nowWind_kph * 1000 / 3600).toFixed(1)} m/s`
        let next1DayTemp = (this.state.scaleIsFarengeit) ? Math.trunc(this.state.next1DayTemp_f) + '°' : Math.trunc(this.state.next1DayTemp_c) + '°'
        let next2DayTemp = (this.state.scaleIsFarengeit) ? Math.trunc(this.state.next2DayTemp_f) + '°' : Math.trunc(this.state.next2DayTemp_c) + '°'
        let next3DayTemp = (this.state.scaleIsFarengeit) ? Math.trunc(this.state.next3DayTemp_f) + '°' : Math.trunc(this.state.next3DayTemp_c) + '°'
        
        if (this.state.country) {         
            city = this.state.city
            country = this.state.country
        }

        return ( 
            <div className="row justify-content-center data-weather">
                    <div className="col-12 text-center text-xl-left cityCountryEndTime">       
                        <div className="cityCountryName">                    
                            { `${city}, ${country}` }
                        </div>
                        <div className="dateTime">             
                            {timeClock}                        
                        </div>
                    </div> 
                <div className="col-sm-12 text-center text-sm-center col-md-6 col-lg-5 col-xl-7 mt-0 mt-sm-5 mt-md-5 mt-lg-5 mt-xl-5 mb-0 mb-sm-4 mb-md-4 mb-lg-4 mb-xl-4 nowTemp">
                    { nowT }
                </div>
                <div className="text-center text-xl-left col-12 col-sm-6 col-md-5 col-lg-4 col-xl-5 weatherSettings">
                        <img className="weatherSettings__img" src={this.state.nowIcon} alt=""/>
                        <ul className="weatherSettings__list p-0">
                            <li>{String(this.state.nowText).toUpperCase()}</li>
                            <li>{`FEELS LIKE: ${nowFeelslikeT}`}</li>
                            <li>{`WIND: ${nowWind}`}</li>
                            <li>{`HUMIDITY: ${this.state.nowHumidity}%`}</li>
                        </ul>
                   </div> 
                <div className="col-6 col-sm-6 col-md-10 col-lg-8 col-xl-12 row nextDaysWeather">
                    <div className="col-12 col-md-4 col-lg-4 col-xl-3 mt-4 mt-sm-0 mt-md-0 mt-lg-0 mt-xl-0">

                        <p className="nextDaysWeather__next1DayOfWeek">{next1Day}</p>
                        <div className="row">
                            <p className="col-8 nextDaysWeather__next1DayTemp">{next1DayTemp}</p>
                            <img className="col pl-0 nextDaysWeather__next1DayImg" src={this.state.next1DayIcon} alt=""/>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-lg-4 col-xl-3 mt-4 mt-sm-0 mt-md-0 mt-lg-0 mt-xl-0">
                        <p className="nextDaysWeather__next2DayOfWeek">{next2Day}</p>
                        <div className="row">
                            <p className="col-8 nextDaysWeather__next2DayTemp">{next2DayTemp}</p>
                            <img className="col pl-0 nextDaysWeather__next2DayImg" src={this.state.next2DayIcon} alt=""/>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-lg-4 col-xl-3 mt-4 mt-sm-0 mt-md-0 mt-lg-0 mt-xl-0">
                        <p className="nextDaysWeather__next3DayOfWeek">{next3Day}</p>
                        <div className="row">
                            <p className="col-8 nextDaysWeather__next3DayTemp">{next3DayTemp}</p>
                            <img className="col pl-0 nextDaysWeather__next3DayImg" src={this.state.next3DayIcon} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
















