import { LocalStorage } from "@src/shared/storages/localStorage";

const userStyle = () => {
	const userStyletStorage = new LocalStorage();

	(async () => {
		try {
			const data: { customCss: string; selectedBgImage: string } = await userStyletStorage.load(
				"user-style-key"
			);
			const { customCss, selectedBgImage } = data;
			if (customCss) {
				const styleElement = document.createElement("style");
				styleElement.textContent = customCss;
				styleElement.id = "user-style";
				document.head.append(styleElement);
			}
			if (selectedBgImage) {
				document.body.style.backgroundImage = `url("${selectedBgImage}")`;
				document.body.style.backgroundSize = "cover";
			}
		} catch (err) {
			console.warn(err);
		}
	})();
};

export default userStyle;
