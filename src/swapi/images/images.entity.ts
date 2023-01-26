import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FileImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'file_name' })
  fileName: string;
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
