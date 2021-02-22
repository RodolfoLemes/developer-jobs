import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IJobsRepository from '../repositories/IJobsRepository';
import ITagsRepository from '../repositories/ITagsRepository';
import Tag from '../entities/Tag';
import Job from '../entities/Job';

interface IRequest {
  url: string;
  name: string;
  company: string;
  expired: boolean;
  location?: string;
  remote?: boolean;
  salary?: string;
  contractType?: string;
  level?: string;
  tagsName: string[];
}

@injectable()
export default class CreateJobService {
  constructor(
    @inject('JobsRepository')
    private jobsRepository: IJobsRepository,

    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute({
    url,
    name,
    company,
    expired,
    location,
    remote = false,
    salary,
    contractType,
    level,
    tagsName,
  }: IRequest): Promise<Job> {
    if (expired) throw new AppError('Job expired');

    if (await this.jobsRepository.findByUrl(url))
      throw new AppError('Job already exist');

    const pickTags: Tag[] = [];

    await Promise.all(
      tagsName.map(async tagName => {
        const oldTag = await this.tagsRepository.findByName(tagName);

        if (!oldTag) {
          const newTag = await this.tagsRepository.create(tagName);
          pickTags.push(newTag);
        } else {
          pickTags.push(oldTag);
        }
      }),
    );

    const job = await this.jobsRepository.create({
      url,
      name,
      company,
      salary,
      location,
      remote,
      contractType,
      level,
    });

    job.tags = pickTags;
    await this.jobsRepository.save(job);

    return job;
  }
}
