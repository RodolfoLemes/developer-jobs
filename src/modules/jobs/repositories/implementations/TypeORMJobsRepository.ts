import IFindAllByFilterDTO from '@modules/jobs/dto/IFindAllByFilterDTO';
import IPaginationOptions from '@modules/pagination/interfaces/IPaginationOptions';
import Pagination from '@modules/pagination';
import { getRepository, Repository } from 'typeorm';
import IJobsRepository from '../IJobsRepository';
import ICreateJobDTO from '../../dto/ICreateJobDTO';
import Job from '../../entities/Job';

export default class TypeORMJobsRepository implements IJobsRepository {
  private ormRepository: Repository<Job>;

  constructor() {
    this.ormRepository = getRepository(Job);
  }

  public async create(data: ICreateJobDTO): Promise<Job> {
    const job = await this.ormRepository.create(data);

    return job;
  }

  public async save(job: Job): Promise<Job> {
    return this.ormRepository.save(job);
  }

  public async findByUrl(url: string): Promise<Job | undefined> {
    const job = await this.ormRepository.findOne({
      where: {
        url,
      },
    });

    return job;
  }

  public async findAllByFilter(
    { remote, location, contractType, level, tags }: IFindAllByFilterDTO,
    { page, limit }: IPaginationOptions,
  ): Promise<Pagination<Job>> {
    const query = this.ormRepository.createQueryBuilder('jobs');

    if (remote !== undefined) query.where('jobs.remote = :remote', { remote });
    if (location) query.andWhere('jobs.location = :location', { location });
    if (contractType)
      query.andWhere('jobs.contract_type = :contract_type', {
        contract_type: contractType,
      });
    if (level) query.andWhere('jobs.level = :level', { level });

    if (tags) {
      query.innerJoinAndSelect('jobs.tags', 'tags');
      await Promise.all([
        tags.map(tag => query.andWhere('tags.name =: tag', { tag })),
      ]);
    }

    const jobs = await query
      .limit(limit)
      .skip((page + 1) / limit)
      .orderBy('jobs.created_at', 'DESC')
      .getMany();

    const total = await query.getCount();

    return {
      values: jobs,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}
