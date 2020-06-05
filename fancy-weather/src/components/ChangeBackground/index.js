export default function ChangeBackground(longitude) {
  const UTC = Math.ceil(longitude / 15);
  const getImgLink = function () {
    const season = getSeason();
    const dayNight = dayOrNight();
    const keyUnsplash = 'ps01HPrdVfcJiF2_0zWrptAYbUqNVI5ATj-8Qo7ZveI';
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${dayNight} ${season}&client_id=${keyUnsplash}`;
    console.log(`background request ${url}`);
    return fetch(url)
      .then((response) => {
        if (response.ok) return response;
        throw new Error('background img request limit is exceeded');
      })
      .then((response) => response.json())
      .then((data) => data.urls.regular);
  };

  const dayOrNight = () => {
    const hour = new Date().getUTCHours() + UTC;
    return (hour < 7 || hour > 21) ? 'night' : 'day';
  };

  const getSeason = () => {
    const month = new Date().getMonth();
    if (month === 11 || month <= 1) return 'winter';
    if (month >= 2 || month <= 4) return 'spring';
    if (month >= 5 || month <= 7) return 'summer';
    return 'fall';
  };

  const changeBacgrImg = (link) => {
    const bgImg = new Image();
    bgImg.src = link;
    bgImg.onload = function () {
      document.body.style.backgroundImage = `url(${bgImg.src})`;
    };
  };

  getImgLink()
    .then((link) => changeBacgrImg(link))
    .catch((err) => {
      console.log(err);
      changeBacgrImg('https://drive.google.com/uc?export=view&id=1WjdUgK1GjNqJM5RFA7QbbQIVinLb-beW');
    });
}
