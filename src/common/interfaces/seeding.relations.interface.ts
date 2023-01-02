import { Films } from '../../swapi/film/film.entity';
import { People } from '../../swapi/people/people.entity';
import { Planet } from '../../swapi/planet/planet.entity';
import { Species } from '../../swapi/specie/specie.entity';
import { Starships } from '../../swapi/starship/starship.entity';
import { Vehicles } from '../../swapi/vehicle/vehicle.entity';

type FetchedFilms = Films & {
  url: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
};

type FetchedPeople = People & {
  url: string;
  homeworld: string;
  species: string[];
};

type FetchedStarships = Starships & {
  url: string;
  pilots: string[];
};

type FetchedVehicles = Vehicles & {
  url: string;
  pilots: string[];
};

type FetchedSpecies = Species & {
  url: string;
  homeworld: string;
};

type FetchedPlanets = Planet & {
  url: string;
};

export interface AllSwapiDataInterface {
  films: FetchedFilms[];
  people: FetchedPeople[];
  planets: FetchedPlanets[];
  species: FetchedSpecies[];
  starships: FetchedStarships[];
  vehicles: FetchedVehicles[];
}
