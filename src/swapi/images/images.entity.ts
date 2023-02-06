import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FileImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  file_name: string;
}

@Entity()
export class PublicImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  key: string;
}
