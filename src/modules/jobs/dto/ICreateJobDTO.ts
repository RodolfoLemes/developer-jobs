export default interface ICreateJobDTO {
  url: string;
  name: string;
  company: string;
  location?: string;
  remote: boolean;
  salary?: string;
  contractType?: string;
  level?: string;
}
