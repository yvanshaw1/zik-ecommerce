import styled from "styled-components";
import { devices } from "../../styles/breakpoints";

export const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 96px 16px 24px; /* topo maior por causa do header */

  @media ${devices.tablet} {
    padding: 112px 24px 48px; /* um pouco mais de respiro no topo em telas maiores */
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
