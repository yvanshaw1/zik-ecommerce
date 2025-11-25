import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(15, 23, 42, 0.6); /* fundo escurecido */
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
`;

export const Modal = styled.div`
  width: 100%;
  max-width: 380px;
  background: #ffffff;
  border-radius: 16px;
  padding: 24px 20px 20px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.35);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  color: #6b7280;

  &:hover {
    color: #111827;
  }
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
  text-align: center;
`;

export const Message = styled.p`
  font-size: 14px;
  color: #4b5563;
  text-align: center;
  line-height: 1.5;
`;

export const Actions = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LoginButton = styled.button`
  padding: 10px 16px;
  width: 100%;
  background: #ff0000;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #cc0000;
  }
`;

export const CancelButton = styled.button`
  padding: 10px 16px;
  width: 100%;
  background: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #e5e7eb;
  }
`;
