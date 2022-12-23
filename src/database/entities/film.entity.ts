import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityInterface } from '../../utils/entity.interface';
import { People } from './people.entity';
import { Planet } from './planet.entity';
import { Species } from './specie.entity';
import { Starships } from './starship.entity';
import { Vehicles } from './vehicle.entity';

@Entity()
export class Films implements EntityInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ name: 'episode_id', type: 'int' })
  episodeId: number;

  @Column({ name: 'opening_crawl' })
  openingCrawl: string;

  @Column()
  director: string;

  @Column()
  producer: string;

  @Column({ name: 'release_date' })
  releaseDate: number;

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
