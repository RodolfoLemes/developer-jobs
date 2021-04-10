import FakeJobsRepository from '../repositories/implementations/FakeJobsRepository';
import ListJobsService from './ListJobsService';
import { completeJob } from '../mocks/jobs';
import Job from '../entities/Job';

let jobsRepository: FakeJobsRepository;
let listJobs: ListJobsService;

describe('list jobs', () => {
  beforeEach(async () => {
    jobsRepository = new FakeJobsRepository();
    listJobs = new ListJobsService(jobsRepository);

    await jobsRepository.create(completeJob);
  });

  it('should list jobs', async () => {
    const data = await listJobs.execute({
      paginationOptions: {
        limit: 10,
        page: 1,
      },
    });

    expect(data.values[0]).toBeInstanceOf(Job);
  });
});
