'use client';

import { Button, Card, Dropdown, Modal, Table } from 'flowbite-react';
import FooterApp from '../components/footer';
import Grid from '../components/grid';
import Header from '../components/header';
import { Navbar } from '../components/nav-bar';
import styles from '../components/styles/Grid.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../constants';
import { IDespensaDTO, IDespensaItensDTO } from './interfaces/IDespensaDTO';

type DataModal = {
  despensa: IDespensaDTO;
  itens: IDespensaItensDTO;
}

export default function Despensas() {
  const [despensas, setDespensas] = useState<IDespensaDTO[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement, setModalPlacement] = useState('center')
  const [dadosModal, setDadosModal] = useState<DataModal>();

  async function fetchDespensas(): Promise<IDespensaDTO[]> {
    const response = await fetch(`${BACKEND_URL}/api/list-despensas`);

    const data: IDespensaDTO[] = await response.clone().json();

    return data;
  }

  async function fetchItensDespensa(despensa: IDespensaDTO): Promise<IDespensaItensDTO> {
    const response = await fetch(`${BACKEND_URL}/api/despensa-itens/${despensa.id}`);

    const data: IDespensaItensDTO = await response.clone().json();

    return data;
  }

  function setModal(despensa: IDespensaDTO) {
    fetchItensDespensa(despensa).then((data) => {
      setDadosModal({
        despensa: despensa,
        itens: data
      });
    });
    setModalPlacement('center');
    setOpenModal(true);
  }

  useEffect(() => {
    fetchDespensas().then((data) => {
      setDespensas(data);
    });
  }, []);

  return (
    <Grid>
      <Header 
				className={styles.header}
				text='Despensas'
				items={[
					{ href: '/despensas', text: 'Despensas' }
				]}
			/>
      <Navbar route="despensas" className={styles.navbar}/>
      <div className={styles.content}>
        {
          despensas.length === 0 ? (
            <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                    <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                    </svg>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="flex items-center mt-4">
                  <svg className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                    </svg>
                    <div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                        <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-8">
              {despensas.map((despensa: IDespensaDTO) => {
                return (
                  <Card className="max-w-sm">
                    <div className="flex justify-end px-4 pt-4">
                      <Dropdown inline label="">
                        <Dropdown.Item>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Editar
                          </a>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Excluir
                          </a>
                        </Dropdown.Item>
                      </Dropdown>
                    </div>
                    <div className="flex flex-col items-center pb-10">
                      <Image
                        alt="Nome da Despensa"
                        height="96"
                        src="/static/despensa-01.jpg"
                        width="96"
                        className="mb-3 rounded-full shadow-lg"
                      />
                      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{despensa.descricao}</h5>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Usuário dono da despensa</span>
                      <div className="mt-4 flex space-x-3 lg:mt-6">
                        <a
                          href="#"
                          className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                        >
                          Lista de compras
                        </a>
                        <Button onClick={() => setModal(despensa)}>Visualizar</Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )
        }
        <Modal
          show={openModal}
          position={modalPlacement}
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header>{dadosModal?.despensa.descricao}</Modal.Header>
          <Modal.Body>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Produto</Table.HeadCell>
                <Table.HeadCell>Categoria</Table.HeadCell>
                <Table.HeadCell>Data de vencimento</Table.HeadCell>
                <Table.HeadCell>Preço</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {dadosModal?.itens.item_set.map((item) => {
                  return (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {item.produto.nome}
                      </Table.Cell>
                      <Table.Cell>{item.produto.categoria.nome}</Table.Cell>
                      <Table.Cell>{item.data_vencimento}</Table.Cell>
                      <Table.Cell>R$ {item.preco}</Table.Cell>
                      <Table.Cell>
                        <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                          Editar
                        </a>
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpenModal(false)}>Adicionar item</Button>
          </Modal.Footer>
        </Modal>
      </div>
      <FooterApp className={styles.footer}/>
    </Grid>
  )
}