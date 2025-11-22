export const theme = {
  colors: {
    primary: "#007bff",
    primaryHover: "#0056b3",
    success: "#28a745",
    successHover: "#218838",
    danger: "#dc3545",
    dangerHover: "#c82333",
    warning: "#ffc107",
    background: "#f0f2f5",
    white: "#ffffff",
    text: "#333333",
    textLight: "#666666",
    border: "#dddddd",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
  },
  shadows: {
    sm: "0 1px 3px rgba(0,0,0,0.1)",
    md: "0 2px 10px rgba(0,0,0,0.1)",
    lg: "0 4px 20px rgba(0,0,0,0.15)",
  },
};

export type Theme = typeof theme;
