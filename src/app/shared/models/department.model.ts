export interface IDepartmentModel {
  id?: number;
  name: string;
  adress?: string;
  email?: string;
  phoneNumber?: string;
  fax?: string;
  parentId?: number;
  isActive?: boolean;
  userRepresentative?: number[];
}

export interface ITreeDepartmentOfficer {
  id: number;
  name: string;
  adress: null | string;
  email: null | string;
  phoneNumber: null | string;
  fax: null | string;
  parentId: number | null;
  subDepartments?: ITreeDepartmentOfficer[];
  officers?: IOfficer[];
  isActive?: boolean;
}

export interface IOfficer {
  fullName: string;
  email: null;
  phoneNumber: string;
  officerPosition: string;
}
