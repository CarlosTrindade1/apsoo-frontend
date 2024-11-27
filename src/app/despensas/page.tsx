'use client';

import { Button, Card, Checkbox, Dropdown, Label, Modal, Select, Table, TextInput } from 'flowbite-react';
import FooterApp from '../components/footer';
import Grid from '../components/grid';
import Header from '../components/header';
import { Navbar } from '../components/nav-bar';
import styles from '../components/styles/Grid.module.css';
import Image from 'next/image';
import React, { use, useEffect, useState } from 'react';
import { BACKEND_URL } from '../constants';
import { ICategoriaDTO, IDespensaDTO, IDespensaItensDTO, IMercadoDTO, IProdutoDTO } from './interfaces/IDespensaDTO';
import { useRouter } from 'next/navigation';
import ButtonAdder from '../components/button-adder';

type DataModal = {
  despensa: IDespensaDTO;
  itens: IDespensaItensDTO;
}

type item = {
  id: number;
  produto: IProdutoDTO;
  data_vencimento: string;
  data_compra: string;
  preco: number;
  consumido: boolean;
  mercado: IMercadoDTO;
  comprador: string;
  despensa: number;
}

type DadosModalItem = {
  despensa: IDespensaDTO,
  item: item
}

export default function Despensas() {
  const [despensas, setDespensas] = useState<IDespensaDTO[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement, setModalPlacement] = useState('center')
  const [dadosModal, setDadosModal] = useState<DataModal | null>(null);
  const [openModalItem, setOpenModalItem] = useState<boolean>(false);
  const [mercados, setMercados] = useState<IMercadoDTO[]>([]);
  const [produtos, setProdutos] = useState<IProdutoDTO[]>([]);
  const [dadosModalItem, setDadosModalItem] = useState<DadosModalItem>({
    despensa: {
      categorias: [],
      descricao: '',
      id: 0
    },
    item: {
      id: 0,
      comprador: '',
      consumido: false,
      data_compra: '',
      data_vencimento: '',
      despensa: 0,
      mercado: {
        nome: ''
      },
      preco: 0,
      produto: {
        id: 0,
        categoria: {
          id: 0,
          nome: ''
        },
        nome: '',
        prior: ''
      }
    }
  });

  const [addDespensaModal, setAddDespensaModal] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<ICategoriaDTO[]>([]);
  const [nomeDespensa, setNomeDespensa] = useState<string>('');
  const [categoriasDespensa, setCategoriasDespensa] = useState<number>(0);
  const [addItemModal, setAddItemModal] = useState<boolean>(false);
  
  const [dataVencimento, setDataVencimento] = useState<string>();
  const [dataCompra, setDataCompra] = useState<string>();
  const [preco, setPreco] = useState<number>();
  const [consumido, setConsumido] = useState<boolean>(false);
  const [produto, setProduto] = useState<number | null>(null);
  const [mercado, setMercado] = useState<number | null>(null);
  
  const router = useRouter();

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

  async function fetchMercados(): Promise<IMercadoDTO[]> {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(`${BACKEND_URL}/api/list-mercados`);

    const data: IMercadoDTO[] = await response.clone().json();

    return data;
  }

  async function fetchProdutos(): Promise<IProdutoDTO[]> {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(`${BACKEND_URL}/api/list-produtos`);

    const data: IProdutoDTO[] = await response.clone().json();

    return data;
  }

  async function fetchCategorias(): Promise<ICategoriaDTO[]> {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(`${BACKEND_URL}/api/list-categorias`);

    const data: ICategoriaDTO[] = await response.clone().json();

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

  function handleModal(dados: { despensa: IDespensaDTO, item: item }) {
    setDadosModalItem(dados);
    fetchMercados().then((data) => {
      setMercados(data);
    });
    fetchProdutos().then((data) => setProdutos(data));
    setOpenModalItem(true);
  }

  function handleModalAddDespensa() {
    fetchCategorias().then((data) => setCategorias(data));
    setAddDespensaModal(true);
  }

  async function handleEditItem(): Promise<void> {
    if (!dadosModalItem.item.id) return;

    try {
      if (!process.env.NEXT_PUBLIC_BACKEND_URL || !process.env.NEXT_PUBLIC_TOKEN_PATH) {
        throw new Error('Erro ao editar item');
      }

      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const token = localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_PATH);

      console.log(dadosModalItem.item.mercado.id);

      const response = await fetch(`${BACKEND_URL}/api/item/${dadosModalItem.item.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          produto_id: dadosModalItem.item.produto.id,
          mercado_id: dadosModalItem.item.mercado.id,
          data_vencimento: dadosModalItem.item.data_vencimento,
          data_compra: dadosModalItem.item.data_compra,
          preco: dadosModalItem.item.preco,
          consumido: dadosModalItem.item.consumido,
          despensa: dadosModalItem.item.despensa,
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao editar item.');
      }

      const data = await response.json();

      if (!dadosModal) return;

      const index = dadosModal.itens.item_set.findIndex((item) => item.id === data.id);

      dadosModal.itens.item_set[index] = data;

      setDadosModal({
        ...dadosModal,
        itens: dadosModal.itens
      });

      setOpenModalItem(false);
    } catch (e: any) {
      console.log(e.message);
    }
  }

  async function handleAddDespensa(): Promise<void> {
    console.log(categoriasDespensa);

    if (!nomeDespensa || !categoriasDespensa || !process.env.NEXT_PUBLIC_BACKEND_URL || !process.env.NEXT_PUBLIC_TOKEN_PATH) {
      return;
    }

    const token = localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_PATH);

    console.log({
      "categorias_ids": categoriasDespensa,
      "quantidadepadrao_set_ids": [
        1
      ],
      "descricao": nomeDespensa,
      "gerente": 1
    });

    try {
      const response = await fetch(`${BACKEND_URL}/api/list-despensas`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "categorias_ids": [categoriasDespensa],
          "quantidadepadrao_set_ids": [
            1
          ],
          "descricao": nomeDespensa,
          "gerente": 1
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao cadastrar despensa.');
      }

      const data = await response.json();

      despensas.push({ id: data.id, descricao: data.descricao, categorias: data.categorias });

      setDespensas(despensas);
      setAddDespensaModal(false);
      setNomeDespensa('');
      setCategoriasDespensa(0);
    } catch (e: any) {
      console.log(e.message);
    }
  }

  async function handleAddItem(): Promise<void> {
    if (!dataVencimento || !dataCompra || !preco || !produto || !mercado || !process.env.NEXT_PUBLIC_BACKEND_URL || !process.env.NEXT_PUBLIC_TOKEN_PATH) {
      return;
    }

    const token = localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_PATH);

    console.log({
      data_vencimento: dataVencimento,
      data_compra: dataCompra,
      preco: preco,
      consumido: consumido,
      produto_id: produto,
      mercado_id: mercado,
      despensa: dadosModal?.despensa.id
    });

    try {
      const response = await fetch(`${BACKEND_URL}/api/list-itens`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data_vencimento: dataVencimento,
          data_compra: dataCompra,
          preco: preco,
          consumido: consumido,
          produto_id: produto,
          mercado_id: mercado,
          comprador: 1,
          despensa: dadosModal?.despensa.id
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao cadastrar item.');
      }

      const data = await response.json();

      if (!dadosModal) return;

      dadosModal.itens.item_set.push(data);

      setDadosModal({
        ...dadosModal,
        itens: dadosModal.itens
      });

      setAddItemModal(false);
    } catch (e: any) {
      console.log(e.message);
    }
  }

  function handleModalAddItem() {
    fetchProdutos().then((data) => setProdutos(data));
    fetchMercados().then((data) => setMercados(data));
    setAddItemModal(true);
  }

  function handleDataVencimento(e: React.ChangeEvent<HTMLInputElement>) {
    const valorData = e.target.value;

    if (!valorData) return;

    const [ano, mes, dia] = valorData.split('-').map(Number);

    setDataVencimento(new Date(ano, mes, dia).toISOString());
  }

  function handleDataCompra(e: React.ChangeEvent<HTMLInputElement>) {
    const valorData = e.target.value;

    if (!valorData) return;

    const [ano, mes, dia] = valorData.split('-').map(Number);

    setDataCompra(new Date(ano, mes, dia).toISOString());
  }

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_TOKEN_PATH) {
      router.push('/');
      return;
    }

    const token = localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_PATH);

    if (!token) {
      router.push('/');
    }

    if (despensas.length === 0) {
      fetchDespensas().then((data) => {
        setDespensas(data);
      });
    }
  }, [despensas, router]);

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
                  <Card className="max-w-sm" key={despensa.id}>
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
                        alt=""
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
              <ButtonAdder content='Adicionar despensa' onClick={() => handleModalAddDespensa()}/>
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
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item.id}>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {item.produto.nome}
                      </Table.Cell>
                      <Table.Cell>{item.produto.categoria.nome}</Table.Cell>
                      <Table.Cell>{item.data_vencimento}</Table.Cell>
                      <Table.Cell>R$ {item.preco}</Table.Cell>
                      <Table.Cell>
                        <a onClick={() => handleModal({ despensa: dadosModal!.despensa, item: item })} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
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
            <Button onClick={() => handleModalAddItem()}>Adicionar item</Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={openModalItem}
          position={modalPlacement}
          onClose={() => setOpenModalItem(false)}
        >
          <Modal.Header>Editando item</Modal.Header>
          <Modal.Body>
            <div className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="preco" value="Preço"/>
                </div>
                <TextInput id="preco" type="number" step="0.01" required value={dadosModalItem.item.preco} onChange={(e) => {
                  setDadosModalItem({
                    ...dadosModalItem,
                    item: {
                      ...dadosModalItem.item,
                      preco: parseFloat(e.target.value)
                    }
                  })
                }}/>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="consumido" checked={dadosModalItem.item.consumido} onChange={(e) => {
                  setDadosModalItem({
                    ...dadosModalItem,
                    item: {
                      ...dadosModalItem.item,
                      consumido: e.target.checked
                    }
                  })
                }}/>
                <Label htmlFor="consumido">Consumido?</Label>
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="produtos" value="Produto"/>
                </div>
                <Select id="produtos" required value={dadosModalItem.item.produto.nome} onChange={(e) => {
                  setDadosModalItem({
                    ...dadosModalItem,
                    item: {
                      ...dadosModalItem.item,
                      produto: {
                        ...dadosModalItem.item.produto,
                        nome: e.target.value
                      }
                    }
                  })
                }}>
                  {
                    produtos.map((produto) => {
                      return (
                        <option key={produto.id} value={produto.nome}>{produto.nome}</option>
                      )
                    })
                  }
                </Select>
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="mercados" value="Mercado"/>
                </div>
                <Select id="mercados" required value={dadosModalItem.item.mercado.nome} onChange={(e) => {
                  setDadosModalItem({
                    ...dadosModalItem,
                    item: {
                      ...dadosModalItem.item,
                      mercado: {
                        id: dadosModalItem.item.mercado.id,
                        nome: e.target.value
                      }
                    }
                  })
                }}>
                  {
                    mercados.map((mercado) => {
                      return (
                        <option key={mercado.id} value={mercado.nome}>{mercado.nome}</option>
                      )
                    })
                  }
                </Select>
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="compradores" value="Comprador"/>
                </div>
                <Select id="compradores" required value={dadosModalItem.item.comprador} onChange={(e) => {
                  setDadosModalItem({
                    ...dadosModalItem,
                    item: {
                      ...dadosModalItem.item,
                      comprador: e.target.value
                    }
                  })
                }}>
                  <option>{dadosModalItem.item.comprador}</option>
                </Select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => handleEditItem()}>Salvar</Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={addDespensaModal}
          position={modalPlacement}
          onClose={() => setAddDespensaModal(false)}
        >
          <Modal.Header>Criando despensa</Modal.Header>
          <Modal.Body>
            <div className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="descricao" value="Nome"/>
                </div>
                <TextInput id="descricao" type="text" required onChange={(e) => setNomeDespensa(e.target.value)}/>
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="categorias" value="Categoria"/>
                </div>
                <Select id="categorias" value={categoriasDespensa} required onChange={(e) => { setCategoriasDespensa(parseInt(e.target.value))}}>
                  <option value=""></option>
                  {
                    categorias.map((categoria) => {
                      return (
                        <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                      )
                    })
                  }
                </Select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => handleAddDespensa()}>Salvar</Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={addItemModal}
          position={modalPlacement}
          onClose={() => setAddItemModal(false)}
        >
          <Modal.Header>Adicionando item</Modal.Header>
          <Modal.Body>
          <div className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                    <Label htmlFor="dataVencimento" value="Data de vencimento"/>
                </div>
                <TextInput id="dataVencimento" type="date" required onChange={(e) => handleDataVencimento(e)}/>
              </div>
              <div>
                <div className="mb-2 block">
                    <Label htmlFor="dataCompra" value="Data de compra"/>
                </div>
                <TextInput id="dataCompra" type="date" required onChange={(e) => handleDataCompra(e)}/>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="preco" value="Preço"/>
                </div>
                <TextInput id="preco" type="number" step="0.01" required onChange={(e) => setPreco(parseFloat(e.target.value))}/>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="consumido" onChange={(e) => setConsumido(e.target.checked)}/>
                <Label htmlFor="consumido">Consumido?</Label>
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="produtos" value="Produto"/>
                </div>
                <Select id="produtos" required onChange={(e) => setProduto(parseInt(e.target.value))}>
                  <option value=""></option>
                  {
                    produtos.map((produto) => {
                      return (
                        <option key={produto.id} value={produto.id}>{produto.nome}</option>
                      )
                    })
                  }
                </Select>
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="mercados" value="Mercado"/>
                </div>
                <Select id="mercados" required onChange={(e) => setMercado(parseInt(e.target.value))}>
                  <option value=""></option>
                  {
                    mercados.map((mercado) => {
                      return (
                        <option key={mercado.id} value={mercado.id}>{mercado.nome}</option>
                      )
                    })
                  }
                </Select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleAddItem}>Salvar</Button>
          </Modal.Footer>
        </Modal>
      </div>
      <FooterApp className={styles.footer}/>
    </Grid>
  )
}