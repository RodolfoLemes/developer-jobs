import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateJobsTable1613922616188
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'jobs',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'url',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'company',
            type: 'varchar',
          },
          {
            name: 'location',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'remote',
            type: 'boolean',
          },
          {
            name: 'salary',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'contract_type',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'level',
            type: 'varchar',
            isNullable: true,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('jobs');
  }
}
