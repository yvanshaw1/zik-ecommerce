import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Logo = styled.button`
  font-size: 24px;
  font-weight: bold;
  color: #ff2200ff;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #ff1100ff;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 16px;
`;

export const NavButton = styled.button`
  padding: 10px 16px;
  background: #ff0000ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-weight: bold;
  }

  &:hover {
    background: #b30000ff;
  }
`;
