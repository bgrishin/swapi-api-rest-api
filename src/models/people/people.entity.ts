import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PeopleEntity {
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

  @Column()
  created: string;

  @Column()
  edited: string;

  @Column()
  url: string;
}
