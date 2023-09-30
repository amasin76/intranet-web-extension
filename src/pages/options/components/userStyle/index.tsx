import Particles from "./Particles";
import Background from "./Background";
import Custom from "./Custom";

const UserStyle: React.FC = () => {
	return (
		<div className="flex flex-col gap-4 text-lg bg-gray-800 shadow rounded-lg px-5 py-6 sm:px-6">
			<div className="w-full">
				<h2 className="inline mb-4 mr-2 text-4xl font-bold text-gray-500">User Style</h2>
				<span className="bg-yellow-900 text-yellow-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded align-top">
					beta
				</span>
			</div>
			<Background />
			<Particles />
			<Custom />
		</div>
	);
};

export default UserStyle;
