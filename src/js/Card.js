export class Card {
  constructor ({word, translation, image, audioSrc, ...Rest}) {
    this.word = word; 
    this.translation = translation;
    this.image = image; 
    this.audioSrc = audioSrc;
    this.Rest = Rest;
  }

  generateCart(id) {
    let template = `
    <div class="front">
      <img src=${this.image} class="card-img-top card-images" alt="${this.word}"> 
      <div class="card-body my-card-body">
        <p class="card-text h1">${this.word}</p>
        <div class="rotate" id="${id}"></div>
      </div>
    </div>
    <div class="back">
      <img src=${this.image} class="card-img-top card-images" alt="">
      <div class="card-body my-card-body">
        <p class="card-text h1">${this.translation}</p>
      </div>
    </div>`;
    return template;
  }

  generateStatisticsWords() {
    let template = `<li>${this.word} - ${this.translation}</li>`;
    return template;
  }
}





          
