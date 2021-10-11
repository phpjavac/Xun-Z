import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiCode } from '../../enum/api-code.enum';

export class ApiException extends HttpException {
  private errorMessage: string;
  private errorCode: ApiCode;

  constructor(
    errorMessage: string,
    errorCode: ApiCode,
    statusCode: HttpStatus,
  ) {
    super(errorMessage, statusCode);

    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
  }

  gerErrorCode(): ApiCode {
    return this.errorCode;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}

// 约定好的返回格式
interface Response<T> {
  code: number;
  msg: string;
  data: T;
}

@Injectable()
export class ApiInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          code: ApiCode.SUCCESS,
          msg: 'success',
          data,
        };
      }),
    );
  }
}
