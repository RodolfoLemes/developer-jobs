import Tag from '../entities/Tag';

export default interface ITagsInterface {
  create(name: string): Promise<Tag>;
  save(tag: Tag): Promise<Tag>;
  findByName(name: string): Promise<Tag | undefined>;
}
