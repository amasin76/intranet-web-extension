import { useData } from "../../context/DataContext";
import data from "./data.json";

interface RadioProps {
	className: string;
	id: string;
	name: string;
	defaultChecked?: boolean;
	label: string;
}

const Radio: React.FC<RadioProps> = ({ className, id, name, defaultChecked, label }) => {
	const { setFilter } = useData();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilter(event.target.value);
	};

	return (
		<label className={className} id={id}>
			<input type="radio" name={name} defaultChecked={defaultChecked} onChange={handleChange} value={id} />
			<div>{label}</div>
		</label>
	);
};

export const SelectionFilter: React.FC = () => {
	return (
		<div className="selects">
			<span>Select:</span>
			{data.map((item) => (
				<Radio
					key={item.id}
					className={item.className}
					id={item.id}
					name={item.name}
					label={item.label}
					defaultChecked={item.defaultChecked}
				/>
			))}
		</div>
	);
};
