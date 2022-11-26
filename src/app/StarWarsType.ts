export interface StarWarsType {
    name:string;
    model:string;
    manufacturer:string;
    cost_in_credits:string;
    length:string;
    max_atmosphering_speed:string;
    crew:string;
    passengers:string;
    cargo_capacity:string;
    consumables:string;
    vehicle_class:string;
    pilots:string[];
    films:string[];
    created:string;
    edited:string;
    url:string;
}

export interface PilotInformationType {
    birth_year: string
    eye_color: string
    gender: string
    hair_color: string
    height: string
    mass: string
    name: string
    skin_color: string

    created:string;
    edited: string;
    films: string[];
    homeworld: string;
    species: string[];
    starships: string[];
    url: string;
    vehicles: string[];

}