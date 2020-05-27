import React, {Component, PureComponent} from 'react'
import './style.css'

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
                    
                    /* tempState.country = data.location.country
                    tempState.nowIcon = data.current.condition.icon
                    tempState.nowText = data.current.condition.text
                    tempState.nowFeelslike_f = data.current.feelslike_f
                        
                    tempState.nowFeelslike_c = data.current.feelslike_c
                    tempState.nowHumidity = data.current.humidity
                    tempState.nowWind_kph = data.current.wind_kph
                    tempState.nowWind_mph = data.current.wind_mph
                    tempState.nowTemp_c = data.current.temp_c
                    tempState.nowTemp_f = data.current.temp_f
                        
                    tempState.next1DayDate = data.forecast.forecastday[1].date
                    tempState.next1DayTemp_c = data.forecast.forecastday[1].day.avgtemp_c
                    tempState.next1DayTemp_f = data.forecast.forecastday[1].day.avgtemp_f
                    tempState.ext1DayIcon = data.forecast.forecastday[1].day.condition.icon
                        
                    tempState.next2DayDate = data.forecast.forecastday[2].date
                    tempState.next2DayTemp_c = data.forecast.forecastday[2].day.avgtemp_c
                    tempState.next2DayTemp_f = data.forecast.forecastday[2].day.avgtemp_f
                    tempState.next2DayIcon = data.forecast.forecastday[2].day.condition.icon */
                    
                    setS( {
                        country: data.location.country,
                        nowIcon: data.current.condition.icon,
                        nowText: data.current.condition.text,
                        nowFeelslike_f: data.current.feelslike_f,
                            
                        nowFeelslike_c: data.current.feelslike_c,
                        nowHumidity: data.current.humidity,
                        nowWind_kph: data.current.wind_kph,
                        nowWind_mph: data.current.wind_mph,
                        nowTemp_c: data.current.temp_c,
                        nowTemp_f: data.current.temp_f,
                            
                        next1DayDate: data.forecast.forecastday[1].date,
                        next1DayTemp_c: data.forecast.forecastday[1].day.avgtemp_c,
                        next1DayTemp_f: data.forecast.forecastday[1].day.avgtemp_f,
                        ext1DayIcon: data.forecast.forecastday[1].day.condition.icon,
                            
                        next2DayDate: data.forecast.forecastday[2].date,
                        next2DayTemp_c: data.forecast.forecastday[2].day.avgtemp_c,
                        next2DayTemp_f: data.forecast.forecastday[2].day.avgtemp_f,
                        next2DayIcon: data.forecast.forecastday[2].day.condition.icon
                    } )
                        
                    return city
                })
        }
        
        const getWeather3Day = function (city)  {
            console.log("-----getWeather3Day")
            const date = new Date(Date.now() + (3600000*24*3))
            const dateParse = `${date.getFullYear()}-${String(date.getDay()-1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`
            const weatherapiKey = 'e663d7507066491f896180617202405'
            const urlWeather = `https://api.weatherapi.com/v1/forecast.json?key=${weatherapiKey}&q=${city}&dt=${dateParse}`
        console.log(urlWeather);

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
                    console.log(5551666)
                    //weather next 3 day
                    /* localStorage.fancyWeatherNext3DayDate = data.forecast.forecastday[0].date
                    localStorage.fancyWeatherNext3DayTemp_c = data.forecast.forecastday[0].day.avgtemp_c
                    localStorage.fancyWeatherNext3DayTemp_f = data.forecast.forecastday[0].day.avgtemp_f
                    localStorage.fancyWeatherNext3DayIcon = data.forecast.forecastday[0].day.condition.icon
                     */
                        //weather next 3 day
                    /* tempState.next3DayDate = data.forecast.forecastday[0].date
                    tempState.next3DayTemp_c = data.forecast.forecastday[0].day.avgtemp_c
                    tempState.next3DayTemp_f = data.forecast.forecastday[0].day.avgtemp_f
                    tempState.next3DayIcon = data.forecast.forecastday[0].day.condition.icon */

                    //Object.entries(tempState).map(([key, value]) =>this.setState( {key: value} ))
                    //this.setState( {city: city} )
                    //this.setState( {tempState: tempState} ) 
                    setS( {
                        //weather next 3 day
                        next3DayDate: data.forecast.forecastday[0].date,
                        next3DayTemp_c: data.forecast.forecastday[0].day.avgtemp_c,
                        next3DayTemp_f: data.forecast.forecastday[0].day.avgtemp_f,
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
        console.log('render');
        
        let city = ''
        let country =''


        
        if (this.state.country) {         
            city = this.state.city
            country = this.state.country
        }

        return ( 
            <div className="data-weather">         
                <div className="cityCountryName">
                    
                    { `${city}, ${country}` }
                </div>
                <div className="dateTime">
                    {/* //{ this.state.time } */}
                    <p>Сейчас {this.state.time.toLocaleTimeString()}.</p>
                </div>
               <div className="nowTemp">
                    { `${this.state.nowTemp_c}` }
                </div>
                <div className="weatherSettings">
                    { `${this.state.nowText}
                    ${this.state.nowFeelslike_c}
                    ${this.state.nowWind_kph}
                    ${this.state.nowHumidity}                    
                    ` }
                </div>
                <div className="weatherIcon">
                    <img src={this.state.nowIcon}/>
                </div>
                <div className="next1Day">
                    { `${this.state.next1DayTemp_c}` }
                </div>
                <div className="next2Day">
                    { `${this.state.next2DayTemp_c}` }
                </div>
                <div className="next3Day">
                    { `${this.state.next3DayTemp_c}` }
                </div>
            </div>
        )
    }
}

















/* 

const ipinfoToken = 'f2e8d5915cf4d9'
const ipinfoUrl = `https://ipinfo.io/json?token=${ipinfoToken}`
return fetch(ipinfoUrl)
    .then((response) => {
    if (response.ok !== true) {
        console.log(`Ошибка HTTP: ${response.status}`);
        throw new Error('Ошибка!');
    } else {
        console.log('getPosition OK');
        return response;
    }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        this.setState({city: data.city})
        
    }); */