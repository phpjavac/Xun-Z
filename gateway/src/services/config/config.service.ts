import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.API_GATEWAY_PORT;
    this.envConfig.auth = {
      options: {
        port: process.env.AUTH_SERVICE_PORT,
      },
      transport: Transport.TCP,
    };
    this.envConfig.user = {
      options: {
        port: process.env.USER_SERVICE_PORT,
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
