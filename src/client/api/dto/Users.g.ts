export interface IUserDto {
  count: number;
  data: IUser[];
}

export interface IUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}
