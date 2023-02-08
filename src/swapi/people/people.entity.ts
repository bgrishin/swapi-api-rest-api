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
import { Planet } from '../planet/planet.entity';
import { Species } from '../specie/specie.entity';
import { Starships } from '../starship/starship.entity';
import { Vehicles } from '../vehicle/vehicle.entity';

@Entity()
export class People {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  birth_year: string;

  @Column()
  gender: string;

  @Column()
  height: string;

  @Column()
  mass: string;

  @Column()
  eye_color: string;

  @Column()
  hair_color: string;

  @Column()
  skin_color: string;

  @ManyToOne(() => Planet, (planet) => planet.residents, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'homeworld_id' })
  homeworld: Planet;

  @ManyToMany(() => Films, (film) => film.characters)
  films: Films[];

  @ManyToMany(() => Starships, (starship) => starship.pilots)
  starships: Starships[];

  @ManyToMany(() => Vehicles, (vehicle) => vehicle.pilots)
  vehicles: Vehicles[];

  @ManyToMany(() => Species, (species) => species.people)
  @JoinTable({
    joinColumn: { name: 'person_id' },
    inverseJoinColumn: { name: 'species_id' },
  })
  species: Species[];

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
