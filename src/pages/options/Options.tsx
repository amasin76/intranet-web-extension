import { useState, useEffect } from "react";
import themeStorage from "@src/shared/storages/themeStorage";
import UserStyle from "./components/userStyle/";
import "@assets/style/theme.scss";
import "./Options.css";

const Options: React.FC = () => {
	const [theme, setTheme] = useState<"light" | "dark">("dark");

	useEffect(() => {
		themeStorage.get().then(setTheme);
		themeStorage.subscribe(() => {
			themeStorage.get().then(setTheme);
		});
	}, []);

	return (
		<div className="min-h-screen lg:px-60 md:px-10 sm:px-2 py-5 bg-gray-900 text-white">
			<UserStyle />
		</div>
	);
};

export default Options;
