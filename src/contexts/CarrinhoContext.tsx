import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Produto, ItemCarrinho } from "../types";

interface CarrinhoContextData {
  itens: ItemCarrinho[];
  adicionarItem: (produto: Produto, quantidade: number) => void;
  removerItem: (produtoId: string) => void;
  limparCarrinho: () => void;
  total: number;
  quantidadeTotal: number;
}

const CarrinhoContext = createContext<CarrinhoContextData>(
  {} as CarrinhoContextData
);

function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  const adicionarItem = (produto: Produto, quantidade: number) => {
    setItens((prev) => {
      const existe = prev.find((item) => item.produto.id === produto.id);
      if (existe) {
        return prev.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      }
      return [...prev, { produto, quantidade }];
    });
  };

  const removerItem = (produtoId: string) => {
    setItens((prev) => prev.filter((item) => item.produto.id !== produtoId));
  };

  const limparCarrinho = () => setItens([]);

  const total = itens.reduce(
    (acc, item) => acc + item.produto.preco * item.quantidade,
    0
  );
  const quantidadeTotal = itens.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarItem,
        removerItem,
        limparCarrinho,
        total,
        quantidadeTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

const useCarrinho = () => useContext(CarrinhoContext);

export { CarrinhoProvider, useCarrinho };
