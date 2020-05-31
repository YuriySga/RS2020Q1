export default function ChangeBackground() {
  const getImgLink = function () {
    const season = getSeason();
    const dayNight = dayOrNight();
    const keyUnsplash = 'ps01HPrdVfcJiF2_0zWrptAYbUqNVI5ATj-8Qo7ZveI';
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query={${dayNight},${season}}&client_id=${keyUnsplash}`;
    console.log(`background request ${url}`);
    return fetch(url)
      .then((response) => {
        if (response.ok) return response;
        throw new Error('background not found or limit is rated');
      })
      .then((response) => response.json())
      .then((data) => data.urls.regular);
  };

  const dayOrNight = () => {
    const hour = new Date().getHours();
    return (hour < 7) ? 'night' : 'day';
  };

  const getSeason = () => {
    const month = new Date().getMonth();
    if (month === 11 || month <= 1) return 'winter';
    if (month >= 2 || month <= 4) return 'spring';
    if (month >= 5 || month <= 7) return 'summer';
    return 'fall';
  };

  const changeBacgrImg = (link) => {
    document.body.style.background = `linear-gradient(rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%) center center / cover fixed, url(${link}) center center / cover no-repeat fixed`;
  };

  getImgLink()
    .then((link) => changeBacgrImg(link))
    .catch((err) => {
      console.log(err);
      changeBacgrImg('https://drive.google.com/uc?export=view&id=1WjdUgK1GjNqJM5RFA7QbbQIVinLb-beW');
    });
}
