import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { StarWarsService } from 'src/app/services/starwars.service';

import { StarWarsType, PilotInformationType } from '../../StarWarsType'


export type CardData = {
  type: string;
  spaceship: StarWarsType;
  pilots: PilotInformationType[];
  active?: boolean;
}


@Component({
  selector: 'app-card-spaceship',
  templateUrl: './card-spaceship.component.html',
  styleUrls: ['./card-spaceship.component.scss']
})
export class CardSpaceshipComponent {
  pilot: undefined | number= undefined;
  pilotData: PilotInformationType = {
    birth_year: "",
    created: "",
    edited: "",
    eye_color: "",
    films: [],
    gender: "",
    hair_color: "",
    height: "",
    homeworld: "",
    mass: "",
    name: "",
    skin_color: "",
    species: [],
    starships: [],
    url: "",
    vehicles: []
  }
  
  constructor(private starWarsService:StarWarsService) {}

  @HostBinding('attr.data-extend')
  @Input() extend:boolean=false;

  @Input() cardIndex:number = -1;

  @Input() cardData: CardData = {
    type: "",
    spaceship: {
      name:'',
      model:'',
      manufacturer:'',
      cost_in_credits:'',
      length:'',
      max_atmosphering_speed:'',
      crew:'',
      passengers:'',
      cargo_capacity:'',
      consumables:'',
      vehicle_class:'',
      pilots:[],
      films:[],
      created:'',
      edited:'',
      url:'',
    },
    pilots: []
  }

  

  @Output() handleClickEvent = new EventEmitter<number>();

  handlePilotsInformation(){
    this.handleClickEvent.emit(this.cardIndex);
  }

  handlePilotSelection(pilotIndex: number | undefined){
    this.pilot = pilotIndex;
    
    if (pilotIndex != undefined) {
      this.pilotData = this.cardData.pilots[pilotIndex];
    }
  }
}
