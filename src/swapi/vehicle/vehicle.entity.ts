import { ApiProperty } from '@nestjs/swagger';
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
export class Vehicles {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  model: string;

  @Column()
  @ApiProperty()
  vehicle_class: string;

  @Column()
  @ApiProperty()
  manufacturer: string;

  @Column()
  @ApiProperty()
  length: string;

  @Column()
  @ApiProperty()
  cost_in_credits: string;

  @Column()
  @ApiProperty()
  crew: string;

  @Column()
  @ApiProperty()
  passengers: string;

  @Column()
  @ApiProperty()
  max_atmosphering_speed: string;

  @Column()
  @ApiProperty()
  cargo_capacity: string;

  @Column()
  @ApiProperty()
  consumables: string;

  @ManyToMany(() => Films, (film) => film.vehicles)
  @ApiProperty()
  films: Films[];

  @ManyToMany(() => People, (pilot) => pilot.vehicles)
  @JoinTable({
    joinColumn: { name: 'vehicle_id' },
    inverseJoinColumn: { name: 'pilot_id' },
  })
  @ApiProperty()
  pilots: People[];

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
