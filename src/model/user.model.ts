export interface INewUser {
  username: string;
  email: string;
  phone: string;
  address?: string;
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
