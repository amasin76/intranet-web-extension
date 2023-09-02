import { TbInfoSmall } from "react-icons/tb";

const InfoButton: React.FC = () => {
	return (
		<button
			style={{
				display: "flex",
				alignItems: "end",
				padding: "0px",
				width: "auto",
				height: "auto",
				color: "#ddd",
				backgroundColor: "#333",
				border: "none",
				borderRadius: "50%",
				boxShadow: "0 3px 0.5rem rgba(0, 0, 0, 0.5)",
			}}
		>
			<TbInfoSmall size={20} />
		</button>
	);
};

export default InfoButton;
