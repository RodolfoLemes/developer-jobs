import AppError from '@shared/errors/AppError';
import CreateJobService from './CreateJobService';
import FakeJobsRepository from '../repositories/implementations/FakeJobsRepository';
import FakeTagsRepository from '../repositories/implementations/FakeTagsRepository';
import IJobsRepository from '../repositories/IJobsRepository';
import ITagsRepository from '../repositories/ITagsRepository';
import simpleJob from '../mocks/jobs';

let jobsRepository: IJobsRepository;
let tagsRepository: ITagsRepository;
let createJobService: CreateJobService;

describe('create jobs', () => {
  beforeEach(async () => {
    jobsRepository = new FakeJobsRepository();
    tagsRepository = new FakeTagsRepository();
    createJobService = new CreateJobService(jobsRepository, tagsRepository);
  });

  it('should create a job', async () => {
    const job = await createJobService.execute(simpleJob);

    expect(job).toHaveProperty('id');
    expect(job.tags[0].name).toBe(simpleJob.tagsName[0]);
  });

  it('should not create a job if expired', async () => {
    await expect(
      createJobService.execute({ ...simpleJob, expired: true }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a job if job already exists', async () => {
    await createJobService.execute(simpleJob);

    await expect(createJobService.execute(simpleJob)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
