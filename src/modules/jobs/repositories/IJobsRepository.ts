import IPaginationOptions from '@modules/pagination/interfaces/IPaginationOptions';
import Pagination from '@modules/pagination';
import Job from '../entities/Job';
import ICreateJobDTO from '../dto/ICreateJobDTO';
import IFindAllByFilterDTO from '../dto/IFindAllByFilterDTO';

export default interface IJobsRepository {
  create(data: ICreateJobDTO): Promise<Job>;
  save(job: Job): Promise<Job>;
  findByUrl(url: string): Promise<Job | undefined>;
  findAllByFilter(
    filter: IFindAllByFilterDTO,
    paginationOptions: IPaginationOptions,
  ): Promise<Pagination<Job>>;
}
