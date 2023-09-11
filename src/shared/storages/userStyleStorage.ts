import { createStorage, StorageType } from "@src/shared/storages/base";

type UserStyleState = {
	customCss: string;
};

const initialState: UserStyleState = {
	customCss: "",
};

const userStyleStorage = createStorage<UserStyleState>("custom-css-key", initialState, {
	storageType: StorageType.Local,
});

export default userStyleStorage;
