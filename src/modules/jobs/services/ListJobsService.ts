import Pagination from '@modules/pagination';
import IPaginationOptions from '@modules/pagination/interfaces/IPaginationOptions';
import { inject, injectable } from 'tsyringe';
import Job from '../entities/Job';
import IJobsRepository from '../repositories/IJobsRepository';

interface IRequest {
  remote?: boolean;
  contractType?: string;
  level?: string;
  location?: string;
  tagsName?: string[];
  paginationOptions: IPaginationOptions;
}

@injectable()
export default class ListJobsService {
  constructor(
    @inject('JobsRepository')
    private jobsRepository: IJobsRepository,
  ) {}

  public async execute({
    remote,
    contractType,
    level,
    location,
    tagsName,
    paginationOptions,
  }: IRequest): Promise<Pagination<Job>> {
    const data = await this.jobsRepository.findAllByFilter(
      {
        remote,
        contractType,
        level,
        location,
        tags: tagsName,
      },
      paginationOptions,
    );

    return data;
  }
}
