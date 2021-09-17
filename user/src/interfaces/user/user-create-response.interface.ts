import { IUser } from './user.interface';

export interface IUserCreateResponse {
  success: boolean;
  message: string;
  data: IUser | null;
}
