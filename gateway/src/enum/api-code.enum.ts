export enum ApiCode {
  TIMEOUT = -1, // 系统繁忙
  SUCCESS = 0, // 请求成功

  BUSINESS_ERROR = 4001, // 业务错误
  PARAMS_ERROR = 4002, // 参数不合法
  SIGN_ERROR = 4003, // 验签失败
  TOKEN_ERROR = 4004, // token不合法
}
