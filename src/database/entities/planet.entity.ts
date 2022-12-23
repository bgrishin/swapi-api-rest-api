import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityInterface } from '../../utils/entity.interface';
import { Films } from './film.entity';
import { People } from './people.entity';
import { Species } from './specie.entity';

@Entity()
export class Planet implements EntityInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  diameter: string;

  @Column({ name: 'rotation_period' })
  rotationPeriod: string;

  @Column({ name: 'orbital_period' })
  orbitalPeriod: string;

  @Column()
  gravity: string;

  @Column()
  population: string;

  @Column()
  climate: string;

  @Column()
  terrain: string;

  @Column({ name: 'surface_water' })
  surfaceWater: string;

  @OneToMany(() => People, (people) => people.homeworld, { eager: true })
  residents: People[];

  @OneToMany(() => Species, (species) => species.homeworld, { eager: true })
  species: Species[];

  @ManyToMany(() => Films, (film) => film.planets)
  films: Films[];

  // @ManyToMany(() => PublicImage)
  // @JoinTable({
  //   joinColumn: { name: 'planet_id' },
  //   inverseJoinColumn: { name: 'public_image_id' },
  // })
  // publicImages: PublicImage[];
  //
  // @ManyToMany(() => FileImage)
  // @JoinTable({
  //   joinColumn: { name: 'planet_id' },
  //   inverseJoinColumn: { name: 'file_image_id' },
  // })
  // fileImages: FileImage[];
}
