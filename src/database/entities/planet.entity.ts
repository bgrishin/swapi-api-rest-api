import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { EntityInterface } from '../../interfaces/entity.interface';
import { Films } from './film.entity';
import { People } from './people.entity';
import { Species } from './specie.entity';

@Entity()
export class Planet implements EntityInterface {
  @PrimaryColumn()
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
