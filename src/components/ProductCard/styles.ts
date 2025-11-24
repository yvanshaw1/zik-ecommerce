import styled from "styled-components";

export const Card = styled.article`
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 4px;
  background: #f5f5f5;
  margin-bottom: 12px;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
`;

export const ProductName = styled.h3`
  font-size: 16px;
  margin-bottom: 8px;
`;

export const ProductDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
`;

export const Price = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #ff3838;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #ff3838;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 12px;
  cursor: pointer;
`;
