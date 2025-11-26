import styled from "styled-components";
import { devices } from "../../styles/breakpoints";

export const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 96px 16px 24px; /* 96px no topo para o header fixo */

  @media ${devices.tablet} {
    padding: 112px 24px 48px;
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

export const CarouselWrapper = styled.section`
  margin-bottom: 24px;
`;

export const CarouselTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #2d3436;
  margin-bottom: 12px;
  text-align: center;

  @media ${devices.tablet} {
    font-size: 24px;
  }
`;

export const Carousel = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #e5e7eb;
    border-radius: 999px;
  }
`;

export const CarouselItem = styled.article<{ $isActive: boolean }>`
  min-width: 260px;
  max-width: 260px;
  background: #ffffff;
  border-radius: 12px;
  padding: 12px;
  scroll-snap-align: center;
  cursor: pointer;
  border: 2px solid ${({ $isActive }) => ($isActive ? "#ff6b6b" : "#dfe6e9")};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
    border-color: #ff6b6b;
  }
`;

export const HighlightImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background: #f9fafb;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 8px;
`;

export const HighlightImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
`;

export const HighlightDiscountBadge = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  background: #10b981;
  color: #ffffff;
  border-radius: 999px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 700;
  z-index: 1;
`;

export const HighlightAlertBadge = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: #ffa500;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const HighlightAlertIcon = styled.span`
  font-size: 16px;
  color: white;
`;

export const HighlightInfo = styled.div`
  margin-top: 4px;
`;

export const HighlightName = styled.h3`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #2d3436;
`;

export const HighlightCategory = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 6px;
`;

export const HighlightPriceRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 4px;
`;

export const HighlightOriginalPrice = styled.span`
  font-size: 12px;
  color: #9ca3af;
  text-decoration: line-through;
`;

export const HighlightDiscountedPrice = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #ff3838;
`;

export const HighlightPrice = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #ff3838;
  display: block;
  margin-bottom: 4px;
`;

export const HighlightLowStockText = styled.p`
  font-size: 11px;
  color: #ffa500;
  font-weight: 600;
`;

export const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 8px;
`;

export const Dot = styled.button<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  border: none;
  padding: 0;
  background: ${({ $active }) => ($active ? "#ff6b6b" : "#e5e7eb")};
  cursor: pointer;
`;
