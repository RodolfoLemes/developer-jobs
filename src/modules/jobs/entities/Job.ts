import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';

import Tag from './Tag';

@Entity()
class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  name: string;

  @Column()
  company: string;

  @Column()
  location: string;

  @Column()
  remote: boolean;

  @Column()
  salary: string;

  @Column({ name: 'contract_type' })
  contractType: string;

  @Column()
  level: string;

  @ManyToMany(() => Tag, tag => tag.name)
  @JoinTable()
  tags: Tag[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Job;
