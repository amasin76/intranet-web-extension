import { createStorage, StorageType } from "@src/shared/storages/base";

type CollapseState = {
	collapseSuccess: boolean;
	collapseFail: boolean;
};

const initialState: CollapseState = {
	collapseSuccess: false,
	collapseFail: false,
};

const collapseStorage = createStorage<CollapseState>("collapse-storage-key", initialState, {
	storageType: StorageType.Local,
});

export default collapseStorage;
