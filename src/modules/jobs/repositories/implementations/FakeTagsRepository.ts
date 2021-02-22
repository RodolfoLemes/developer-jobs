import ITagsRepository from '../ITagsRepository';
import Tag from '../../entities/Tag';

export default class FakeTagsRepository implements ITagsRepository {
  private tags: Tag[] = [];

  public async create(name: string): Promise<Tag> {
    const tag = new Tag();

    Object.assign(tag, { name, id: this.tags.length + 1 });

    this.tags.push(tag);

    return tag;
  }

  public async save(tag: Tag): Promise<Tag> {
    const index = this.tags.findIndex(findTag => findTag.id === tag.id);

    this.tags[index] = tag;

    return tag;
  }

  public async findByName(name: string): Promise<Tag | undefined> {
    const tag = this.tags.find(findTag => findTag.name === name);

    return tag;
  }
}
