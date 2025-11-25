import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 96px 20px 20px; /* 96px no topo por causa do header fixo */
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  h1 {
    font-size: 28px;
    color: #333;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const HomeButton = styled.button`
  padding: 10px 20px;
  background: #ff0000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #cc0000;
  }
`;

export const ClearButton = styled.button`
  padding: 10px 20px;
  background: transparent;
  color: #ff0000;
  border: 1px solid #ff0000;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #ff0000;
    color: white;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CartItem = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr auto auto auto;
  gap: 20px;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    grid-template-columns: 80px 1fr;
    gap: 10px;
    position: relative;
  }
`;

export const ItemImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: contain;
  border-radius: 4px;
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ItemName = styled.h3`
  font-size: 16px;
  color: #333;
  margin: 0;
`;

export const ItemPrice = styled.span`
  font-size: 14px;
  color: #666;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    grid-column: 1 / -1;
    justify-content: center;
  }
`;

export const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f5f5f5;
  }
`;

export const Quantity = styled.span`
  font-size: 16px;
  font-weight: bold;
  min-width: 30px;
  text-align: center;
`;

export const ItemTotal = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #ff0000;

  @media (max-width: 768px) {
    grid-column: 1 / -1;
    text-align: center;
  }
`;

export const RemoveButton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background: transparent;
  color: #999;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    color: #ff0000;
  }

  @media (max-width: 768px) {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

export const Summary = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 20px;
`;

export const SummaryTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
  color: #333;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 16px;
  color: #666;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 20px 0;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

export const CheckoutButton = styled.button`
  width: 100%;
  padding: 15px;
  background: #ff0000;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #cc0000;
  }
`;

export const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;

  h2 {
    font-size: 24px;
    color: #666;
  }
`;

export const BackButton = styled.button`
  padding: 12px 30px;
  background: #ff0000;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: #cc0000;
  }
`;
