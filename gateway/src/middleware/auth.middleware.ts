import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthTokenMiddleware implements NestMiddleware {
  // constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}
  async use(req: Request, res: Response, next: () => void) {
    const headerToken = req.headers['token'] || null;
    if (!headerToken) return false;
    // const authResponse = await firstValueFrom(
    //   // this.client.send('auth_token_analysis', headerToken),
    // );
    // if (!authResponse) return false;
    // return authResponse;
    next();
  }
}
