'use client';

import { Checkbox, Table, Tooltip } from 'flowbite-react';
import FooterApp from '../components/footer';
import Grid from '../components/grid';
import Header from '../components/header';
import { Navbar } from '../components/nav-bar';
import styles from '../components/styles/Grid.module.css';
import { BACKEND_URL } from '../constants';
import { useEffect, useState } from 'react';
import { IMercadoDTO } from '../despensas/interfaces/IDespensaDTO';
import ButtonAdder from '../components/button-adder';

export default function Mercados() {
  const [mercados, setMercados] = useState<IMercadoDTO[]>([]);

  async function fetchMercados(): Promise<IMercadoDTO[]> {
    const response = await fetch(`${BACKEND_URL}/api/list-mercados`);

    const data: IMercadoDTO[] = await response.clone().json();

    return data;
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
                </Table.Head>
                <Table.Body className="divide-y">
                  {mercados.map((mercado) => {
                    return (
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="p-4">
                          <Checkbox />
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {mercado.nome}
                        </Table.Cell>
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
            </div>
          )
        }
        <ButtonAdder content="Adicionar mercado"/>
      </div>
      <FooterApp className={styles.footer}/>
    </Grid>
  )
}