import { TbExternalLink } from "react-icons/tb";
import "./ExternalLink.scss";

type ClassName = "button" | "link" | string;

interface LinkProps {
	href: string;
	className: ClassName;
	text: string;
	size?: number;
}

const Link: React.FC<LinkProps> = ({ href, className, text, size = 18 }) => {
	return (
		<a href={href} target="_blank" rel="noopener noreferrer" className={className}>
			{text}
			{className.includes("link") && <TbExternalLink className="icon" size={size} />}
		</a>
	);
};

export default Link;
