import { createStorage, StorageType } from "@src/shared/storages/base";

type UserStyleState = {
	bgEnabled: boolean;
	particlesEnabled: boolean;
	customEnabled: boolean;
	bgImages: string[];
	presetsParticles: string[];
	selectedBgImage: string;
	selectedPresetParticles: string;
	customCss: string;
	customParticles: string;
};

const initialState: UserStyleState = {
	bgEnabled: true,
	particlesEnabled: true,
	customEnabled: true,
	bgImages: ["https://i.imgur.com/BUqxLcd.jpg"],
	presetsParticles: ["fireflies", "sparkles"],
	selectedBgImage: "https://i.imgur.com/BUqxLcd.jpg",
	selectedPresetParticles: "fireflies",
	customParticles: "",
	customCss: "",
};

export const userStyleStorage = createStorage<UserStyleState>("user-style-key", initialState, {
	storageType: StorageType.Local,
});
