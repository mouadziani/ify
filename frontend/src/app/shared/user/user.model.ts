export class User {
  public id?: any;
  public login?: string;
  public firstName?: string;
  public lastName?: string;
  public email?: string;
  public authorities?: any[];
  public createdDate?: Date;
  public password?: string;
  public image?: string;

  constructor(
    id?: any,
    login?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    authorities?: any[],
    createdDate?: Date,
    password?: string,
    image?: string
  ) {
    this.id = id ? id : null;
    this.login = login ? login : null;
    this.firstName = firstName ? firstName : null;
    this.lastName = lastName ? lastName : null;
    this.email = email ? email : null;
    this.authorities = authorities ? authorities : null;
    this.createdDate = createdDate ? createdDate : null;
    this.password = password ? password : null;
    this.image = image ? image : null;
  }
}
