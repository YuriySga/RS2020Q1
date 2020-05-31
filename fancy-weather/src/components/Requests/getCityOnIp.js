export default function getCityOnIp() {
  const ipinfoToken = 'f2e8d5915cf4d9';
  const ipinfoUrl = `https://ipinfo.io/json?token=${ipinfoToken}`;
  return fetch(ipinfoUrl)
    .then((response) => {
      if (response.ok) return response;
      throw new Error('City not found');
    })
    .then((response) => response.json())
    .then((data) => {
      return { city: data.city, country: data.country };
    });
}
