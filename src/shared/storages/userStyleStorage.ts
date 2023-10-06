import { createStorage, StorageType } from "@src/shared/storages/base";

type UserStyleState = {
	bgEnabled: boolean;
	particlesEnabled: boolean;
	customEnabled: boolean;
	bgImages: string[];
	presetsParticles: string[];
	selectedBgImage: string;
	selectedPresetParticles: string;
	particlesSettings: { fpsLimit: number };
	customParticles: string;
	customCss: string;
};

const initialState: UserStyleState = {
	bgEnabled: false,
	particlesEnabled: false,
	customEnabled: false,
	bgImages: ["https://i.imgur.com/BUqxLcd.jpg"],
	presetsParticles: ["fireflies", "sparkles"],
	selectedBgImage: "https://i.imgur.com/BUqxLcd.jpg",
	selectedPresetParticles: "sparkles",
	particlesSettings: { fpsLimit: 30 },
	customParticles: "",
	customCss: "",
};

export const userStyleStorage = createStorage<UserStyleState>("user-style-key", initialState, {
	storageType: StorageType.Local,
});
