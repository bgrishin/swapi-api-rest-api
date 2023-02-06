import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { FileImage, PublicImage } from '../images/images.entity';
import { People } from '../people/people.entity';
import { Planet } from '../planet/planet.entity';
import { Species } from '../specie/specie.entity';
import { Starships } from '../starship/starship.entity';
import { Vehicles } from '../vehicle/vehicle.entity';

@Entity()
export class Films {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  episode_id: number;

  @Column()
  opening_crawl: string;

  @Column()
  director: string;

  @Column()
  producer: string;

  @Column()
  release_date: string;

  @ManyToMany(() => People, (character) => character.films)
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'character_id' },
  })
  characters: People[];

  @ManyToMany(() => Planet, (planet) => planet.films)
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'planet_id' },
  })
  planets: Planet[];

  @ManyToMany(() => Starships, (starship) => starship.films)
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'starship_id' },
  })
  starships: Starships[];

  @ManyToMany(() => Vehicles, (vehicle) => vehicle.films)
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'vehicle_id' },
  })
  vehicles: Vehicles[];

  @ManyToMany(() => Species, (species) => species.films)
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'species_id' },
  })
  species: Species[];

  @ManyToMany(() => PublicImage)
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'public_image_id' },
  })
  public_images: PublicImage[];

  @ManyToMany(() => FileImage)
  @JoinTable({
    joinColumn: { name: 'film_id' },
    inverseJoinColumn: { name: 'file_image_id' },
  })
  file_images: FileImage[];
}
