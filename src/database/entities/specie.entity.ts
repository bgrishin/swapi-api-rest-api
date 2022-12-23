import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityInterface } from '../../utils/entity.interface';
import { Films } from './film.entity';
import { People } from './people.entity';
import { Planet } from './planet.entity';

@Entity()
export class Species implements EntityInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  classification: string;

  @Column()
  designation: string;

  @Column({ name: 'average_height' })
  averageHeight: string;

  @Column({ name: 'average_lifespan' })
  averageLifespan: string;

  @Column({ name: 'eye_colors' })
  eyeColors: string;

  @Column({ name: 'hair_colors' })
  hairColors: string;

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
