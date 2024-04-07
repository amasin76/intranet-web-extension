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
