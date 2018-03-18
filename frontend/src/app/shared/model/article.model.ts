import { User } from '../user/user.model';
import { ArticleCategory } from './article-category.model';

export class Article {
  constructor(
    public id?: number,
    public title?: string,
    public text?: string,
    public articleCategory?: ArticleCategory,
    public user?: User,
    public createdDate?: Date
  ) {}
}
