import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('AUTH_SERVICE') private authServiceClient: ClientProxy,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get<string[]>(
      'secured',
      context.getHandler(),
    );
    console.log(secured);

    if (!secured) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const tokenHeaders = request.headers['authorization'] || null;
    if (!tokenHeaders) return false;

    const result = await firstValueFrom(
      this.authServiceClient.send('auth_token_analysis', tokenHeaders),
    );
    return !!result;
  }
}
