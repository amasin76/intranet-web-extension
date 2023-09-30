import { BaseStorage, createStorage, StorageType } from "@src/shared/storages/base";

type Theme = "light" | "dark";

type ThemeStorage = BaseStorage<Theme> & {
	toggle: () => void;
};

const storage = createStorage<Theme>("theme-storage-key", "dark", {
	storageType: StorageType.Local,
});

const themeStorage: ThemeStorage = {
	...storage,
	toggle: () => {
		storage.set((currentTheme) => {
			return currentTheme === "light" ? "dark" : "light";
		});
	},
};

export default themeStorage;
