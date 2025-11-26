import { useState } from "react";
import * as S from "./styles";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export function Account() {
  const { user, updateUsername, updatePassword } = useAuth();

  const [newUsername, setNewUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [isSavingUsername, setIsSavingUsername] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // Se não estiver logado, apenas exibe mensagem informativa.
  if (!user) {
    return (
      <S.Container>
        <S.Card>
          <S.Title>Account</S.Title>
          <S.Subtitle>
            You need to be logged in to manage your account.
          </S.Subtitle>
        </S.Card>
      </S.Container>
    );
  }

  const isStrongPassword = (pwd: string) => {
    const hasMinLength = pwd.length >= 8;
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(pwd);
    return hasMinLength && hasUppercase && hasSpecialChar;
  };

  const handleUsernameSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = newUsername.trim();

    if (!trimmed) {
      toast.error("Username cannot be empty");
      return;
    }

    if (trimmed === user.username) {
      toast.info("This is already your current username");
      return;
    }

    try {
      setIsSavingUsername(true);
      updateUsername(trimmed);
      toast.success("Username updated successfully");
      setNewUsername("");
    } catch (error) {
      const err = error as Error;

      if (err.message === "USERNAME_ALREADY_EXISTS") {
        toast.error("This username is already taken");
      } else if (err.message === "NOT_AUTHENTICATED") {
        toast.error("You need to be logged in");
      } else {
        toast.error("Could not update username. Please try again.");
      }
    } finally {
      setIsSavingUsername(false);
    }
  };

  const handlePasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedCurrent = currentPassword.trim();
    const trimmedNew = newPassword.trim();
    const trimmedConfirm = confirmNewPassword.trim();

    if (!trimmedCurrent || !trimmedNew || !trimmedConfirm) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (trimmedNew !== trimmedConfirm) {
      toast.error("New passwords do not match");
      return;
    }

    if (!isStrongPassword(trimmedNew)) {
      toast.error(
        "Password must have at least 8 characters, 1 uppercase letter and 1 special character."
      );
      return;
    }

    if (trimmedNew === trimmedCurrent) {
      toast.error("New password must be different from the current one");
      return;
    }

    try {
      setIsSavingPassword(true);
      updatePassword(trimmedCurrent, trimmedNew);
      toast.success("Password updated successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      const err = error as Error;

      if (err.message === "INVALID_CURRENT_PASSWORD") {
        toast.error("Current password is incorrect");
      } else if (err.message === "NOT_AUTHENTICATED") {
        toast.error("You need to be logged in");
      } else {
        toast.error("Could not update password. Please try again.");
      }
    } finally {
      setIsSavingPassword(false);
    }
  };

  return (
    <S.Container>
      <S.Card>
        <S.Title>Account</S.Title>
        <S.Subtitle>Manage your profile and security settings.</S.Subtitle>

        <S.UserInfoRow>
          <div>
            <S.UserInfoLabel>Username</S.UserInfoLabel>
            <S.UserInfoValue>{user.username}</S.UserInfoValue>
          </div>

          {user.email && (
            <div>
              <S.UserInfoLabel>Email</S.UserInfoLabel>
              <S.UserInfoValue>{user.email}</S.UserInfoValue>
            </div>
          )}
        </S.UserInfoRow>

        <S.Divider />

        {/* CHANGE USERNAME */}
        <section>
          <S.SectionTitle>Change username</S.SectionTitle>
          <S.Form onSubmit={handleUsernameSubmit}>
            <S.InputGroup>
              <S.Label>New username</S.Label>
              <S.Input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Enter your new username"
              />
            </S.InputGroup>

            <S.SaveButton type="submit" disabled={isSavingUsername}>
              {isSavingUsername ? "Saving..." : "Save username"}
            </S.SaveButton>
          </S.Form>
        </section>

        <S.Divider />

        {/* CHANGE PASSWORD */}
        <section>
          <S.SectionTitle>Change password</S.SectionTitle>
          <S.Form onSubmit={handlePasswordSubmit}>
            <S.InputGroup>
              <S.Label>Current password</S.Label>
              <S.PasswordWrapper>
                <S.Input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                />
                <S.PasswordIconButton
                  type="button"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  aria-label={
                    showCurrentPassword
                      ? "Hide current password"
                      : "Show current password"
                  }
                >
                  {showCurrentPassword ? (
                    <EyeOff size={18} color="#6b7280" />
                  ) : (
                    <Eye size={18} color="#6b7280" />
                  )}
                </S.PasswordIconButton>
              </S.PasswordWrapper>
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>New password</S.Label>
              <S.PasswordWrapper>
                <S.Input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                />
                <S.PasswordIconButton
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  aria-label={
                    showNewPassword ? "Hide new password" : "Show new password"
                  }
                >
                  {showNewPassword ? (
                    <EyeOff size={18} color="#6b7280" />
                  ) : (
                    <Eye size={18} color="#6b7280" />
                  )}
                </S.PasswordIconButton>
              </S.PasswordWrapper>
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>Confirm new password</S.Label>
              <S.PasswordWrapper>
                <S.Input
                  type={showConfirmNewPassword ? "text" : "password"}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Confirm your new password"
                />
                <S.PasswordIconButton
                  type="button"
                  onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                  aria-label={
                    showConfirmNewPassword
                      ? "Hide confirm new password"
                      : "Show confirm new password"
                  }
                >
                  {showConfirmNewPassword ? (
                    <EyeOff size={18} color="#6b7280" />
                  ) : (
                    <Eye size={18} color="#6b7280" />
                  )}
                </S.PasswordIconButton>
              </S.PasswordWrapper>
            </S.InputGroup>

            <S.PasswordHint>
              Password must have at least 8 characters, 1 uppercase letter and 1
              special character.
            </S.PasswordHint>

            <S.SaveButton type="submit" disabled={isSavingPassword}>
              {isSavingPassword ? "Saving..." : "Save password"}
            </S.SaveButton>
          </S.Form>
        </section>
      </S.Card>
    </S.Container>
  );
}
