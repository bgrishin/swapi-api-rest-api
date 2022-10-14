import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Film } from './film.entity';
import { People } from './people.entity';

@Entity()
export class Vehicle {
  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  manufacturer: string;

  @Column()
  cost_in_credits: number;

  @Column()
  length: number;

  @Column()
  max_atmosphering_speed: number;

  @Column()
  crew: string;

  @Column()
  passengers: number;

  @Column()
  cargo_capacity: number;

  @Column()
  consumables: string;

  @Column()
  vehicle_class: string;

  @ManyToMany((type) => People, (people) => people.vehicles)
  pilots: People[];

  @ManyToMany((type) => Film, (film) => film.vehicles)
  films: Film[];

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
