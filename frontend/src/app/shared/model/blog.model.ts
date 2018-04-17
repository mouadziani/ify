import { User } from '../user/user.model';
import { BlogCategory } from './blog-category.model';

export class Blog {
  constructor(
    public id?: number,
    public title?: string,
    public text?: string,
    public image?: string,
    public category?: BlogCategory,
    public user?: User,
    public createdDate?: Date
  ) {}
}
