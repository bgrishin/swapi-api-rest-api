import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Films } from '../film/film.entity';
import { FileImage, PublicImage } from '../images/images.entity';
import { People } from '../people/people.entity';

@Entity()
export class Starships {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  starship_class: string;

  @Column()
  manufacturer: string;

  @Column()
  cost_in_credits: string;

  @Column()
  length: string;

  @Column()
  crew: string;

  @Column()
  passengers: string;

  @Column()
  max_atmosphering_speed: string;

  @Column()
  MGLT: string;

  @Column()
  hyperdrive_rating: string;

  @Column()
  cargo_capacity: string;

  @Column()
  consumables: string;

  @ManyToMany(() => Films, (film) => film.starships)
  films: Films[];

  @ManyToMany(() => People, (pilot) => pilot.starships)
  @JoinTable({
    joinColumn: { name: 'starship_id' },
    inverseJoinColumn: { name: 'pilot_id' },
  })
  pilots: People[];

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
