import { useData } from "../../context/DataContext";
import data from "./data.json";
import "./SelectionFilter.scss";

interface RadioProps {
	className: string;
	id: string;
	name: string;
	defaultChecked?: boolean;
	label: string;
}

const Radio: React.FC<RadioProps> = ({ className, id, name, defaultChecked, label }) => {
	const { setFilter, tasks } = useData();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilter(event.target.value);
	};

	let count = 0;
	if (id === "select-greens") {
		count = tasks.filter((task) => task.status === "yes").length;
	} else if (id === "select-reds") {
		count = tasks.filter((task) => task.status === "no").length;
	}

	return (
		<label className={className} id={id}>
			<input type="radio" name={name} defaultChecked={defaultChecked} onChange={handleChange} value={id} />
			<div className="filter-btn">
				{label} {count ? <span className="badge">{count}</span> : ""}
			</div>
		</label>
	);
};

export const SelectionFilter: React.FC = () => {
	return (
		<div className="selects">
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
