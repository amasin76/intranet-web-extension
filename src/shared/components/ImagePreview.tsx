import { useState, ChangeEvent } from "react";
import { BsTrashFill, BsPlusCircleFill } from "react-icons/bs";

interface ImagePreviewProps {
	src: string;
	isSelected?: boolean;
	onNewImage?: (src: string) => void;
	onClick?: () => void;
	onDelete?: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ src, isSelected, onNewImage, onClick, onDelete }) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null;
		const fileSize = file?.size / 1024 / 1024;
		const SIZE_LIMIT = 3;

		if (file && fileSize > SIZE_LIMIT) {
			alert(`Maximum size is ${SIZE_LIMIT}MB`);
		} else if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const contents = e.target.result as string;
				if (onNewImage) {
					onNewImage(contents);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`relative grid place-items-center w-80 ${isSelected ? "outline outline-green-500" : ""}`}
			onClick={onClick}
		>
			{src !== "" ? (
				<img src={src} alt="Preview" className="block w-full h-full" />
			) : (
				<>
					<label
						htmlFor="upload-img"
						className="inline-flex items-center gap-1 px-5 py-2.5 border-2 border-blue-500 text-blue-500 hover:text-blue-100 hover:bg-blue-500 rounded cursor-pointer"
					>
						<BsPlusCircleFill />
						New Image
					</label>
					<input
						type="file"
						accept="image/png, image/jpeg, image/jpg, image/gif, image/avif, image/webp"
						id="upload-img"
						onChange={handleFileChange}
						className="hidden"
					/>
				</>
			)}
			{src && isHovered && (
				<div
					className="absolute top-1 right-1 p-2 text-white hover:text-red-500 bg-black/20 rounded cursor-pointer"
					onClick={(e) => {
						e.stopPropagation(); // Prevent the image from being selected when the trash icon is clicked
						if (onDelete) {
							onDelete();
						}
					}}
				>
					<BsTrashFill className="h-5 w-5" />
				</div>
			)}
		</div>
	);
};

export default ImagePreview;
