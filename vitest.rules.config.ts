import { defineConfig } from 'vitest/config';

// Tests des règles de sécurité : à lancer avec l'émulateur Firestore (npm run test:rules).
export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.rules.test.ts'],
    testTimeout: 20000,
    fileParallelism: false,
  },
});
