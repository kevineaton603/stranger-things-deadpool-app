/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEADPOOL_API_URI: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
