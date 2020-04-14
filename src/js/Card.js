/* export default class Card { */
export class Card {
  constructor ({word, translation, image, audioSrc, ...Rest}) {
    this.word = word; 
    this.translation = translation;
    this.image = image; 
    this.audioSrc = audioSrc;
    this.Rest = Rest;
  }

  generateCart() {
    let template = `
    <div class="front">
      <img src=${this.image} class="card-img-top" alt="${this.word}"> 
      <div class="card-body">
        <p class="card-text h1">${this.word}</p>
        <div class="rotate"></div>
      </div>
    </div>
    <div class="back">
      <img src=${this.image} class="card-img-top" alt="">
      <div class="card-body">
        <p class="card-text h1">${this.translation}</p>
        <div class="rotate"></div>
      </div>
    </div>`;

    return template;
  }
}


/* module.exports = {
  Card
}; */



          
