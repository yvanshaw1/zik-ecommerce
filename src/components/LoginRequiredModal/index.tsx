import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import * as S from "./styles";

type LoginRequiredModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LoginRequiredModal({
  isOpen,
  onClose,
}: LoginRequiredModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleGoToLogin = () => {
    onClose();
    navigate("/auth", {
      state: {
        from: "/cart",
        reason: "checkout",
      },
    });
  };

  return (
    <S.Overlay>
      <S.Modal>
        <S.CloseButton
          type="button"
          onClick={onClose}
          aria-label="Close login required modal"
        >
          <X size={18} color="#6b7280" />
        </S.CloseButton>

        <S.Title>Login required</S.Title>
        <S.Message>
          To complete your purchase, you need to be logged in.
          <br />
          Please log in or create an account to continue.
        </S.Message>

        <S.Actions>
          <S.LoginButton type="button" onClick={handleGoToLogin}>
            Go to login
          </S.LoginButton>

          <S.CancelButton type="button" onClick={onClose}>
            Close
          </S.CancelButton>
        </S.Actions>
      </S.Modal>
    </S.Overlay>
  );
}
