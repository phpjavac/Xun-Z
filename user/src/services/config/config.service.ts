export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.USER_SERVICE_PORT;
    this.envConfig.sql = {
      type: process.env.SQL_TYPE,
      host: process.env.SQL_HOST,
      port: process.env.SQL_PORT,
      username: process.env.SQL_USERNAME,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DATABASE,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
