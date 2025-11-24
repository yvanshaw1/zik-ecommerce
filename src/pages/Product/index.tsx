import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { PRODUTOS } from "../../constants/products";
import { useCarrinho } from "../../contexts";
import * as S from "./styles";

export function Produto() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { adicionarItem } = useCarrinho();
  const [quantidade, setQuantidade] = useState(1);

  const produto = PRODUTOS.find((p) => p.id === id);

  if (!produto) {
    return (
      <>
        <Header />
        <S.Container>
          <S.ErrorMessage>Produto não encontrado</S.ErrorMessage>
          <S.BackButton onClick={() => navigate(-1)}>Voltar</S.BackButton>
        </S.Container>
      </>
    );
  }

  const formatarPreco = (preco: number) => {
    return preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const diminuirQuantidade = () => {
    if (quantidade > 1) setQuantidade(quantidade - 1);
  };

  const aumentarQuantidade = () => {
    if (quantidade < produto.estoque) setQuantidade(quantidade + 1);
  };

  const handleAdicionarCarrinho = () => {
    adicionarItem(produto, quantidade);
    alert(`${quantidade}x ${produto.nome} adicionado ao carrinho!`);
  };

  return (
    <>
      <Header />
      <S.Container>
        <S.BackButton onClick={() => navigate(-1)}>← Voltar</S.BackButton>

        <S.ProductContainer>
          <S.ImageSection>
            <S.ProductImage src={produto.imagem} alt={produto.nome} />
          </S.ImageSection>

          <S.InfoSection>
            <S.ProductName>{produto.nome}</S.ProductName>
            <S.ProductPrice>{formatarPreco(produto.preco)}</S.ProductPrice>

            <S.StockInfo>
              {produto.estoque > 0
                ? `${produto.estoque} unidades disponíveis`
                : "Produto esgotado"}
            </S.StockInfo>

            <S.Description>
              <S.DescriptionTitle>Descrição</S.DescriptionTitle>
              <S.DescriptionText>{produto.descricao}</S.DescriptionText>
            </S.Description>

            <S.Actions>
              <S.QuantitySelector>
                <S.QuantityButton onClick={diminuirQuantidade}>
                  -
                </S.QuantityButton>
                <S.QuantityValue>{quantidade}</S.QuantityValue>
                <S.QuantityButton onClick={aumentarQuantidade}>
                  +
                </S.QuantityButton>
              </S.QuantitySelector>

              <S.AddToCartButton
                onClick={handleAdicionarCarrinho}
                disabled={produto.estoque === 0}
              >
                {produto.estoque > 0 ? "Adicionar ao Carrinho" : "Esgotado"}
              </S.AddToCartButton>
            </S.Actions>
          </S.InfoSection>
        </S.ProductContainer>
      </S.Container>
    </>
  );
}
