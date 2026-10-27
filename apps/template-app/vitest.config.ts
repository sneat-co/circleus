import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: [fileURLToPath(new URL('./src/test-setup.ts', import.meta.url))],
    environmentOptions: { jsdom: { url: 'http://localhost/' } },
    server: { deps: { inline: [/@ionic/, /ionicons/, /@sneat/] } },
    deps: {
      optimizer: {
        web: { include: ['@ionic/angular', '@ionic/core', 'ionicons'] },
      },
    },
  },
});
