export interface ILocalStorage {
	save(key: string, value: unknown): Promise<void>;
	load<T>(key: string): Promise<T>;
	resetAll(): Promise<void>;
}

export class LocalStorage implements ILocalStorage {
	async save(key: string, value: unknown) {
		return chrome.storage.local.set({ [key]: value });
	}

	async load<T>(key: string): Promise<T> {
		return new Promise((resolve, reject) => {
			chrome.storage.local.get([key], (result) => {
				const value = result[key];
				if (value === null || value === undefined) {
					const notFoundError = new Error();
					notFoundError.name = "Not Found Storage Value";
					notFoundError.message = `The [${key}] key could not be found. Register or change your key value`;

					reject(notFoundError);
				} else {
					resolve(value);
				}
			});
		});
	}

	async resetAll(): Promise<void> {
		await chrome.storage.local.clear();
	}
}
