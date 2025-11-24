import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { CATEGORIAS } from "../../constants/categories";
import * as S from "./styles";

export function Home() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoriaId: string) => {
    navigate(`/categoria/${categoriaId}`);
  };

  return (
    <>
      <Header />
      <S.Container>
        <S.Title>Escolha sua categoria</S.Title>
        <S.CategoriesGrid>
          {CATEGORIAS.map((cat) => (
            <S.CategoryCard
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
            >
              <S.Emoji>{cat.emoji}</S.Emoji>
              <S.CategoryName>{cat.nome}</S.CategoryName>
            </S.CategoryCard>
          ))}
        </S.CategoriesGrid>
      </S.Container>
    </>
  );
}
