import { useState, useEffect } from "react";
import themeStorage from "@src/shared/storages/themeStorage";
import UserStyle from "./components/userStyle/";
import "@assets/style/theme.scss";

const Options: React.FC = () => {
	const [theme, setTheme] = useState<"light" | "dark">("dark");

	useEffect(() => {
		themeStorage.get().then(setTheme);
		themeStorage.subscribe(() => {
			themeStorage.get().then(setTheme);
		});
	}, []);

	return (
		<div className="container h-screen mx-auto px-4 sm:px-6 lg:px-60 py-5 bg-gray-900 text-white">
			<UserStyle />
		</div>
	);
};

export default Options;
