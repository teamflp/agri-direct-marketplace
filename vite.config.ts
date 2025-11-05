
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { sentryVitePlugin } from "@sentry/vite-plugin";

import { readFileSync } from 'fs';
const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/agri-direct-marketplace/',
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(packageJson.version),
  },
  server: {
    host: "0.0.0.0",
    port: 8080,
    allowedHosts: ["23ff6dbb-675a-4f6f-a924-6b34b8f04e96.lovableproject.com"],
  },
  build: {
    sourcemap: true, // Enable source maps for Sentry
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    // Sentry plugin must be added before any other plugins that transform source code
    sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      // Auth token can be obtained from Sentry settings
      authToken: process.env.SENTRY_AUTH_TOKEN,
      // In a real application, you would probably want to disable this for development builds
      // and only enable it for production builds.
      // For this example, we'll enable it for all builds.
      // disabled: mode !== 'production',
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
