export interface ICategoriaDTO {
    id: number;
    nome: string;
}

export interface IDespensaDTO {
    id: number;
    descricao: string;
    categorias: ICategoriaDTO[];
}

export interface IProdutoDTO {
    id: number;
    nome: string;
    categoria: ICategoriaDTO;
    prior: string;
}

export interface IMercadoDTO {
    id: number;
    nome: string;
}

export interface IDespensaItensDTO {
    id: number;
    item_set: {
        id: number;
        produto: IProdutoDTO;
        data_vencimento: string;
        data_compra: string;
        preco: number;
        consumido: boolean;
        mercado: IMercadoDTO;
        comprador: string;
        despensa: number;
    }[]
}