import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { People } from './people.entity';
import { Planet } from './planet.entity';
import { Specie } from './specie.entity';
import { Starship } from './starship.entity';
import { Vehicle } from './vehicle.entity';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
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

  @ManyToMany((type) => People, (people) => people.films)
  characters: People[];

  @ManyToMany((type) => Planet, (planet) => planet.films)
  @JoinTable()
  planets: Planet[];

  @ManyToMany((type) => Starship, (starship) => starship.films)
  @JoinTable()
  starships: Starship[];

  @ManyToMany((type) => Vehicle, (starship) => starship.films)
  @JoinTable()
  vehicles: Vehicle[];

  @ManyToMany((type) => Specie, (specie) => specie.films)
  @JoinTable()
  species: Specie[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created: string;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  edited: string;

  @Column()
  url: string;
}
