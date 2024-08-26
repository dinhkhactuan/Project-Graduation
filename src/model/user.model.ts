export interface INewUser {
  nickname: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  address?: string;
  password: string;
}
export interface IUser extends INewUser {
  userId: string;
}

export interface IChangePassWord {
  userId?: string;
  username: string;
  password: string;
  newpassword: string;
  confirmPassword: string;
}
