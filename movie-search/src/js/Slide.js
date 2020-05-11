const img_not_found = 'https://drive.google.com/uc?export=view&id=15uyqGKo25FK40U-_OZQpcnscHV96F-OK';
const imgStar = `https://drive.google.com/uc?export=view&id=1ICFRTg53-oYkijajriYi1F3hCkDsb6WD`;

export class Slide {
  constructor ({Title, Poster, Year, imdbID, Rating, ...Rest}) {    
    this.title = Title; 
    this.imgSrc = (Poster === "N/A") ? img_not_found : Poster ;
    this.year = Year; 
    this.stars = (Rating === "N/A" || Rating === "undefined") ? "-" : Rating;
    this.Rest = Rest;
    this.imdbID = imdbID;
  }

  generateSlide() {
    let template = `
      <div class="swiper-slide">
        <div class="container swiper-slide-container swiper-slide-container--medium" >
          <a class="swiper-slide__title swiper-slide__title--medium" href="https://www.imdb.com/title/${this.imdbID}/videogallery/">${this.title}</a>
          <img class="swiper-slide__img" data-src="${this.imgSrc}" alt="">               
          <span class="swiper-slide__year swiper-slide__year--medium">${this.year}</span>
          <div class="swiper-slide__rating rating">
            <img class="rating__img-star" src="${imgStar}" alt=""> 
            <span class="rating__stars rating__stars--medium">${this.stars}</span>
          </div>
        </div>
      </div>`;
    return template;
  }
}
