import { User } from '../user/user.model';

export class Comment {
    constructor(
        public id?: number,
        public text?: string,
        public user?: User,
        public postId?: number,
        public type?: string,
        public createdDate?: Date
      ) {}
}
