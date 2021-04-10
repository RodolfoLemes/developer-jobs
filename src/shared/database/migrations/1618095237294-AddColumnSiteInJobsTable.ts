import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnSiteInJobsTable1618095237294
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'jobs',
      new TableColumn({
        name: 'site',
        type: 'varchar',
        default: null,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('jobs', 'sites');
  }
}
