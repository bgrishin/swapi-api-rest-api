import { MigrationInterface, QueryRunner } from "typeorm";

export class generated1671959399419 implements MigrationInterface {
    name = 'generated1671959399419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file_image" ("id" SERIAL NOT NULL, "file_name" character varying NOT NULL, CONSTRAINT "PK_378728468f1edd285f78bff8bdb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public_image" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "key" character varying NOT NULL, CONSTRAINT "PK_4bac01d707d8500722ea10a85a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "species" ("id" integer NOT NULL, "name" character varying NOT NULL, "classification" character varying NOT NULL, "designation" character varying NOT NULL, "average_height" character varying NOT NULL, "average_lifespan" character varying NOT NULL, "eye_colors" character varying NOT NULL, "hair_colors" character varying NOT NULL, "language" character varying NOT NULL, "homeworld_id" integer, CONSTRAINT "PK_ae6a87f2423ba6c25dc43c32770" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "planet" ("id" integer NOT NULL, "name" character varying NOT NULL, "diameter" character varying NOT NULL, "rotation_period" character varying NOT NULL, "orbital_period" character varying NOT NULL, "gravity" character varying NOT NULL, "population" character varying NOT NULL, "climate" character varying NOT NULL, "terrain" character varying NOT NULL, "surface_water" character varying NOT NULL, CONSTRAINT "PK_cb7506671ad0f19d6287ee4bfb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "starships" ("id" integer NOT NULL, "name" character varying NOT NULL, "model" character varying NOT NULL, "starship_class" character varying NOT NULL, "manufacturer" character varying NOT NULL, "cost_in_credits" character varying NOT NULL, "length" character varying NOT NULL, "crew" character varying NOT NULL, "passengers" character varying NOT NULL, "max_atmosphering_speed" character varying NOT NULL, "MGLT" character varying NOT NULL, "hyperdrive_rating" character varying NOT NULL, "cargo_capacity" character varying NOT NULL, "consumables" character varying NOT NULL, CONSTRAINT "PK_10c86d0ac9be05d3f986287a092" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" integer NOT NULL, "name" character varying NOT NULL, "model" character varying NOT NULL, "vehicle_class" character varying NOT NULL, "manufacturer" character varying NOT NULL, "length" character varying NOT NULL, "cost_in_credits" character varying NOT NULL, "crew" character varying NOT NULL, "passengers" character varying NOT NULL, "max_atmosphering_speed" character varying NOT NULL, "cargo_capacity" character varying NOT NULL, "consumables" character varying NOT NULL, CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "people" ("id" integer NOT NULL, "name" character varying NOT NULL, "birth_year" character varying NOT NULL, "gender" character varying NOT NULL, "height" character varying NOT NULL, "mass" character varying NOT NULL, "eye_color" character varying NOT NULL, "hair_color" character varying NOT NULL, "skin_color" character varying NOT NULL, "homeworld_id" integer, CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "films" ("id" integer NOT NULL, "title" character varying NOT NULL, "episode_id" integer NOT NULL, "opening_crawl" character varying NOT NULL, "director" character varying NOT NULL, "producer" character varying NOT NULL, "release_date" character varying NOT NULL, CONSTRAINT "PK_697487ada088902377482c970d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "roles" character varying NOT NULL DEFAULT 'user', CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "starships_pilots_people" ("starship_id" integer NOT NULL, "pilot_id" integer NOT NULL, CONSTRAINT "PK_e2c7c1a932fa01cb6cd8aa0403d" PRIMARY KEY ("starship_id", "pilot_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f535cc89e97239bfa2c628b0bc" ON "starships_pilots_people" ("starship_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_fbfe5c7cd8a5532936c851ebab" ON "starships_pilots_people" ("pilot_id") `);
        await queryRunner.query(`CREATE TABLE "vehicles_pilots_people" ("vehicle_id" integer NOT NULL, "pilot_id" integer NOT NULL, CONSTRAINT "PK_aa9f4195c1c19e58cf46d01a055" PRIMARY KEY ("vehicle_id", "pilot_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6a451cbe820cd0d865fb4fdff7" ON "vehicles_pilots_people" ("vehicle_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_caf501066332fe43ea49e0a11c" ON "vehicles_pilots_people" ("pilot_id") `);
        await queryRunner.query(`CREATE TABLE "people_species_species" ("person_id" integer NOT NULL, "species_id" integer NOT NULL, CONSTRAINT "PK_4e6b44b9698462cce59b232546e" PRIMARY KEY ("person_id", "species_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b2e56e637791bb0c3cc125abda" ON "people_species_species" ("person_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d97e36a57ecd53522439ba8d4f" ON "people_species_species" ("species_id") `);
        await queryRunner.query(`CREATE TABLE "films_characters_people" ("film_id" integer NOT NULL, "character_id" integer NOT NULL, CONSTRAINT "PK_ea2b3b31d261d7ad51cf2f965b2" PRIMARY KEY ("film_id", "character_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0c312594eabb28c7bf3a07ef6f" ON "films_characters_people" ("film_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6f6c60ddedf853394b1c99f0d4" ON "films_characters_people" ("character_id") `);
        await queryRunner.query(`CREATE TABLE "films_planets_planet" ("film_id" integer NOT NULL, "planet_id" integer NOT NULL, CONSTRAINT "PK_8f26605716466cb31a8cf44bd70" PRIMARY KEY ("film_id", "planet_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_21e38313b0b36a6f787ace5713" ON "films_planets_planet" ("film_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4cc590d9a3ef724512a22e9b51" ON "films_planets_planet" ("planet_id") `);
        await queryRunner.query(`CREATE TABLE "films_starships_starships" ("film_id" integer NOT NULL, "starship_id" integer NOT NULL, CONSTRAINT "PK_2551a7bdabe7c273a410c83ff27" PRIMARY KEY ("film_id", "starship_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0cd5f675286d421bb70ff5e1f5" ON "films_starships_starships" ("film_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4a86d062e58307c61898a2ffb3" ON "films_starships_starships" ("starship_id") `);
        await queryRunner.query(`CREATE TABLE "films_vehicles_vehicles" ("film_id" integer NOT NULL, "vehicle_id" integer NOT NULL, CONSTRAINT "PK_c2661c39d0002e4a450b72b60cb" PRIMARY KEY ("film_id", "vehicle_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b1eb846d90756c48a72285e944" ON "films_vehicles_vehicles" ("film_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4112151230eac0a2a1033802cd" ON "films_vehicles_vehicles" ("vehicle_id") `);
        await queryRunner.query(`CREATE TABLE "films_species_species" ("film_id" integer NOT NULL, "species_id" integer NOT NULL, CONSTRAINT "PK_e6f9ead56807aa702653c767f2c" PRIMARY KEY ("film_id", "species_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1503a652ca8d5a37df05a20c59" ON "films_species_species" ("film_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_bf1fe11c96a370967abe176cae" ON "films_species_species" ("species_id") `);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_f7e93a1974cc86fd87ce6777319" FOREIGN KEY ("homeworld_id") REFERENCES "planet"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "people" ADD CONSTRAINT "FK_a80a60ed539a57573be2dd1d89a" FOREIGN KEY ("homeworld_id") REFERENCES "planet"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "starships_pilots_people" ADD CONSTRAINT "FK_f535cc89e97239bfa2c628b0bc9" FOREIGN KEY ("starship_id") REFERENCES "starships"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "starships_pilots_people" ADD CONSTRAINT "FK_fbfe5c7cd8a5532936c851ebab9" FOREIGN KEY ("pilot_id") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles_pilots_people" ADD CONSTRAINT "FK_6a451cbe820cd0d865fb4fdff74" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vehicles_pilots_people" ADD CONSTRAINT "FK_caf501066332fe43ea49e0a11cd" FOREIGN KEY ("pilot_id") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "people_species_species" ADD CONSTRAINT "FK_b2e56e637791bb0c3cc125abdaa" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "people_species_species" ADD CONSTRAINT "FK_d97e36a57ecd53522439ba8d4fe" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_characters_people" ADD CONSTRAINT "FK_0c312594eabb28c7bf3a07ef6f5" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_characters_people" ADD CONSTRAINT "FK_6f6c60ddedf853394b1c99f0d4d" FOREIGN KEY ("character_id") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_planets_planet" ADD CONSTRAINT "FK_21e38313b0b36a6f787ace5713f" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_planets_planet" ADD CONSTRAINT "FK_4cc590d9a3ef724512a22e9b516" FOREIGN KEY ("planet_id") REFERENCES "planet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_starships_starships" ADD CONSTRAINT "FK_0cd5f675286d421bb70ff5e1f57" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_starships_starships" ADD CONSTRAINT "FK_4a86d062e58307c61898a2ffb39" FOREIGN KEY ("starship_id") REFERENCES "starships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_vehicles_vehicles" ADD CONSTRAINT "FK_b1eb846d90756c48a72285e9445" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_vehicles_vehicles" ADD CONSTRAINT "FK_4112151230eac0a2a1033802cd7" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_species_species" ADD CONSTRAINT "FK_1503a652ca8d5a37df05a20c593" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_species_species" ADD CONSTRAINT "FK_bf1fe11c96a370967abe176cae7" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "films_species_species" DROP CONSTRAINT "FK_bf1fe11c96a370967abe176cae7"`);
        await queryRunner.query(`ALTER TABLE "films_species_species" DROP CONSTRAINT "FK_1503a652ca8d5a37df05a20c593"`);
        await queryRunner.query(`ALTER TABLE "films_vehicles_vehicles" DROP CONSTRAINT "FK_4112151230eac0a2a1033802cd7"`);
        await queryRunner.query(`ALTER TABLE "films_vehicles_vehicles" DROP CONSTRAINT "FK_b1eb846d90756c48a72285e9445"`);
        await queryRunner.query(`ALTER TABLE "films_starships_starships" DROP CONSTRAINT "FK_4a86d062e58307c61898a2ffb39"`);
        await queryRunner.query(`ALTER TABLE "films_starships_starships" DROP CONSTRAINT "FK_0cd5f675286d421bb70ff5e1f57"`);
        await queryRunner.query(`ALTER TABLE "films_planets_planet" DROP CONSTRAINT "FK_4cc590d9a3ef724512a22e9b516"`);
        await queryRunner.query(`ALTER TABLE "films_planets_planet" DROP CONSTRAINT "FK_21e38313b0b36a6f787ace5713f"`);
        await queryRunner.query(`ALTER TABLE "films_characters_people" DROP CONSTRAINT "FK_6f6c60ddedf853394b1c99f0d4d"`);
        await queryRunner.query(`ALTER TABLE "films_characters_people" DROP CONSTRAINT "FK_0c312594eabb28c7bf3a07ef6f5"`);
        await queryRunner.query(`ALTER TABLE "people_species_species" DROP CONSTRAINT "FK_d97e36a57ecd53522439ba8d4fe"`);
        await queryRunner.query(`ALTER TABLE "people_species_species" DROP CONSTRAINT "FK_b2e56e637791bb0c3cc125abdaa"`);
        await queryRunner.query(`ALTER TABLE "vehicles_pilots_people" DROP CONSTRAINT "FK_caf501066332fe43ea49e0a11cd"`);
        await queryRunner.query(`ALTER TABLE "vehicles_pilots_people" DROP CONSTRAINT "FK_6a451cbe820cd0d865fb4fdff74"`);
        await queryRunner.query(`ALTER TABLE "starships_pilots_people" DROP CONSTRAINT "FK_fbfe5c7cd8a5532936c851ebab9"`);
        await queryRunner.query(`ALTER TABLE "starships_pilots_people" DROP CONSTRAINT "FK_f535cc89e97239bfa2c628b0bc9"`);
        await queryRunner.query(`ALTER TABLE "people" DROP CONSTRAINT "FK_a80a60ed539a57573be2dd1d89a"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_f7e93a1974cc86fd87ce6777319"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bf1fe11c96a370967abe176cae"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1503a652ca8d5a37df05a20c59"`);
        await queryRunner.query(`DROP TABLE "films_species_species"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4112151230eac0a2a1033802cd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b1eb846d90756c48a72285e944"`);
        await queryRunner.query(`DROP TABLE "films_vehicles_vehicles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4a86d062e58307c61898a2ffb3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0cd5f675286d421bb70ff5e1f5"`);
        await queryRunner.query(`DROP TABLE "films_starships_starships"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4cc590d9a3ef724512a22e9b51"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21e38313b0b36a6f787ace5713"`);
        await queryRunner.query(`DROP TABLE "films_planets_planet"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6f6c60ddedf853394b1c99f0d4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0c312594eabb28c7bf3a07ef6f"`);
        await queryRunner.query(`DROP TABLE "films_characters_people"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d97e36a57ecd53522439ba8d4f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b2e56e637791bb0c3cc125abda"`);
        await queryRunner.query(`DROP TABLE "people_species_species"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_caf501066332fe43ea49e0a11c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6a451cbe820cd0d865fb4fdff7"`);
        await queryRunner.query(`DROP TABLE "vehicles_pilots_people"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fbfe5c7cd8a5532936c851ebab"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f535cc89e97239bfa2c628b0bc"`);
        await queryRunner.query(`DROP TABLE "starships_pilots_people"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "films"`);
        await queryRunner.query(`DROP TABLE "people"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
        await queryRunner.query(`DROP TABLE "starships"`);
        await queryRunner.query(`DROP TABLE "planet"`);
        await queryRunner.query(`DROP TABLE "species"`);
        await queryRunner.query(`DROP TABLE "public_image"`);
        await queryRunner.query(`DROP TABLE "file_image"`);
    }

}
