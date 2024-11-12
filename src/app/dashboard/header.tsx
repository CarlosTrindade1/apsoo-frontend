'use client';

import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';

type BreadcrumbItem = {
	href: string;
	text: string;
}

type HeaderProps = {
	className?: string;
	text: string;
	items: BreadcrumbItem[];
}

export default function Header(props: HeaderProps) {
	const { className, text, items } = props;

  return (
		<div className={className + ' p-5'}>
			<h1 className='text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>{text}</h1>
			<Breadcrumb aria-label="Default breadcrumb example">
				<Breadcrumb.Item href="/dashboard" icon={HiHome}>
					Home
				</Breadcrumb.Item>
				{
					items.map((item, index) => {
						return (
							<Breadcrumb.Item key={index} href={item.href}>{item.text}</Breadcrumb.Item>
						)
					})
				}
			</Breadcrumb>
		</div>
	)
}