import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Film } from './film.entity';
import { Planet } from './planet.entity';
import { Specie } from './specie.entity';
import { Starship } from './starship.entity';
import { Vehicle } from './vehicle.entity';

@Entity()
export class People {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  height: number;

  @Column()
  hair_color: string;

  @Column()
  skin_color: string;

  @Column()
  eye_color: string;

  @Column()
  birth_year: number;

  @Column()
  gender: string;

  @ManyToMany((type) => Planet, (planet) => planet.residents)
  @JoinTable()
  homeworld: Planet;

  @ManyToMany((type) => Film, (film) => film.characters)
  @JoinTable()
  films: Film[];

  @ManyToMany((type) => Specie, (specie) => specie.people)
  @JoinTable()
  species: Specie[];

  @ManyToMany((type) => Vehicle, (vehicle) => vehicle.pilots)
  @JoinTable()
  vehicles: Vehicle[];

  @ManyToMany((type) => Starship, (vehicle) => vehicle.pilots)
  @JoinTable()
  starships: Starship[];

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
