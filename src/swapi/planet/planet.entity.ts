import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  diameter: string;

  @Column()
  @ApiProperty()
  rotation_period: string;

  @Column()
  @ApiProperty()
  orbital_period: string;

  @Column()
  @ApiProperty()
  gravity: string;

  @Column()
  @ApiProperty()
  population: string;

  @Column()
  @ApiProperty()
  climate: string;

  @Column()
  @ApiProperty()
  terrain: string;

  @Column()
  @ApiProperty()
  surface_water: string;

  @OneToMany(() => People, (people) => people.homeworld)
  @ApiProperty()
  residents: People[];

  @OneToMany(() => Species, (species) => species.homeworld)
  @ApiProperty()
  species: Species[];

  @ManyToMany(() => Films, (film) => film.planets)
  @ApiProperty()
  films: Films[];

  @ManyToMany(() => PublicImage)
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'public_image_id' },
  })
  @ApiProperty()
  public_images: PublicImage[];

  @ManyToMany(() => FileImage)
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'file_image_id' },
  })
  @ApiProperty()
  file_images: FileImage[];
}
