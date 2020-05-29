import React, {Component, PureComponent} from 'react'
import './style.scss'

export default class Weather extends PureComponent {
    constructor(props) {
        super(props)
    
        this.state = {
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
        console.log("-----componentWillMount") 

        let tempState ={};        

        const getCityOnIp = function ()  {             
            console.log("-----getCityOnIp")   
            const ipinfoToken = 'f2e8d5915cf4d9'
            const ipinfoUrl = `https://ipinfo.io/json?token=${ipinfoToken}`
            return fetch(ipinfoUrl)
                .then((response) => {
                    if (response.ok !== true) {
                        console.log(`Ошибка HTTP: ${response.status}`)
                        throw new Error('Ошибка!')   
                    } else {
                        console.log('getPosition OK')
                        return response;
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    localStorage.fancyWeatherCity = data.city 
                    //tempState.city = data.city
                    console.log(data.city)
                    setS( {city: data.city } )                              
                    return data.city 
                })                
        }

        const getWeather2Days = function (city)  {
            console.log("-----getWeather2Days")            
            
            const weatherapiKey = 'e663d7507066491f896180617202405'
            const urlWeather = `https://api.weatherapi.com/v1/forecast.json?key=${weatherapiKey}&q=${city}&days=4`
            return fetch(urlWeather)
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
                    console.log(data)                                     
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
                        
                    return city
                })
        }
        
        const getWeather3Day = function (city)  {
            console.log("-----getWeather3Day")
            const date = new Date(Date.now() + (3600000*24*3))
            const dateParse = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`
            const weatherapiKey = 'e663d7507066491f896180617202405'
            const urlWeather = `https://api.weatherapi.com/v1/forecast.json?key=${weatherapiKey}&q=${city}&dt=${dateParse}`
            console.log("------");
            console.log(dateParse);

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
                    console.log(data)
                    setS( {
                        //weather next 3 day
                        next3DayDate: data.forecast.forecastday[0].date,
                        next3DayTemp_c: data.forecast.forecastday[0].day.maxtemp_c,
                        next3DayTemp_f: data.forecast.forecastday[0].day.maxtemp_f,
                        next3DayIcon: data.forecast.forecastday[0].day.condition.icon                        
                    } )

                    console.log("temp3")
                    console.log(
                        data.forecast.forecastday[0].day.avgtemp_c,
                            );
                    return 
                })
        }

        getCityOnIp()
            .then (city => getWeather2Days(city))
            .then (city => getWeather3Day(city))
            .catch(err => {
                //console.error(err.message);
            });
            
        const setS = (objState) => {
            this.setState( objState )
        }

        console.log(this.state)
        

      /*   let time = new Date()
        setS( {time: time} ) */


    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    render() {
        console.log('render')
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
        
        let city = ''
        let country =''
        let dayOfWeek = timeDateParse.daysOfWeek[this.state.time.getDay()]
        let dayOfMonth = this.state.time.getDate()
        let month = timeDateParse.months[this.state.time.getMonth()]
        let hours = this.state.time.getHours()
        let minutes = this.state.time.getMinutes()
        let timeClock = `${dayOfWeek} ${dayOfMonth} ${month} ${hours}:${minutes}`
        let next1Day= timeDateParse.daysOfWeek[new Date(this.state.next1DayDate).getDay()]
        let next2Day= timeDateParse.daysOfWeek[new Date(this.state.next2DayDate).getDay()]
        let next3Day= timeDateParse.daysOfWeek[new Date(this.state.next3DayDate).getDay()]
        
        if (this.state.country) {         
            city = this.state.city
            country = this.state.country
        }

        return ( 
            <div className="row justify-content-center data-weather">
                {/* <div className="col-3"></div> */}
                    <div className="col-12 text-center text-xl-left cityCountryEndTime">       
                        <div className="cityCountryName">                    
                            { `${city}, ${country}` }
                        </div>
                        <div className="dateTime">             
                            {timeClock}                        
                        </div>
                    </div> 
               {/*  <div className="col-3"></div> */}

                <div className="col-sm-12 text-center text-sm-center col-md-6 col-lg-5 col-xl-7 mt-5 mb-4 nowTemp">
                    { `${Math.trunc(this.state.nowTemp_c)}°` }
                </div>
                <div className="text-center col-12 col-sm-6 col-md-5 col-lg-4 col-xl-5 weatherSettings">
                        <img className="weatherSettings__img" src={this.state.nowIcon} alt=""/>
                        <ul className="weatherSettings__list p-0">
                            <li>{String(this.state.nowText).toUpperCase()}</li>
                            <li>{`FEELS LIKE: ${this.state.nowFeelslike_c}°`}</li>
                            <li>{`WIND: ${this.state.nowWind_mph}miles/h`}</li>
                            <li>{`HUMIDITY: ${this.state.nowHumidity}%`}</li>
                        </ul>
                   </div> 
                <div className="col-6 col-sm-6 col-md-10 col-lg-8 col-xl-12 row nextDaysWeather">
                    <div className="col-12 col-md-4 col-lg-4 col-xl-4 mt-4 mt-sm-0 mt-md-0 mt-lg-0 mt-xl-0">

                        <p className="nextDaysWeather__next1DayOfWeek">{next1Day}</p>
                        <div className="row">
                            <p className="col-8 nextDaysWeather__next1DayTemp">{`${Math.trunc(this.state.next1DayTemp_c)}°`}</p>
                            <img className="col pl-0 nextDaysWeather__next1DayImg" src={this.state.next1DayIcon} alt=""/>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-lg-4 col-xl-4 mt-4 mt-sm-0 mt-md-0 mt-lg-0 mt-xl-0">
                        <p className="nextDaysWeather__next2DayOfWeek">{next2Day}</p>
                        <div className="row">
                            <p className="col-8 nextDaysWeather__next2DayTemp">{`${Math.trunc(this.state.next2DayTemp_c)}°`}</p>
                            <img className="col pl-0 nextDaysWeather__next2DayImg" src={this.state.next2DayIcon} alt=""/>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-lg-4 col-xl-4 mt-4 mt-sm-0 mt-md-0 mt-lg-0 mt-xl-0">
                        <p className="nextDaysWeather__next3DayOfWeek">{next3Day}</p>
                        <div className="row">
                            <p className="col-8 nextDaysWeather__next3DayTemp">{`${Math.trunc(this.state.next3DayTemp_c)}°`}</p>
                            <img className="col pl-0 nextDaysWeather__next3DayImg" src={this.state.next3DayIcon} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
















