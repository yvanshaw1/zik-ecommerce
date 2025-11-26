import styled from "styled-components";

export const Container = styled.main`
  max-width: 960px;
  margin: 0 auto;
  padding: 96px 16px 32px; /* espaço pro header fixo */
`;

export const Card = styled.section`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px 20px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 768px) {
    padding: 32px 28px;
  }
`;

export const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
`;

export const UserInfoRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const UserInfoLabel = styled.p`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #9ca3af;
  margin-bottom: 4px;
`;

export const UserInfoValue = styled.p`
  font-size: 15px;
  color: #111827;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 4px 0;
`;

export const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 12px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: #374151;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #ef4444;
    box-shadow: 0 0 0 1px rgba(239, 68, 68, 0.4);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const SaveButton = styled.button`
  align-self: flex-start;
  padding: 10px 18px;
  border-radius: 999px;
  border: none;
  background: #ef4444;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;

  &:hover:not(:disabled) {
    background: #dc2626;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }
`;

export const PasswordHint = styled.p`
  font-size: 12px;
  color: #6b7280;
  line-height: 1.4;
`;

export const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const PasswordIconButton = styled.button`
  position: absolute;
  right: 12px;
  background: transparent;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    display: block;
  }
`;
