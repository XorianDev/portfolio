/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';
import { defineConfig } from 'vitest/config';

export default defineConfig(
  getViteConfig({
    test: {
      environment: 'jsdom',
    },
  })
);