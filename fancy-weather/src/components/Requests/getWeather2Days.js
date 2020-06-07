export default function getWeather2Days(city) {
  const weatherapiKey = 'e663d7507066491f896180617202405';
  const urlWeather = `https://api.weatherapi.com/v1/forecast.json?key=${weatherapiKey}&q=${city}&days=4`;
  return fetch(urlWeather)
    .then((response) => {
      if (response.ok) return response;
      throw new Error('City not found');
    })
    .then((response) => response.json())
    .then((data) => {
      const pos = { latitude: data.location.lat, longitude: data.location.lon };
      const cityName = data.location.name;
      const { country } = data.location;
      const resultWeather = {
        nowIcon: data.forecast.forecastday[0].day.condition.icon,
        nowText: data.forecast.forecastday[0].day.condition.text,
        nowFeelslike_f: data.current.feelslike_f,

        nowFeelslike_c: data.current.feelslike_c,
        nowHumidity: data.forecast.forecastday[0].day.avghumidity,
        nowWind_kph: data.current.wind_kph,
        nowWind_mph: data.current.wind_mph,
        nowTemp_c: data.forecast.forecastday[0].day.maxtemp_c,
        nowTemp_f: data.forecast.forecastday[0].day.maxtemp_f,

        next1DayDate: data.forecast.forecastday[1].date,
        next1DayTemp_c: data.forecast.forecastday[1].day.maxtemp_c,
        next1DayTemp_f: data.forecast.forecastday[1].day.maxtemp_f,
        next1DayIcon: data.forecast.forecastday[1].day.condition.icon,

        next2DayDate: data.forecast.forecastday[2].date,
        next2DayTemp_c: data.forecast.forecastday[2].day.maxtemp_c,
        next2DayTemp_f: data.forecast.forecastday[2].day.maxtemp_f,
        next2DayIcon: data.forecast.forecastday[2].day.condition.icon,
      };

      return {
        pos,
        cityName,
        country,
        resultWeather,
      };
    });
}
