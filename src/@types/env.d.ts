/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_EXPIRATE_IN_MINUTES: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}