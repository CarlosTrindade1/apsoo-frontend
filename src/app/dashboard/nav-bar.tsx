import Link from "next/link";

type PropsNavbar = {
	path: string;
}

export default function Navbar(props: PropsNavbar) {
  return (
    <div> 
			<button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
				<span className="sr-only">Open sidebar</span>
				<svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
				<path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
				</svg>
			</button>

			<aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
				<div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
					<a href="https://flowbite.com/" className="flex items-center ps-2.5 mb-5">
						<img src="https://flowbite.com/docs/images/logo.svg" className="h-6 me-3 sm:h-7" alt="Flowbite Logo"/>
						<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Nome do app</span>
					</a>
					<ul className="space-y-2 font-medium">
						<li>
							<Link href="/dashboard" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${props.path == 'dashboard' ? 'bg-gray-700' : ''} hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
								<svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
									<path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
									<path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
								</svg>
								<span className="ms-3">Dashboard</span>
							</Link>
						</li>
						<li>
							<Link href="/despensas" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${props.path == 'despensas' ? 'bg-gray-700' : ''} hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
								<svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
									<path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
								</svg>
								<span className="flex-1 ms-3 whitespace-nowrap">Despensas</span>
							</Link>
						</li>
						<li>
							<Link href="/mercados" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${props.path == 'mercados' ? 'bg-gray-700' : ''} hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
								<svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
									<path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
								</svg>
								<span className="flex-1 ms-3 whitespace-nowrap">Mercados</span>
							</Link>
						</li>
						<li>
							<Link href="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
								<svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
										<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
								</svg>
								<span className="flex-1 ms-3 whitespace-nowrap">Sair</span>
							</Link>
						</li>
					</ul>
				</div>
			</aside>
		</div>
  );
}