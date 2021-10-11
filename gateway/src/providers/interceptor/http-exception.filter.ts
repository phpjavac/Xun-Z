import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ApiException } from './api.interceptor';

// 该装饰器告诉filter要捕获哪些类型异常
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    if (exception instanceof ApiException) {
      response.status(status).json({
        msg: (exception as ApiException).getErrorMessage(),
        code: (exception as ApiException).gerErrorCode(),
        path: request.url,
      });
    } else {
      // 处理非手动抛出的情况
      response.status(status).json((exception as HttpException).getResponse());
    }
  }
}
