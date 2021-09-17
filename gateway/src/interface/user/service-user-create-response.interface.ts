import { IUser } from './user.interface';

export interface IServiceUserCreateResponse {
  success: boolean;
  message: string;
  data: IUser | null;
}
