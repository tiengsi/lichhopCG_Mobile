export class CategoryModel {
  categoryId: number;
  categoryName: string;
  typeCode: ECategoryType;
  categoryCode: string;
  link: string;
  icon?: string;
  ParentId?: number;
  isActive?: boolean;
}

export enum ECategoryType {
  Post,
  Article,
  Link,
  Schedule,
}
