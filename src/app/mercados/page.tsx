'use client';

import { Button, Checkbox, Label, Modal, Table, TextInput } from 'flowbite-react';
import FooterApp from '../components/footer';
import Grid from '../components/grid';
import Header from '../components/header';
import { Navbar } from '../components/nav-bar';
import styles from '../components/styles/Grid.module.css';
import { useEffect, useState } from 'react';
import { IMercadoDTO } from '../despensas/interfaces/IDespensaDTO';
import ButtonAdder from '../components/button-adder';

export default function Mercados() {
  const [mercados, setMercados] = useState<IMercadoDTO[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [mercado, setMercado] = useState<IMercadoDTO>({ id: 0, nome: '' });


  async function fetchMercados(): Promise<IMercadoDTO[]> {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(`${BACKEND_URL}/api/list-mercados`);

    const data: IMercadoDTO[] = await response.clone().json();

    return data;
  }

  async function addMercado(): Promise<void> {
    if (!mercado || !process.env.NEXT_PUBLIC_TOKEN_PATH || !process.env.NEXT_PUBLIC_BACKEND_URL) {
      return;
    }

    const token = localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_PATH);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/list-mercados`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: mercado.nome }),
      })

      if (!response.ok) {
        throw new Error('Erro ao cadastrar mercado.');
      }

      const data = await response.json();

      mercados.push({ id: data.id, nome: data.nome });

      setMercados(mercados);
      setOpenModal(false);
      setMercado({ nome: '' });
    } catch (e: any) {
      console.log(e.message);
    }
  }

  async function deleteMercado(mercadoID: number): Promise<void> {
    if (!mercadoID) return;

    try {
      if (!process.env.NEXT_PUBLIC_BACKEND_URL || !process.env.NEXT_PUBLIC_TOKEN_PATH) {
        throw new Error('Erro ao deletar mercado');
      }

      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const token = localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_PATH);

      console.log(token);

      const response = await fetch(`${BACKEND_URL}/api/mercado/${mercadoID}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Erro ao deletar mercado');
      }

      const newMercados: IMercadoDTO[] = mercados.filter((mercado) => {
        mercado.id !== mercadoID
      });

      setMercados(newMercados);
    } catch (e: any) {
      console.log(e.message);
    }
  }

  async function handleEditMercado(mercado: IMercadoDTO) {
    setMercado(mercado);
    setOpenEditModal(true);
  }

  async function editMercado(): Promise<void> {
    if (!process.env.NEXT_PUBLIC_TOKEN_PATH || !process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error('Erro ao salvar modificações');
    }

    const token = localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_PATH);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mercado/${mercado.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nome: mercado.nome })
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao salvar modificações');
      }
      
      mercados.map((mercadoItem) => {
        mercadoItem.id === mercado.id ? mercadoItem.nome = mercado.nome : mercadoItem
      })

      setMercados(mercados);

      setOpenEditModal(false);

    } catch (e: any) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    if (mercados.length === 0) {
      fetchMercados().then((data) => {
        setMercados(data);
      })
    }
  }, [mercados]);

  return (
    <Grid>
      <Header 
				className={styles.header}
				text='Mercados'
				items={[
					{ href: '/mercados', text: 'Mercados' }
				]}
			/>
      <Navbar route="mercados" className={styles.navbar}/>
      <div className={styles.content}>
        {
          mercados.length === 0 ? (
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
                  <Table.HeadCell>
                    <span className="sr-only">Editar</span>
                  </Table.HeadCell>
                  <Table.HeadCell>
                    <span className="sr-only">Excluir</span>
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {mercados.map((mercado) => {
                    return (
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={mercado.id}>
                        <Table.Cell className="p-4">
                          <Checkbox />
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {mercado.nome}
                        </Table.Cell>
                        <Table.Cell>
                          <a onClick={() => handleEditMercado(mercado)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                            Editar
                          </a>
                        </Table.Cell>
                        <Table.Cell>
                          <a onClick={() => deleteMercado(mercado.id!)} className="font-medium text-red-600 hover:underline dark:text-cyan-500">
                            Excluir
                          </a>
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
              <ButtonAdder content="Adicionar mercado" onClick={() => setOpenModal(true)}/>
              <Modal show={openModal} onClose={() => setOpenModal(false)}>
									<Modal.Header>Adicionar um produto</Modal.Header>
									<Modal.Body>
										<div className="flex max-w-md flex-col gap-4">
											<div>
												<div className="mb-2 block">
													<Label htmlFor="small" value="Nome" />
												</div>
												<TextInput id="small" type="text" sizing="sm" onChange={(e) => setMercado({ nome: e.target.value })}/>
											</div>
										</div>
									</Modal.Body>
									<Modal.Footer>
										<Button onClick={() => addMercado()}>Adicionar</Button>
									</Modal.Footer>
              </Modal>
              <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
                <Modal.Header>Editar um produto</Modal.Header>
                <Modal.Body>
                  <div className="flex max-w-md flex-col gap-4">
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="small" value="Nome" />
                      </div>
                      <TextInput id="small" value={mercado.nome} type="text" sizing="sm" onChange={(e) => setMercado({
                        id: mercado.id,
                        nome: e.target.value
                      })}/>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => editMercado()}>Salvar</Button>
                </Modal.Footer>
              </Modal>
            </div>
          )
        }
      </div>
      <FooterApp className={styles.footer}/>
    </Grid>
  )
}