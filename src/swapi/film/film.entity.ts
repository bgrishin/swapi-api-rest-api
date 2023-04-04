import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileImage, PublicImage } from '../images/images.entity';
import { People } from '../people/people.entity';
import { Planet } from '../planet/planet.entity';
import { Species } from '../specie/specie.entity';
import { Starships } from '../starship/starship.entity';
import { Vehicles } from '../vehicle/vehicle.entity';

@Entity()
export class Films {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  episode_id: number;

  @Column()
  @ApiProperty()
  opening_crawl: string;

  @Column()
  @ApiProperty()
  director: string;

  @Column()
  @ApiProperty()
  producer: string;

  @Column()
  @ApiProperty()
  release_date: string;

  @ManyToMany(() => People, (character) => character.films)
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'character_id' },
  })
  @ApiProperty()
  characters: People[];

  @ManyToMany(() => Planet, (planet) => planet.films)
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'planet_id' },
  })
  @ApiProperty()
  planets: Planet[];

  @ManyToMany(() => Starships, (starship) => starship.films)
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'starship_id' },
  })
  @ApiProperty()
  starships: Starships[];

  @ManyToMany(() => Vehicles, (vehicle) => vehicle.films)
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'vehicle_id' },
  })
  @ApiProperty()
  vehicles: Vehicles[];

  @ManyToMany(() => Species, (species) => species.films)
  @JoinTable({
    joinColumn: { name: 'film_id' },
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
