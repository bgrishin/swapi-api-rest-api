import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { People } from '../people/people.entity';
import { Planet } from '../planets/planet.entity';
import { Species } from '../species/specie.entity';
import { Starships } from '../starships/starship.entity';
import { Vehicles } from '../vehicles/vehicle.entity';

@Entity()
export class Films {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  episode_id: number;

  @Column()
  opening_crawl: string;

  @Column()
  director: string;

  @Column()
  producer: string;

  @Column()
  release_date: string;

  @ManyToMany(() => People, (character) => character.films, { eager: true })
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'character_id' },
  })
  characters: People[];

  @ManyToMany(() => Planet, (planet) => planet.films, { eager: true })
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'planet_id' },
  })
  planets: Planet[];

  @ManyToMany(() => Starships, (starship) => starship.films, { eager: true })
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'starship_id' },
  })
  starships: Starships[];

  @ManyToMany(() => Vehicles, (vehicle) => vehicle.films, { eager: true })
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'vehicle_id' },
  })
  vehicles: Vehicles[];

  @ManyToMany(() => Species, (species) => species.films, { eager: true })
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'species_id' },
  })
  species: Species[];

  // @ManyToMany(() => PublicImage)
  // @JoinTable({
  //   joinColumn: { name: 'film_id' },
  //   inverseJoinColumn: { name: 'public_image_id' },
  // })
  // publicImages: PublicImage[];
  //
  // @ManyToMany(() => FileImage)
  // @JoinTable({
  //   joinColumn: { name: 'film_id' },
  //   inverseJoinColumn: { name: 'file_image_id' },
  // })
  // fileImages: FileImage[];
}
