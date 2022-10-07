import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class People {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  height: number;

  @Column()
  hair_color: string;

  @Column()
  skin_color: string;

  @Column()
  eye_color: string;

  @Column()
  birth_year: number;

  @Column()
  gender: string;

  @Column()
  homeworld: string;

  //films & species & vehicles & starships

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
