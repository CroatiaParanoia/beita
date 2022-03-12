/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_SHUKE_API_URL: string;
  readonly VITE_SHUKE_SWAGGER_URL: string;
  readonly VITE_API_ENV: string;

  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
