import { IUser } from "../user/user-intrface";

  export interface LoginResponse {
    status: boolean;
    message: string;
    token: string;
    user: IUser;
  }