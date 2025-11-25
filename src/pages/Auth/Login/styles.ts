import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
  padding: 20px;
`;

export const FormCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`;

export const Logo = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #ff0000;
  text-align: center;
  margin-bottom: 10px;
`;

export const Title = styled.h2`
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #ff0000;
  }

  &::placeholder {
    color: #999;
  }
`;

export const SubmitButton = styled.button`
  padding: 14px;
  background: #ff0000;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s;

  &:hover {
    background: #cc0000;
  }
`;

export const ToggleText = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #ff0000;
  font-weight: bold;
  cursor: pointer;
  margin-left: 5px;
  text-decoration: underline;

  &:hover {
    color: #cc0000;
  }
`;

export const HomeButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background: transparent;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #f5f5f5;
    border-color: #999;
    color: #333;
  }
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
