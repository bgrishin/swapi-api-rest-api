import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export class Specie {
  @Column()
  name: string;

  @Column()
  classification: string;

  @Column()
  designation: string;

  @Column()
  avarage_height: number;

  @Column()
  skin_colors: string;

  @Column()
  hair_colors: string;

  @Column()
  eye_colors: string;

  @Column()
  avarage_lifespan: number;

  @Column()
  homeworld: string;

  @Column()
  language: string;

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
