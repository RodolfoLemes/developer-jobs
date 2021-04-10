import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListJobsService from '../services/ListJobsService';

interface IListQuery {
  remote?: string;
  contractType?: string;
  level?: string;
  location?: string;
  tagsName?: string[];
}

export default class JobsController {
  async list(req: Request, res: Response): Promise<Response> {
    const {
      remote,
      contractType,
      level,
      location,
      tagsName,
    } = req.query as IListQuery;
    const { paginationOptions } = req;

    const filterRemote = remote ? remote === 'true' : undefined;

    const listJobs = container.resolve(ListJobsService);
    const data = await listJobs.execute({
      remote: filterRemote,
      contractType,
      level,
      location,
      tagsName,
      paginationOptions,
    });

    return res.json(classToClass(data));
  }
}
