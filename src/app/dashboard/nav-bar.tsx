'use client';

import { CustomFlowbiteTheme, DarkThemeToggle, Flowbite, Sidebar } from 'flowbite-react';
import { HiChartPie, HiShoppingBag} from 'react-icons/hi';
import { IoCartOutline, IoLogOutOutline } from "react-icons/io5";

type NavbarProps = {
	route: string;
}

const customTheme: CustomFlowbiteTheme["sidebar"] = {
  root: {
		inner: 'h-full overflow-y-auto overflow-x-hidden rounded-none bg-gray-50 px-3 py-4 dark:bg-gray-800',
	}
};
	
export function Navbar(props: NavbarProps) {
	const { route } = props;

  return (
		<Flowbite>
			<Sidebar theme={customTheme} className='fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0'>
				<Sidebar.Logo href="/dashboard" img='' >
					Nome do app
				</Sidebar.Logo>
				<Sidebar.Items>
					<Sidebar.ItemGroup>
						<Sidebar.Item href="/dashboard" className={`${route == 'dashboard' ? 'bg-gray-100 dark:bg-gray-700' : ''}`} icon={HiChartPie}>
							Dashboard
						</Sidebar.Item>
						<Sidebar.Item href="/despensas" className={`${route == 'despensas' ? 'bg-gray-100 dark:bg-gray-700' : ''}`} icon={HiShoppingBag}>
							Despensas
						</Sidebar.Item>
						<Sidebar.Item href="/mercados" className={`${route == 'mercados' ? 'bg-gray-100 dark:bg-gray-700' : ''}`} icon={IoCartOutline}>
							Mercados
						</Sidebar.Item>
						<Sidebar.Item href="/" icon={IoLogOutOutline}>
							Sair
						</Sidebar.Item>
					</Sidebar.ItemGroup>
				</Sidebar.Items>
				<DarkThemeToggle/>
			</Sidebar>
		</Flowbite>
  );
}
