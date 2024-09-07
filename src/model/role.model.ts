export interface INewRole {
  roleCode: string;
  description: string;
}
export interface IRole extends INewRole {
  id: string;
}
