import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export class Starship {
  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  manufacturer: string;

  @Column()
  cost_in_credits: number;

  @Column()
  length: number;

  @Column()
  max_atmosphering_speed: number;

  @Column()
  crew: string;

  @Column()
  passengers: number;

  @Column()
  cargo_capacity: number;

  @Column()
  consumables: string;

  @Column()
  hyperdrive_rating: string;

  @Column()
  MGLT: number;

  @Column()
  starship_class: string;

  //people & films
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created: string;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  edited: string;

  @Column()
  url: string;
}
