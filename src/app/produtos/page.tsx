'use client';

import { Button, Checkbox, Label, Modal, Select, Table, TextInput } from 'flowbite-react';
import FooterApp from '../components/footer';
import Grid from '../components/grid';
import Header from '../components/header';
import { Navbar } from '../components/nav-bar';
import styles from '../components/styles/Grid.module.css';
import ButtonAdder from '../components/button-adder';
import { useEffect, useState } from 'react';
import { ICategoriaDTO, IProdutoDTO } from '../despensas/interfaces/IDespensaDTO';
import { BACKEND_URL } from '../constants';

export default function Produtos() {
	const [produtos, setProdutos] = useState<IProdutoDTO[]>([]);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [categorias, setCategorias] = useState<ICategoriaDTO[]>([]);
	const [nome, setNome] = useState<string>('');
	const [categoria, setCategoria] = useState<string>('');
	const [prioridade, setPrioridade] = useState<string>('');

	function handleModal() {
		setOpenModal(true);

		fetchCategorias().then((data) => setCategorias(data));
	}

	async function fetchCategorias(): Promise<ICategoriaDTO[]> {
		const response = await fetch(`${BACKEND_URL}/api/list-categorias`);

		const data: ICategoriaDTO[] = await response.clone().json();

		return data;
	}

	async function fetchProdutos(): Promise<IProdutoDTO[]> {
		const response = await fetch(`${BACKEND_URL}/api/list-produtos`);

		const data: IProdutoDTO[] = await response.clone().json();

		return data;
	}

	async function addProduto(): Promise<void> {
		if (!nome || !categoria || !prioridade) {
			return;
		}

		// TODO: Realizar a requisição POST para adicionar um produto
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
												<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={produto.id}>
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
								<ButtonAdder content="Adicionar produto" onClick={() => handleModal()}/>
								<Modal show={openModal} onClose={() => setOpenModal(false)}>
									<Modal.Header>Adicionar um produto</Modal.Header>
									<Modal.Body>
										<div className="flex max-w-md flex-col gap-4">
											<div>
												<div className="mb-2 block">
													<Label htmlFor="small" value="Nome" />
												</div>
												<TextInput id="small" type="text" sizing="sm" onChange={(e) => setNome(e.target.value)}/>
											</div>
											<div className="max-w-md">
												<div className="mb-2 block">
													<Label htmlFor="categorias" value="Categoria"/>
												</div>
												<Select id="categorias" required onChange={(e) => setCategoria(e.target.value)}>
													{
														categorias.map((categoria) => {
															return (
																<option key={categoria.id} value={categoria.nome}>{categoria.nome}</option>
															)
														})
													}
												</Select>
											</div>
											<div className="max-w-md">
												<div className="mb-2 block">
													<Label htmlFor="prioridades" value="Prioridade"/>
												</div>
												<Select id="prioridades" required onChange={(e) => setPrioridade(e.target.value)}>
													<option>Baixa</option>
													<option>Baixa Média</option>
													<option>Média</option>
													<option>Média Alta</option>
													<option>Alta</option>
												</Select>
											</div>
										</div>
									</Modal.Body>
									<Modal.Footer>
										<Button onClick={() => setOpenModal(false)}>Adicionar</Button>
									</Modal.Footer>
								</Modal>
							</div>
						)
					}
				</div>
			<Navbar route='produtos' className={styles.navbar} />
			<FooterApp className={styles.footer}/>
		</Grid>
	)
}