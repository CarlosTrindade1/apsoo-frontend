'use client';

import { Checkbox, Table } from 'flowbite-react';
import FooterApp from '../components/footer';
import Grid from '../components/grid';
import Header from '../components/header';
import { Navbar } from '../components/nav-bar';
import styles from '../components/styles/Grid.module.css';
import ButtonAdder from '../components/button-adder';
import { useEffect, useState } from 'react';
import { IProdutoDTO } from '../despensas/interfaces/IDespensaDTO';
import { BACKEND_URL } from '../constants';

export default function Produtos() {
	const [produtos, setProdutos] = useState<IProdutoDTO[]>([]);

	async function fetchProdutos(): Promise<IProdutoDTO[]> {
		const response = await fetch(`${BACKEND_URL}/api/list-produtos`);

		const data: IProdutoDTO[] = await response.clone().json();

		return data;
	}

	useEffect(() => {
		if (produtos.length === 0) {
			fetchProdutos().then((data) => {
				setProdutos(data);
			})
		}
	}, produtos)

	return (
			<Grid>
				<Header
					className={styles.header}
					text='Produtos'
					items={[
						{ href: '/produtos', text: 'Produtos' }
					]}
				/>
				<div className={styles.content}>
					{
						produtos.length === 0 ? (
							<div role="status" className="max-w-sm animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                <span className="sr-only">Loading...</span>
            	</div>
						) : (
							<div className="overflow-x-auto">
								<Table hoverable>
									<Table.Head>
										<Table.HeadCell className="p-4">
											<Checkbox />
										</Table.HeadCell>
										<Table.HeadCell>Nome</Table.HeadCell>
										<Table.HeadCell>Categoria</Table.HeadCell>
										<Table.HeadCell>
											<span className="sr-only">Editar</span>
										</Table.HeadCell>
										<Table.HeadCell>
											<span className="sr-only">Excluir</span>
										</Table.HeadCell>
									</Table.Head>
									<Table.Body className="divide-y">
										{produtos.map((produto) => {
											return (
												<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
													<Table.Cell className="p-4">
														<Checkbox />
													</Table.Cell>
													<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
														{produto.nome}
													</Table.Cell>
													<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
														{produto.categoria.nome}
													</Table.Cell>
													<Table.Cell>
														<a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
															Editar
														</a>
													</Table.Cell>
													<Table.Cell>
														<a href="#" className="font-medium text-red-600 hover:underline dark:text-cyan-500">
															Excluir
														</a>
													</Table.Cell>
												</Table.Row>
											)
										})}
									</Table.Body>
								</Table>
								<ButtonAdder content="Adicionar produto"/>
							</div>
						)
					}
				</div>
			<Navbar route='produtos' className={styles.navbar} />
			<FooterApp className={styles.footer}/>
		</Grid>
	)
}