import Job from '../entities/Job';
import ICreateJobDTO from '../dto/ICreateJobDTO';

export default interface IJobsInterface {
  create(data: ICreateJobDTO): Promise<Job>;
  save(job: Job): Promise<Job>;
  findByUrl(url: string): Promise<Job | undefined>;
}
