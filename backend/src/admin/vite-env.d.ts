/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string
  // voeg hier meer VITE_* variabelen toe als je die hebt
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
