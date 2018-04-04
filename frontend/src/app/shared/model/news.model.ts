import { User } from '../user/user.model';
import { NewsCategory } from './news-category.model';

export class News {
  constructor(
    public id?: number,
    public title?: string,
    public text?: string,
    public image?: string,
    public category?: NewsCategory,
    public user?: User,
    public createdDate?: Date
  ) {}
}
