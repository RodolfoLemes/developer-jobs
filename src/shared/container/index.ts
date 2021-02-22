import { container } from 'tsyringe';

import IJobsRepository from '@modules/jobs/repositories/IJobsRepository';
import TypeORMJobsRepository from '@modules/jobs/repositories/implementations/TypeORMJobsRepository';

import ITagsRepository from '@modules/jobs/repositories/ITagsRepository';
import TypeORMTagsRepository from '@modules/jobs/repositories/implementations/TypeORMTagsRepository';

container.registerSingleton<IJobsRepository>(
  'JobsRepository',
  TypeORMJobsRepository,
);

container.registerSingleton<ITagsRepository>(
  'TagsRepository',
  TypeORMTagsRepository,
);
