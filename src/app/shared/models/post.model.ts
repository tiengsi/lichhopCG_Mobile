export class PostModel {
  postId: number;
  title: string;
  filterTitle: string;
  description: string;
  body: string;
  categoryId: number;
  categoryName: string;
  categoryCode: string;
  imagePath: string;
  isActive: boolean;
  createdDate: Date;
  publicId: string;

  constructor() {
    this.title = null;
    this.filterTitle = null;
    this.description = null;
    this.body = null;
    this.categoryId = 0;
    this.categoryName = null;
    this.imagePath = null;
    this.isActive = true;
    this.createdDate = new Date();
    this.publicId = null;
  }
}
