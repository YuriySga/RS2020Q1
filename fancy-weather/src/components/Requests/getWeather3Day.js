export default function getWeather3Day (resultWeather) {
  const date = new Date(Date.now() + (3600000 * 24 * 3));
  const dateParse = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const weatherapiKey = 'e663d7507066491f896180617202405';
  const urlWeather = `https://api.weatherapi.com/v1/forecast.json?key=${weatherapiKey}&q=${resultWeather.city}&dt=${dateParse}`;

  return fetch(urlWeather, { mode: 'cors' })
    .then((response) => {
      if (response.ok) return response;
      throw new Error('City not found');
    })
    .then((response) => response.json())
    .then((data) => {
      resultWeather.next3DayDate = data.forecast.forecastday[0].date;
      resultWeather.next3DayTemp_c = data.forecast.forecastday[0].day.maxtemp_c;
      resultWeather.next3DayTemp_f = data.forecast.forecastday[0].day.maxtemp_f;
      resultWeather.next3DayIcon = data.forecast.forecastday[0].day.condition.icon;

      return resultWeather;
    });
}
