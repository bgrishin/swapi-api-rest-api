import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Films } from '../films/film.entity';
import { People } from '../people/people.entity';

@Entity()
export class Vehicles {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  vehicle_class: string;

  @Column()
  manufacturer: string;

  @Column()
  length: string;

  @Column()
  cost_in_credits: string;

  @Column()
  crew: string;

  @Column()
  passengers: string;

  @Column()
  max_atmosphering_speed: string;

  @Column()
  cargo_capacity: string;

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
