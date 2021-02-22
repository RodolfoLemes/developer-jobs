import IJobsRepository from '../IJobsRepository';
import ICreateJobDTO from '../../dto/ICreateJobDTO';
import Job from '../../entities/Job';

export default class FakeJobsRepository implements IJobsRepository {
  private jobs: Job[] = [];

  public async create(data: ICreateJobDTO): Promise<Job> {
    const job = new Job();

    Object.assign(job, { ...data, id: this.jobs.length + 1 });

    this.jobs.push(job);

    return job;
  }

  public async save(job: Job): Promise<Job> {
    const index = this.jobs.findIndex(findJob => findJob.id === job.id);

    this.jobs[index] = job;

    return job;
  }

  public async findByUrl(url: string): Promise<Job | undefined> {
    const job = this.jobs.find(findJob => findJob.url === url);

    return job;
  }
}
