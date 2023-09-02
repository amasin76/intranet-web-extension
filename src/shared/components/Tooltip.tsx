import { useState, useRef } from "react";
import "./Tooltip.scss";

interface TooltipProps {
	text: string;
	children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
	const [show, setShow] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleMouseEnter = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => setShow(true), 500);
	};

	const handleMouseLeave = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setShow(false);
	};

	return (
		<div
			className="tooltip"
			style={{ position: "relative" }}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			data-tooltip={show ? text : undefined}
		>
			{children}
		</div>
	);
};

export default Tooltip;
