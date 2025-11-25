import styled from "styled-components";

export const Card = styled.article<{ $isLowStock: boolean }>`
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  border: ${(props) => (props.$isLowStock ? "2px solid #FFA500" : "none")};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const AlertBadge = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: #ffa500;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const AlertIcon = styled.span`
  font-size: 18px;
  color: white;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 4px;
  background: white;
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
  min-height: 40px;
`;

export const ProductDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
  flex-grow: 1;
`;

export const Price = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #ff3838;
  display: block;
  margin-bottom: 4px;
`;

export const LowStockWarning = styled.p`
  font-size: 12px;
  color: #ffa500;
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 8px;
  text-align: center;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #ff3838;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: auto;
  cursor: pointer;

  &:disabled {
    background: #999;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
