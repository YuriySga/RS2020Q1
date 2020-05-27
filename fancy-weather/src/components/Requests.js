import React from 'react'

export default function Requests(reqOk) {
    

    localStorage.fancyWeatherCoords = ''
    
    
    
    console.log("-----Requests")
    const getPosition = function (options) {
        console.log("-----getPosition")
        return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
      }

    
      getPosition()
        .then((pos) => {
            localStorage.fancyWeatherCoords = pos.coords
            console.log("-----"+localStorage.fancyWeatherCoords);
        })
        .then (() => getCityOnIp())
        .then (() => getWeather2Days())
        .then (() => getWeather3Day())
        .catch((err) => {
          console.error(err.message);
        });
        
    

    
   
        


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
                    /* console.log(data) */
                    localStorage.fancyWeatherCity = data.city
                    localStorage.fancyWeatherCityCode = data.country           
                    return     
                })                
        }
    
        const getWeather2Days = function (city)  {
            console.log("-----getWeather2Days")            
            
            const weatherapiKey = 'e663d7507066491f896180617202405'
            const urlWeather = `https://api.weatherapi.com/v1/forecast.json?key=${weatherapiKey}&q=${localStorage.fancyWeatherCity}&days=4`
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
                    localStorage.fancyWeatherCountry = data.location.country
                    //weather now
                    localStorage.fancyWeatherNowIcon = data.current.condition.icon
                    localStorage.fancyWeatherNowText = data.current.condition.text
                    localStorage.fancyWeatherNowFeelslike_f = data.current.feelslike_f
                    localStorage.fancyWeatherNowFeelslike_c = data.current.feelslike_c
                    localStorage.fancyWeatherNowHumidity = data.current.humidity
                    localStorage.fancyWeatherNowWind_kph = data.current.wind_kph
                    localStorage.fancyWeatherNowWind_mph = data.current.wind_mph
                    localStorage.fancyWeatherNowTemp_c = data.current.temp_c
                    localStorage.fancyWeatherNowTemp_f = data.current.temp_f                    
                    //weather next 2 days(1)
                    localStorage.fancyWeatherNext1DayDate = data.forecast.forecastday[1].date
                    localStorage.fancyWeatherNext1DayTemp_c = data.forecast.forecastday[1].day.avgtemp_c
                    localStorage.fancyWeatherNext1DayTemp_f = data.forecast.forecastday[1].day.avgtemp_f
                    localStorage.fancyWeatherNext1DayIcon = data.forecast.forecastday[1].day.condition.icon
                    //(2)
                    localStorage.fancyWeatherNext1DayDate = data.forecast.forecastday[2].date
                    localStorage.fancyWeatherNext2DayTemp_c = data.forecast.forecastday[2].day.avgtemp_c
                    localStorage.fancyWeatherNext1DayTemp_f = data.forecast.forecastday[2].day.avgtemp_f
                    localStorage.fancyWeatherNext1DayIcon = data.forecast.forecastday[2].day.condition.icon
                    return 987654
                })
        }

        const getWeather3Day = function (city)  {
            console.log("-----getWeather3Day")
            const date = new Date(Date.now() + (3600000*24*3))
            const dateParse = `${date.getFullYear()}-${String(date.getDay()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`
            const weatherapiKey = 'e663d7507066491f896180617202405'
            const urlWeather = `https://api.weatherapi.com/v1/forecast.json?key=${weatherapiKey}&q=${localStorage.fancyWeatherCity}&dt=${dateParse}`

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
                    //weather next 3 day
                    localStorage.fancyWeatherNext3DayDate = data.forecast.forecastday[0].date
                    localStorage.fancyWeatherNext3DayTemp_c = data.forecast.forecastday[0].day.avgtemp_c
                    localStorage.fancyWeatherNext3DayTemp_f = data.forecast.forecastday[0].day.avgtemp_f
                    localStorage.fancyWeatherNext3DayIcon = data.forecast.forecastday[0].day.condition.icon
                    return undefined
                })
        }

    /* const articleElements = articles.map(article =>
        <li key = {article.id}><Article article = {article}/></li> 
    ) 
    */         
   return '-----753753753----'
}



