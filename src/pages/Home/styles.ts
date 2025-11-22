import styled from "styled-components";
import { devices } from "../../styles/breakpoints";

export const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;

  @media ${devices.tablet} {
    padding: 48px 24px;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #2d3436;
  text-align: center;
  margin-bottom: 24px;

  @media ${devices.tablet} {
    font-size: 32px;
    margin-bottom: 48px;
  }
`;

export const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media ${devices.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media ${devices.desktop} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const CategoryCard = styled.button`
  background: white;
  border: 2px solid #dfe6e9;
  border-radius: 12px;
  padding: 32px 24px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #ff6b6b;
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  @media ${devices.tablet} {
    padding: 40px;
  }
`;

export const Emoji = styled.div`
  font-size: 48px;
  margin-bottom: 12px;

  @media ${devices.tablet} {
    font-size: 64px;
    margin-bottom: 16px;
  }
`;

export const CategoryName = styled.h3`
  font-size: 18px;
  color: #2d3436;
  font-weight: 600;

  @media ${devices.tablet} {
    font-size: 20px;
  }
`;
