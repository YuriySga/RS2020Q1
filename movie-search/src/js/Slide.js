const preload_img = 'https://drive.google.com/uc?export=view&id=1tvk1lgDercuWcdI0D8_i3T6StqLl7tHe';
const img_not_found = 'https://drive.google.com/uc?export=view&id=15uyqGKo25FK40U-_OZQpcnscHV96F-OK';
const imgStar = `https://drive.google.com/uc?export=view&id=1ICFRTg53-oYkijajriYi1F3hCkDsb6WD`;


export class Slide {
  constructor ({Title, Poster, Year, imdbID, Rating, ...Rest}) {    
    this.title = Title; 
    this.imgSrc = (Poster === "N/A") ? img_not_found : Poster ;
    this.year = Year; 
    this.stars = (Rating === "N/A") ? "" : Rating;
    this.Rest = Rest;
    this.imdbID = imdbID;
  }

  generateSlide() {
    let template = `
      <div class="swiper-slide">
        <div class="container swiper-slide-container swiper-slide-container_medium" >
          <a class="swiper-slide__title swiper-slide__title_medium" href="https://www.imdb.com/title/${this.imdbID}/videogallery/">${this.title}</a>
          <img class="swiper-slide__img" src="${this.imgSrc}" alt="">          
          <span class="swiper-slide__year swiper-slide__year_medium">${this.year}</span>
          <div class="rating-container">
            <img class="swiper-slide__img-star" src="${imgStar}" alt=""> 
            <span class="swiper-slide__stars swiper-slide__stars_medium">${this.stars}</span>
          </div>
        </div>
      </div>`;      
    return template;
  }  
}

//<img class="swiper-slide__img" src="${this.imgSrc}" alt=""></img>
//<img onerror="this.onerror=null; this.src='${img_not_found}';" src="${this.imgSrc}" alt=""></img>


