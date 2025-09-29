/// <reference types="@rstest/core/globals" />
/// <reference types="@testing-library/jest-dom" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {};
