import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Films } from '../film/film.entity';
import { FileImage, PublicImage } from '../images/images.entity';
import { People } from '../people/people.entity';
import { Planet } from '../planet/planet.entity';

@Entity()
export class Species {
  @PrimaryGeneratedColumn()
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

  @ManyToMany(() => PublicImage)
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'public_image_id' },
  })
  public_images: PublicImage[];

  @ManyToMany(() => FileImage)
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'file_image_id' },
  })
  file_images: FileImage[];
}
