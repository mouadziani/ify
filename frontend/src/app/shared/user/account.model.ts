export class Account {
  constructor(
    public authorities: string[],
    public email: string,
    public firstName: string,
    public lastName: string,
    public login: string,
  ) { }
}
