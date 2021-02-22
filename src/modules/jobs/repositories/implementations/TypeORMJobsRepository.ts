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
}
