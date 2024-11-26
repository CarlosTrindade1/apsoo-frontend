import { Tooltip } from "flowbite-react";
import { FaPlus } from 'react-icons/fa';

type ButtonAdderProps = {
	content: string;
	onClick?: () => void;
}

export default function ButtonAdder({ content, onClick }: ButtonAdderProps) {
	return (
		<div className="absolute bottom-24 right-12">
			<Tooltip content={content}>
				<button type="button" onClick={onClick} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><FaPlus/></button>
			</Tooltip>
		</div>
	)
}