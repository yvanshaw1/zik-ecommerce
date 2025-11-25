import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.FormCard>
        <S.Logo>ZiK!</S.Logo>
        <S.Title>{isLogin ? "Login" : "Sign Up"}</S.Title>

        <S.Form>
          <S.InputGroup>
            <S.Label>Username</S.Label>
            <S.Input type="text" placeholder="Enter your username" />
          </S.InputGroup>

          {!isLogin && (
            <S.InputGroup>
              <S.Label>Email</S.Label>
              <S.Input type="email" placeholder="Enter your email" />
            </S.InputGroup>
          )}

          <S.InputGroup>
            <S.Label>Password</S.Label>
            <S.Input type="password" placeholder="Enter your password" />
          </S.InputGroup>

          {!isLogin && (
            <S.InputGroup>
              <S.Label>Confirm Password</S.Label>
              <S.Input type="password" placeholder="Confirm your password" />
            </S.InputGroup>
          )}

          <S.SubmitButton type="button">
            {isLogin ? "Login" : "Sign Up"}
          </S.SubmitButton>
        </S.Form>

        <S.ToggleText>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <S.ToggleButton onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </S.ToggleButton>
        </S.ToggleText>

        <S.HomeButton onClick={() => navigate("/")}>Back to Home</S.HomeButton>
      </S.FormCard>
    </S.Container>
  );
}
