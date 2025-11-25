import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { CATEGORIES } from "../../constants/categories";
import * as S from "./styles";

export function Home() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <>
      <Header />
      <S.Container>
        <S.Title>Choose a category</S.Title>
        <S.CategoriesGrid>
          {CATEGORIES.map((cat) => (
            <S.CategoryCard
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
            >
              <S.Emoji>{cat.emoji}</S.Emoji>
              <S.CategoryName>{cat.name}</S.CategoryName>
            </S.CategoryCard>
          ))}
        </S.CategoriesGrid>
      </S.Container>
    </>
  );
}
