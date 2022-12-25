import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityInterface } from '../../interfaces/entity.interface';

@Entity()
export class FileImage implements EntityInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'file_name' })
  fileName: string;
}

@Entity()
export class PublicImage implements EntityInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  key: string;
}
