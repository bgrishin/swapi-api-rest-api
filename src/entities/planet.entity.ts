import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Planet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rotation_period: number;

  @Column()
  orbital_period: number;

  @Column()
  diameter: number;

  @Column()
  climate: string;

  @Column()
  gravity: string;

  @Column()
  terrain: string;

  @Column()
  surface_water: number;

  @Column()
  popuplation: number;

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
