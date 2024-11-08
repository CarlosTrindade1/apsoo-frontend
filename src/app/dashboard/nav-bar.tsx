"use client";

import { DarkThemeToggle, Sidebar } from 'flowbite-react';
import { HiChartPie, HiShoppingBag} from 'react-icons/hi';
import { IoCartOutline, IoLogOutOutline } from "react-icons/io5";

export function Navbar() {
  return (
		<Sidebar className='fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0'>
			<Sidebar.Items>
				<Sidebar.ItemGroup>
					<Sidebar.Item href="/dashboard" icon={HiChartPie}>
						Dashboard
					</Sidebar.Item>
					<Sidebar.Item href="/despensas" icon={HiShoppingBag}>
						Despensas
					</Sidebar.Item>
					<Sidebar.Item href="/mercados" icon={IoCartOutline}>
						Mercados
					</Sidebar.Item>
					<Sidebar.Item href="/" icon={IoLogOutOutline}>
						Sair
					</Sidebar.Item>
				</Sidebar.ItemGroup>
			</Sidebar.Items>
			<DarkThemeToggle/>
		</Sidebar>
  );
}
