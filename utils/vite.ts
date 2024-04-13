import * as fs from "fs";
import * as crypto from "crypto";
import { type PluginOption } from "vite";
import makeManifest from "./plugins/make-manifest";
import customDynamicImport from "./plugins/custom-dynamic-import";
import addHmr from "./plugins/add-hmr";
import watchRebuild from "./plugins/watch-rebuild";
import inlineVitePreloadScript from "./plugins/inline-vite-preload-script";

export const getPlugins = (isDev: boolean): PluginOption[] => [
	makeManifest({ getCacheInvalidationKey }),
	customDynamicImport(),
	addHmr({ background: true, view: true, isDev }),
	isDev && watchRebuild({ afterWriteBundle: regenerateCacheInvalidationKey }),
	inlineVitePreloadScript(),
];

const cacheInvalidationKeyRef = { current: generateKey() };

export function getCacheInvalidationKey() {
	return cacheInvalidationKeyRef.current;
}

function regenerateCacheInvalidationKey() {
	cacheInvalidationKeyRef.current = generateKey();
	return cacheInvalidationKeyRef;
}

function generateKey(): string {
	return `${Date.now().toFixed()}`;
}

export function generateFileKey(filePath: string): string {
	const content = fs.readFileSync(filePath);
	const hash = crypto.createHash("sha256").update(content).digest("hex");
	return hash.substring(0, 12);
}
