import { Films } from '../../swapi/films/film.entity';
import { People } from '../../swapi/people/people.entity';
import { Planet } from '../../swapi/planets/planet.entity';
import { Species } from '../../swapi/species/specie.entity';
import { Starships } from '../../swapi/starships/starship.entity';
import { Vehicles } from '../../swapi/vehicles/vehicle.entity';

export interface RelationsIdsInterface {
  films: number[];
  people: number[];
  planets: number[];
  species: number[];
  starships: number[];
  vehicles: number[];
}

export interface AllSwapiDataInterface {
  films: Films[];
  people: People[];
  planets: Planet[];
  species: Species[];
  starships: Starships[];
  vehicles: Vehicles[];
}
