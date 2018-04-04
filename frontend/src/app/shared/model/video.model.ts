import { User } from '../user/user.model';
import { VideoCategory } from './video-category.model';

export class Video {
  constructor(
    public id?: number,
    public title?: string,
    public text?: string,
    public image?: string,
    public videoUrl?: string,
    public category?: VideoCategory,
    public user?: User,
    public createdDate?: Date
  ) {}
}
