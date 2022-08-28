export class UserForSelectModel {
  id: number;
  fullName: string;
}

export interface GetOfficerRequest {
  filter: string;
  sortField: string;
}
