import { ChangeEvent, FC } from "react";
import "./Switch.scss";

interface SwitchProps {
	checked: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Switch: FC<SwitchProps> = ({ checked, onChange }) => {
	return (
		<label className="toggle-switch">
			<input type="checkbox" checked={checked} onChange={onChange} />
			<span className="slider round"></span>
		</label>
	);
};

export default Switch;
