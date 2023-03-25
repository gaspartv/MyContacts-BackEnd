import { MigrationInterface, QueryRunner } from "typeorm";

export class contract1679766907915 implements MigrationInterface {
    name = 'contract1679766907915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_62e2263d158f4698c279f0fbcbf"`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_62e2263d158f4698c279f0fbcbf" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_62e2263d158f4698c279f0fbcbf"`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_62e2263d158f4698c279f0fbcbf" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
