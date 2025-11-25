import styled from "styled-components";
import { devices } from "../../styles/breakpoints";

export const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 96px 16px 24px;

  @media ${devices.tablet} {
    padding: 112px 24px 48px;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #636e72;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 24px;
  padding: 8px 0;

  &:hover {
    color: #ff6b6b;
  }

  @media ${devices.tablet} {
    font-size: 16px;
  }
`;

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media ${devices.tablet} {
    flex-direction: row;
    gap: 48px;
  }
`;

export const ImageSection = styled.div`
  flex: 1;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
  background: white;
  border: 2px solid #dfe6e9;
  border-radius: 12px;
  padding: 24px;

  @media ${devices.tablet} {
    max-height: 500px;
  }
`;
export const InfoSection = styled.div`
  flex: 1;
`;

export const ProductName = styled.h1`
  font-size: 24px;
  color: #2d3436;
  margin-bottom: 16px;

  @media ${devices.tablet} {
    font-size: 32px;
  }
`;

export const ProductPrice = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #ff6b6b;
  margin-bottom: 16px;

  @media ${devices.tablet} {
    font-size: 36px;
  }
`;

export const StockInfo = styled.div`
  font-size: 14px;
  color: #636e72;
  margin-bottom: 32px;

  @media ${devices.tablet} {
    font-size: 16px;
  }
`;

export const Description = styled.div`
  margin-bottom: 32px;
`;

export const DescriptionTitle = styled.h2`
  font-size: 18px;
  color: #2d3436;
  margin-bottom: 12px;

  @media ${devices.tablet} {
    font-size: 20px;
  }
`;

export const DescriptionText = styled.p`
  font-size: 14px;
  color: #636e72;
  line-height: 1.6;

  @media ${devices.tablet} {
    font-size: 16px;
  }
`;
export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${devices.tablet} {
    flex-direction: row;
    align-items: center;
  }
`;

export const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  border: 2px solid #dfe6e9;
  border-radius: 8px;
  padding: 8px 16px;
  width: fit-content;
`;

export const QuantityButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #2d3436;
  cursor: pointer;
  padding: 4px 8px;

  &:hover {
    color: #ff6b6b;
  }
`;

export const QuantityValue = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #2d3436;
  min-width: 30px;
  text-align: center;
`;

export const AddToCartButton = styled.button`
  flex: 1;
  padding: 14px 32px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: #e85a5a;
  }

  &:disabled {
    background: #dfe6e9;
    color: #636e72;
    cursor: not-allowed;
  }

  @media ${devices.tablet} {
    flex: initial;
  }
`;

export const ErrorMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #636e72;
  margin: 48px 0;
`;
