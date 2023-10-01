import { useState, useEffect } from "react";
import Switch from "@src/shared/components/Switch";
import useStorage from "@src/shared/hooks/useStorage";
import { userStyleStorage } from "@src/shared/storages/userStyleStorage";
import ImagePreview from "@src/shared/components/ImagePreview";

const Background: React.FC = () => {
	const { bgEnabled } = useStorage(userStyleStorage);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [images, setImages] = useState<string[]>([]);

	useEffect(() => {
		userStyleStorage.get().then((data) => {
			if (data?.bgImages) {
				setImages(data.bgImages);
			}
			if (data?.selectedBgImage) {
				setSelectedImage(data.selectedBgImage);
			}
		});
	}, []);

	useEffect(() => {
		userStyleStorage.update("bgImages", images);
	}, [images]);

	const handleImageClick = (src: string) => {
		setSelectedImage(src);
		userStyleStorage.update("selectedBgImage", src);
	};

	const handleDelete = (index: number) => {
		const newImages = [...images];
		if (images[index] === selectedImage) {
			setSelectedImage("");
			userStyleStorage.update("selectedBgImage", "");
		}
		newImages.splice(index, 1);
		setImages(newImages);
		userStyleStorage.update("bgImages", newImages);
	};

	const handleBackground = () => (e: React.ChangeEvent<HTMLInputElement>) => {
		const isEnabled = e.target.checked;
		if (isEnabled && selectedImage) {
			userStyleStorage.update("selectedBgImage", selectedImage);
		} else {
			userStyleStorage.update("selectedBgImage", "");
		}
		userStyleStorage.update("bgEnabled", isEnabled);
	};

	return (
		<>
			<div className="flex items-center gap-4">
				<h3 className="text-2xl text-gray-400">Background</h3>
				<Switch checked={bgEnabled} onChange={handleBackground()} />
			</div>
			{bgEnabled && (
				<div className="flex flex-wrap gap-2 ml-4">
					{images.map((src, index) => (
						<ImagePreview
							key={index}
							src={src}
							onClick={() => handleImageClick(src)}
							isSelected={selectedImage === src}
							onDelete={() => handleDelete(index)}
						/>
					))}
					<ImagePreview src="" onNewImage={(src) => setImages([...images, src])} />
				</div>
			)}
		</>
	);
};

export default Background;
