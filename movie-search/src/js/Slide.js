const preload_img = 'https://drive.google.com/uc?export=view&id=1tvk1lgDercuWcdI0D8_i3T6StqLl7tHe';
const img_not_found = 'https://drive.google.com/uc?export=view&id=15uyqGKo25FK40U-_OZQpcnscHV96F-OK';

export class Slide {
  constructor ({Title, Poster, Year, Rating, ...Rest}) {    
    this.title = Title; 
    this.imgSrc = (Poster === "N/A") ? img_not_found : Poster ;
    this.year = Year; 
    this.stars = (Rating === "N/A") ? "" : Rating;
    this.Rest = Rest;
  }

  generateSlide() {
    let template = `
      <div class="swiper-slide">
        <div class="container swiper-slide-container swiper-slide-container_medium" >
          <span class="swiper-slide__title swiper-slide__title_medium">${this.title}</span>
          <img class="swiper-slide__img" src="${this.imgSrc}" alt="">
          <span class="swiper-slide__year swiper-slide__year_medium">${this.year}</span>
          <span class="swiper-slide__stars swiper-slide__stars_medium">${this.stars}</span>
        </div>
      </div>`;      
    return template;
  }  
}



