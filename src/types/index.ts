export interface Categoria {
  id: string;
  nome: string;
  emoji: string;
}

export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoriaId: string;
  estoque: number;
}

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}
