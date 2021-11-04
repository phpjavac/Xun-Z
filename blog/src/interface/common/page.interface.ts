export interface Page {
  pageNo: number;
  pageSize: number;
}

/**
 * blog分页相应
 */
export interface BlogPageResponse<T> extends Page {
  total: number;
  list: T[];
}

/**
 * blog分页请求
 */
export interface BlogPageRequest extends Page {
  userCode?: string;
}
