import { getRepository, Repository } from 'typeorm';
import Tag from '../../entities/Tag';
import ITagsRepository from '../ITagsRepository';

export default class TypeORMTagsRepository implements ITagsRepository {
  private ormRepository: Repository<Tag>;

  constructor() {
    this.ormRepository = getRepository(Tag);
  }

  public async create(name: string): Promise<Tag> {
    const tag = await this.ormRepository.create({ name });

    return tag;
  }

  public async save(tag: Tag): Promise<Tag> {
    return this.ormRepository.save(tag);
  }

  public async findByName(name: string): Promise<Tag | undefined> {
    const tag = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return tag;
  }
}
