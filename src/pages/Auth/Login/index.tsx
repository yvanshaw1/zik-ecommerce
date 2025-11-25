import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./styles";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [identifier, setIdentifier] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  type AuthLocationState = {
    from?: string;
    reason?: string;
  } | null;

  const locationState = (location.state as AuthLocationState) || null;

  const isStrongPassword = (pwd: string) => {
    // mínimo 8, 1 maiúscula, 1 caractere especial
    const hasMinLength = pwd.length >= 8;
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(pwd);

    return hasMinLength && hasUppercase && hasSpecialChar;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedIdentifier = identifier.trim();
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    // LOGIN
    if (isLogin) {
      if (!trimmedIdentifier || !trimmedPassword) {
        toast.error("Please enter your username/email and password");
        return;
      }

      try {
        login(trimmedIdentifier, trimmedPassword);
        toast.success("Logged in successfully!");

        // If user came from cart checkout flow, send back to cart
        if (
          locationState?.from === "/cart" &&
          locationState?.reason === "checkout"
        ) {
          navigate("/cart", { replace: true });
          return;
        }

        // Default redirect
        navigate("/", { replace: true });
      } catch (error) {
        const err = error as Error;

        if (err.message === "USER_NOT_FOUND") {
          toast.error("Account not found. Please sign up first.");
          return;
        }

        if (err.message === "INVALID_PASSWORD") {
          toast.error("Incorrect password.");
          return;
        }

        toast.error("An error occurred. Please try again.");
      }

      return;
    }

    // SIGN UP
    if (!trimmedUsername || !trimmedEmail || !trimmedPassword) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!isStrongPassword(trimmedPassword)) {
      toast.custom(
        () => (
          <div
            style={{
              backgroundColor: "#facc15",
              color: "#1f2933",
              padding: "12px 16px",
              borderRadius: "8px",
              maxWidth: "320px",
              boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
              fontSize: "14px",
            }}
          >
            <strong>Password requirements:</strong>
            <ul style={{ margin: "8px 0 0 16px", padding: 0 }}>
              <li>At least 8 characters</li>
              <li>At least 1 uppercase letter</li>
              <li>At least 1 special character</li>
            </ul>
          </div>
        ),
        { duration: 5000 }
      );
      return;
    }

    try {
      register(trimmedUsername, trimmedEmail, trimmedPassword);
      toast.success("Account created and logged in successfully!");

      if (
        locationState?.from === "/cart" &&
        locationState?.reason === "checkout"
      ) {
        navigate("/cart", { replace: true });
        return;
      }

      navigate("/", { replace: true });
    } catch (error) {
      const err = error as Error;

      if (err.message === "USER_ALREADY_EXISTS") {
        toast.error("This username is already taken.");
        return;
      }

      if (err.message === "EMAIL_ALREADY_EXISTS") {
        toast.error("This email is already in use.");
        return;
      }

      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <S.Container>
      <S.FormCard>
        <S.Logo>ZiK!</S.Logo>
        <S.Title>{isLogin ? "Login" : "Sign Up"}</S.Title>

        <S.Form>
          {/* LOGIN: username or email | SIGN UP: username */}
          <S.InputGroup>
            <S.Label>{isLogin ? "Username or Email" : "Username"}</S.Label>
            <S.Input
              type="text"
              placeholder={
                isLogin ? "Enter your username or email" : "Enter your username"
              }
              value={isLogin ? identifier : username}
              onChange={(e) =>
                isLogin
                  ? setIdentifier(e.target.value)
                  : setUsername(e.target.value)
              }
            />
          </S.InputGroup>

          {/* Email apenas no Sign Up */}
          {!isLogin && (
            <S.InputGroup>
              <S.Label>Email</S.Label>
              <S.Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </S.InputGroup>
          )}

          {/* Password com ícone de olho */}
          <S.InputGroup>
            <S.Label>Password</S.Label>
            <S.PasswordWrapper>
              <S.Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <S.PasswordIconButton
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={18} color="#6b7280" />
                ) : (
                  <Eye size={18} color="#6b7280" />
                )}
              </S.PasswordIconButton>
            </S.PasswordWrapper>
          </S.InputGroup>

          {/* Confirm Password apenas no Sign Up, também com olho */}
          {!isLogin && (
            <S.InputGroup>
              <S.Label>Confirm Password</S.Label>
              <S.PasswordWrapper>
                <S.Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <S.PasswordIconButton
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} color="#6b7280" />
                  ) : (
                    <Eye size={18} color="#6b7280" />
                  )}
                </S.PasswordIconButton>
              </S.PasswordWrapper>
            </S.InputGroup>
          )}

          <S.SubmitButton type="submit" onClick={handleSubmit}>
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
