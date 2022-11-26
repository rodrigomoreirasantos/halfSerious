import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StarWarsService } from 'src/app/services/starwars.service';
import { CardData } from '../card-spaceship/card-spaceship.component';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cards: CardData[] = []
  activeCard: number = -1;

  constructor(private starWarsService:StarWarsService) {}

  toPixels(rem: number) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  ngOnInit(): void{
    this.starWarsService.getStarWarsSapaceship((spaceships) => {
      this.cards = spaceships.map(spaceship => {
        return {
          type: "buttonCard",
          spaceship: spaceship,
          pilots: []
        }
      });
    })
  }

  insertCard(cardIndex: number) {
    let cardsPerLine = Math.floor(((window.innerWidth - this.toPixels(4)) / this.toPixels(16)) - 0.058);
    let gap = this.toPixels((cardsPerLine - 1) * 2);
    cardsPerLine = Math.floor(((window.innerWidth - this.toPixels(4) - gap) / this.toPixels(16)) - 0.058);

    let cardData = this.cards[cardIndex].spaceship;
    
    let infoCardPosition = -1;
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].type === "spaceshipInfoCard") {
        this.cards.splice(i, 1);
        infoCardPosition = i;
        break;
      }
    }

    if (cardIndex > infoCardPosition && infoCardPosition >= 0) {
      cardIndex -= 1;
    }
    let line = Math.ceil((cardIndex + 1) / cardsPerLine);

    if (this.activeCard != cardIndex) {
      this.starWarsService.getPilots(this.cards[cardIndex].spaceship.pilots, (pilots) => {
        if (Math.ceil(this.cards.length / cardsPerLine) == line) {
          this.cards[cardIndex].active = true;
          this.cards.push({
            type: "spaceshipInfoCard",
            spaceship: cardData,
            pilots
          })
        } else {
          let tempCards: CardData[] = [];
          this.cards.forEach((card, index) => {
            tempCards.push({
              ...card,
              active: index == cardIndex
            });
      
            if (index == (cardsPerLine * line) - 1) {
              tempCards.push({
                type: "spaceshipInfoCard",
                spaceship: cardData,
                pilots
              })
            }
          })
          this.cards = [...tempCards];
        }

        this.activeCard = cardIndex;
      })
    } else {
      this.activeCard = -1;
    }
  }
}
