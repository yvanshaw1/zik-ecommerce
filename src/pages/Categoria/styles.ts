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
  margin-bottom: 24px;

  @media ${devices.tablet} {
    font-size: 32px;
    margin-bottom: 48px;
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media ${devices.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media ${devices.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ProductCard = styled.div`
  background: white;
  border: 2px solid #dfe6e9;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    border-color: #ff6b6b;
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: #f7f7f7;

  @media ${devices.tablet} {
    height: 250px;
  }
`;

export const ProductInfo = styled.div`
  padding: 16px;

  @media ${devices.tablet} {
    padding: 20px;
  }
`;

export const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #2d3436;
  margin-bottom: 8px;

  @media ${devices.tablet} {
    font-size: 18px;
  }
`;

export const ProductDescription = styled.p`
  font-size: 14px;
  color: #636e72;
  margin-bottom: 16px;
  line-height: 1.5;
`;

export const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProductPrice = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #ff6b6b;

  @media ${devices.tablet} {
    font-size: 20px;
  }
`;

export const BuyButton = styled.button`
  padding: 8px 16px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #e85a5a;
  }

  @media ${devices.tablet} {
    padding: 10px 20px;
  }
`;
