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
import { People } from '../people/people.entity';
import { Planet } from '../planet/planet.entity';

@Entity()
export class Species {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  classification: string;

  @Column()
  @ApiProperty()
  designation: string;

  @Column()
  @ApiProperty()
  average_height: string;

  @Column()
  @ApiProperty()
  average_lifespan: string;

  @Column()
  @ApiProperty()
  eye_colors: string;

  @Column()
  @ApiProperty()
  hair_colors: string;

  @Column()
  @ApiProperty()
  language: string;

  @ManyToOne(() => Planet, (planet) => planet.species, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'homeworld_id' })
  homeworld: Planet;

  @ManyToMany(() => People, (person) => person.species)
  @ApiProperty()
  people: People[];

  @ManyToMany(() => Films, (film) => film.species)
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
