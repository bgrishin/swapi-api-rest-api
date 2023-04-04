import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  birth_year: string;

  @Column()
  @ApiProperty()
  gender: string;

  @Column()
  @ApiProperty()
  height: string;

  @Column()
  @ApiProperty()
  mass: string;

  @Column()
  @ApiProperty()
  eye_color: string;

  @Column()
  @ApiProperty()
  hair_color: string;

  @Column()
  @ApiProperty()
  skin_color: string;

  @ManyToOne(() => Planet, (planet) => planet.residents, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'homeworld_id' })
  @ApiProperty()
  homeworld: Planet;

  @ManyToMany(() => Films, (film) => film.characters)
  @ApiProperty()
  films: Films[];

  @ManyToMany(() => Starships, (starship) => starship.pilots)
  @ApiProperty()
  starships: Starships[];

  @ManyToMany(() => Vehicles, (vehicle) => vehicle.pilots)
  @ApiProperty()
  vehicles: Vehicles[];

  @ManyToMany(() => Species, (species) => species.people)
  @JoinTable({
    joinColumn: { name: 'person_id' },
    inverseJoinColumn: { name: 'species_id' },
  })
  @ApiProperty()
  species: Species[];

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
