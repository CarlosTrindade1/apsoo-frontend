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
        <Modal
          show={openModal}
          position={modalPlacement}
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header>{dadosModal?.despensa.descricao}</Modal.Header>
          <Modal.Body>
            <Table>
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
                          Edit
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