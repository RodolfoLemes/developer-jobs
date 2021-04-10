import pagination from '@modules/pagination/middlewares/pagination';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import JobsController from '../controllers/JobsController';

const router = Router();
const jobsController = new JobsController();

router.get(
  '/',
  pagination,
  celebrate({
    [Segments.QUERY]: {
      remote: Joi.string(),
      contract_type: Joi.string(),
      level: Joi.string(),
      location: Joi.string(),
      tags_name: Joi.array(),
    },
  }),
  jobsController.list,
);
