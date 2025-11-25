import styled from "styled-components";

export const Container = styled.main`
  max-width: 960px;
  margin: 0 auto;
  padding: 96px 16px 32px; /*96px: espaço pro header fixo + respiro */
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
`;

export const Description = styled.p`
  font-size: 16px;
  color: #4b5563;
`;
