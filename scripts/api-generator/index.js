// eslint-disable-next-line @typescript-eslint/no-require-imports
const { generateApi } = require('swagger-typescript-api');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');
const outputDir = path.resolve(process.cwd(), './src/api/shuke');

/* NOTE: all fields are optional expect one of `output`, `url`, `spec` */
generateApi({
  // input: path.resolve(__dirname, "./schemas.json"),
  // url: 'http://shuke.cccboy.com/api-json',
  url: 'http://shuke.cccboy.com/api-json',
  templates: path.resolve(__dirname, './templates'),
  name: 'Api.ts',
  output: outputDir,
  modular: false,
  axios: true,
  routeTypes: true,
  httpClientType: 'axios', // or "fetch"
  unwrapResponseData: true,
});
