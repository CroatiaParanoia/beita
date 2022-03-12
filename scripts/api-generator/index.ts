import { generateApi } from 'swagger-typescript-api';
import path from 'path';
import dotenv from 'dotenv';

const envConfig = dotenv.config();

const outputDir = path.resolve(process.cwd(), './src/api/shuke');

// @ts-ignore
const env = envConfig.parsed! as ImportMeta['env'];

/* NOTE: all fields are optional expect one of `output`, `url`, `spec` */
// @ts-ignore
generateApi({
  url: env.VITE_SHUKE_SWAGGER_URL,
  templates: path.resolve(__dirname, './templates'),
  name: 'Api.ts',
  output: outputDir,
  modular: false,
  axios: true,
  routeTypes: true,
  httpClientType: 'axios', // or "fetch"
  unwrapResponseData: true,
});
