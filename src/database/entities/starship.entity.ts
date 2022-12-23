import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityInterface } from '../../utils/entity.interface';
import { Films } from './film.entity';
import { People } from './people.entity';

@Entity()
export class Starships implements EntityInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column({ name: 'starship_class' })
  starshipClass: string;

  @Column()
  manufacturer: string;

  @Column({ name: 'cost_in_credits' })
  costInCredits: string;

  @Column()
  length: string;

  @Column()
  crew: string;

  @Column()
  passengers: string;

  @Column({ type: 'double', name: 'max_atmosphering_speed' })
  maxAtmospheringSpeed: string;

  @Column()
  mglt: string;

  @Column({ name: 'hyperdrive_rating' })
  hyperdriveRating: string;

  @Column({ name: 'cargo_capacity' })
  cargoCapacity: string;

  @Column()
  consumables: string;

  @ManyToMany(() => Films, (film) => film.starships)
  films: Films[];

  @ManyToMany(() => People, (pilot) => pilot.starships)
  @JoinTable({
    joinColumn: { name: 'starship_id' },
    inverseJoinColumn: { name: 'pilot_id' },
  })
  pilots: People[];

  // @ManyToMany(() => PublicImage)
  // @JoinTable({
  //   joinColumn: { name: 'starship_id' },
  //   inverseJoinColumn: { name: 'public_image_id' },
  // })
  // publicImages: PublicImage[];
  //
  // @ManyToMany(() => FileImage)
  // @JoinTable({
  //   joinColumn: { name: 'starship_id' },
  //   inverseJoinColumn: { name: 'file_image_id' },
  // })
  // fileImages: FileImage[];
}
