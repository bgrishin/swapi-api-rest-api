import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Films } from '../film/film.entity';
import { FileImage, PublicImage } from '../images/images.entity';
import { People } from '../people/people.entity';
import { Species } from '../specie/specie.entity';

@Entity()
export class Planet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  diameter: string;

  @Column()
  rotation_period: string;

  @Column()
  orbital_period: string;

  @Column()
  gravity: string;

  @Column()
  population: string;

  @Column()
  climate: string;

  @Column()
  terrain: string;

  @Column()
  surface_water: string;

  @OneToMany(() => People, (people) => people.homeworld)
  residents: People[];

  @OneToMany(() => Species, (species) => species.homeworld)
  species: Species[];

  @ManyToMany(() => Films, (film) => film.planets)
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
