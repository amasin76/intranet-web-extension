/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import { generateFileKey, getPlugins } from "./utils/vite";

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, "src");
const pagesDir = resolve(srcDir, "pages");

const isDev = process.env.__DEV__ === "true";
const isProduction = !isDev;

export default defineConfig({
	resolve: {
		alias: {
			"@root": rootDir,
			"@src": srcDir,
			"@assets": resolve(srcDir, "assets"),
			"@pages": pagesDir,
		},
	},
	plugins: [...getPlugins(isDev), react()],
	publicDir: resolve(rootDir, "public"),
	build: {
		outDir: resolve(rootDir, "dist"),
		/** Can slow down build speed. */
		// sourcemap: isDev,
		minify: isProduction,
		modulePreload: false,
		reportCompressedSize: isProduction,
		emptyOutDir: !isDev,
		rollupOptions: {
			input: {
				// ADD: particles.js page to the content
				content: resolve(pagesDir, "content", "index.ts"),
				background: resolve(pagesDir, "background", "index.ts"),
				contentStyle: resolve(pagesDir, "content", "style.scss"),
				popup: resolve(pagesDir, "popup", "index.html"),
				options: resolve(pagesDir, "options", "index.html"),
			},
			output: {
				entryFileNames: "src/pages/[name]/index.js",
				chunkFileNames: isDev ? "assets/js/[name].js" : "assets/js/[name].[hash].js",
				assetFileNames: (assetInfo) => {
					const { name } = path.parse(assetInfo.name);
					const assetFileName =
						name === "contentStyle" ? `${name}${generateFileKey("src/pages/content/style.scss")}` : name;
					return `assets/[ext]/${assetFileName}.chunk.[ext]`;
				},
			},
		},
	},
	test: {
		globals: true,
		environment: "jsdom",
		include: ["**/*.test.ts", "**/*.test.tsx"],
		setupFiles: "./test-utils/vitest.setup.js",
	},
});
