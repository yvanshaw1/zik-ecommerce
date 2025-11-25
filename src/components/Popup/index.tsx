import { Toaster } from "sonner";

export function Popup() {
  return (
    <Toaster
      position="bottom-right"
      richColors
      toastOptions={{
        style: {
          padding: "16px",
          fontSize: "14px",
        },
      }}
    />
  );
}
