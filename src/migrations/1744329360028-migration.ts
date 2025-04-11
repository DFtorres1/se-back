import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1744329360028 implements MigrationInterface {
    name = 'Migration1744329360028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "skin_tone" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_e0a0511db5a8ecfe1410592ad54" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hair_length" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_dd13e7ccff02153112efb9b8d7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recomendations" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "description" character varying NOT NULL, "faceTypeId" integer, "skinToneId" integer, "hairLengthId" integer, CONSTRAINT "PK_da2bebfc90f32376668a1060146" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "face_type" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_932c8920a9932a0c51943160b6c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_requests" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "userId" integer, "faceTypeId" integer, "skinToneId" integer, "hairLengthId" integer, CONSTRAINT "PK_d8a5e92421a4e7c7382cbf14198" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_roles_enum" AS ENUM('admin', 'stylist', 'client')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "roles" "public"."user_roles_enum" NOT NULL DEFAULT 'client', CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recomendations" ADD CONSTRAINT "FK_ef64c09cef3c5c1c76e483079ad" FOREIGN KEY ("faceTypeId") REFERENCES "face_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recomendations" ADD CONSTRAINT "FK_3ddc740daf81df7d0a883e273b3" FOREIGN KEY ("skinToneId") REFERENCES "skin_tone"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recomendations" ADD CONSTRAINT "FK_94798bbf286f05934de6f3a78c7" FOREIGN KEY ("hairLengthId") REFERENCES "hair_length"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_requests" ADD CONSTRAINT "FK_e5ea0b9b01a1a0c2660a34952d5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_requests" ADD CONSTRAINT "FK_fce9766dff8daedf307b7568452" FOREIGN KEY ("faceTypeId") REFERENCES "face_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_requests" ADD CONSTRAINT "FK_561daf43b532fa81c7904dd0841" FOREIGN KEY ("skinToneId") REFERENCES "skin_tone"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_requests" ADD CONSTRAINT "FK_38b238230db53eed56ba6410b54" FOREIGN KEY ("hairLengthId") REFERENCES "hair_length"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_requests" DROP CONSTRAINT "FK_38b238230db53eed56ba6410b54"`);
        await queryRunner.query(`ALTER TABLE "users_requests" DROP CONSTRAINT "FK_561daf43b532fa81c7904dd0841"`);
        await queryRunner.query(`ALTER TABLE "users_requests" DROP CONSTRAINT "FK_fce9766dff8daedf307b7568452"`);
        await queryRunner.query(`ALTER TABLE "users_requests" DROP CONSTRAINT "FK_e5ea0b9b01a1a0c2660a34952d5"`);
        await queryRunner.query(`ALTER TABLE "recomendations" DROP CONSTRAINT "FK_94798bbf286f05934de6f3a78c7"`);
        await queryRunner.query(`ALTER TABLE "recomendations" DROP CONSTRAINT "FK_3ddc740daf81df7d0a883e273b3"`);
        await queryRunner.query(`ALTER TABLE "recomendations" DROP CONSTRAINT "FK_ef64c09cef3c5c1c76e483079ad"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_roles_enum"`);
        await queryRunner.query(`DROP TABLE "users_requests"`);
        await queryRunner.query(`DROP TABLE "face_type"`);
        await queryRunner.query(`DROP TABLE "recomendations"`);
        await queryRunner.query(`DROP TABLE "hair_length"`);
        await queryRunner.query(`DROP TABLE "skin_tone"`);
    }

}
