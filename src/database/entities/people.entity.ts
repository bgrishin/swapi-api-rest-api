import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { EntityInterface } from '../../interfaces/entity.interface';
import { Films } from './film.entity';
import { Planet } from './planet.entity';
import { Species } from './specie.entity';
import { Starships } from './starship.entity';
import { Vehicles } from './vehicle.entity';

@Entity()
export class People implements EntityInterface {
  @PrimaryColumn()
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

  @ManyToMany(() => Starships, (starship) => starship.pilots, { eager: true })
  starships: Starships[];

  @ManyToMany(() => Vehicles, (vehicle) => vehicle.pilots, { eager: true })
  vehicles: Vehicles[];

  @ManyToMany(() => Species, (species) => species.people, { eager: true })
  @JoinTable({
    joinColumn: { name: 'person_id' },
    inverseJoinColumn: { name: 'species_id' },
  })
  species: Species[];

  // @ManyToMany(() => PublicImage)
  // @JoinTable({
  //   joinColumn: { name: 'person_id' },
  //   inverseJoinColumn: { name: 'public_image_id' },
  // })
  // publicImages: PublicImage[];
  //
  // @ManyToMany(() => FileImage)
  // @JoinTable({
  //   joinColumn: { name: 'person_id' },
  //   inverseJoinColumn: { name: 'file_image_id' },
  // })
  // fileImages: FileImage[];
}
