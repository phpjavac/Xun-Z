import { IUser } from '../user/user.interface';

export interface IBlog {
  id: string;
  content: string;
  title: string;
  user: IUser;
  createTime: Date;
  updateTime: Date;
}
