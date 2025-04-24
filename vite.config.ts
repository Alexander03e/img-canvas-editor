import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/img-canvas-editor/',
    resolve: {
        alias: {
            '@Shared': path.resolve(__dirname, './src/shared'),
            '@Components': path.resolve(__dirname, './src/components'),
            '@Assets': path.resolve(__dirname, './src/assets'),
            '@App': path.resolve(__dirname, './src/app'),
            '@Features': path.resolve(__dirname, './src/features'),
            '@scss': path.resolve(__dirname, './src/assets/scss'),
        },
    },
});
