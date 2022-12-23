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
export class Vehicles implements EntityInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column({ name: 'vehicle_class' })
  vehicleClass: string;

  @Column()
  manufacturer: string;

  @Column()
  length: string;

  @Column({ name: 'cost_in_credits' })
  costInCredits: string;

  @Column()
  crew: string;

  @Column()
  passengers: string;

  @Column({ name: 'max_atmospering_speed' })
  maxAtmospheringSpeed: string;

  @Column({ name: 'cargo_capacity' })
  cargoCapacity: string;

  @Column()
  consumables: string;

  @ManyToMany(() => Films, (film) => film.vehicles)
  films: Films[];

  @ManyToMany(() => People, (pilot) => pilot.vehicles)
  @JoinTable({
    joinColumn: { name: 'vehicle_id' },
    inverseJoinColumn: { name: 'pilot_id' },
  })
  pilots: People[];

  // @ManyToMany(() => PublicImage)
  // @JoinTable({
  //   joinColumn: { name: 'vehicle_id' },
  //   inverseJoinColumn: { name: 'public_image_id' },
  // })
  // publicImages: PublicImage[];
  //
  // @ManyToMany(() => FileImage)
  // @JoinTable({
  //   joinColumn: { name: 'vehicle_id' },
  //   inverseJoinColumn: { name: 'file_image_id' },
  // })
  // fileImages: FileImage[];
}
