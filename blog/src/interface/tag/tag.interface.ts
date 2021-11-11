export interface Tag {
  id?: string;
  name: string;
  userCode: string;
  createTime: Date;
}

export class TagImp implements Tag {
  id?: string;
  name: string;
  userCode: string;
  createTime: Date;
}
