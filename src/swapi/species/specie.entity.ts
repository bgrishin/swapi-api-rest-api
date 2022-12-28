import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Films } from '../films/film.entity';
import { People } from '../people/people.entity';
import { Planet } from '../planets/planet.entity';

@Entity()
export class Species {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  classification: string;

  @Column()
  designation: string;

  @Column()
  average_height: string;

  @Column()
  average_lifespan: string;

  @Column()
  eye_colors: string;

  @Column()
  hair_colors: string;

  @Column()
  language: string;

  @ManyToOne(() => Planet, (planet) => planet.species, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'homeworld_id' })
  homeworld: Planet;

  @ManyToMany(() => People, (person) => person.species)
  people: People[];

  @ManyToMany(() => Films, (film) => film.species)
  films: Films[];

  // @ManyToMany(() => PublicImage)
  // @JoinTable({
  //   joinColumn: { name: 'species_id' },
  //   inverseJoinColumn: { name: 'public_image_id' },
  // })
  // publicImages: PublicImage[];
  //
  // @ManyToMany(() => FileImage)
  // @JoinTable({
  //   joinColumn: { name: 'species_id' },
  //   inverseJoinColumn: { name: 'file_image_id' },
  // })
  // fileImages: FileImage[];
}
