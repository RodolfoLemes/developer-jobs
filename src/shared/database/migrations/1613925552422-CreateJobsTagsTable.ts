import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateJobsTagsTable1613925552422
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'jobs_tags',
        columns: [
          {
            name: 'jobs_id',
            type: 'int',
          },
          {
            name: 'tags_id',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'jobs_tags',
      new TableForeignKey({
        columnNames: ['jobs_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'jobs',
      }),
    );

    await queryRunner.createForeignKey(
      'jobs_tags',
      new TableForeignKey({
        columnNames: ['tags_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tags',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('jobs_tags', 'tags_id');
    await queryRunner.dropForeignKey('jobs_tags', 'jobs_id');
    await queryRunner.dropTable('jobs_tags');
  }
}
