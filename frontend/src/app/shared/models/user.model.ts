import { Authority } from './authority.enum';

export class User{
  constructor(
    public username: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password?: string,
    public authorities?: Array<Authority>,
    public enabled?: boolean
  ) {}
}
