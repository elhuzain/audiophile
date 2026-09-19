"use client";

import { Toaster as HotToaster } from "react-hot-toast";

const Toaster = () => {
  return (
    <HotToaster
      containerStyle={{ top: "96px" }}
      gutter={12}
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          background: "#101010",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "8px",
          boxShadow: "0 18px 50px rgba(0, 0, 0, 0.28)",
          color: "#ffffff",
          fontFamily: "inherit",
          fontSize: "14px",
          fontWeight: 600,
          maxWidth: "min(360px, calc(100vw - 32px))",
          padding: "14px 18px",
        },
        success: {
          iconTheme: {
            primary: "#d87d4a",
            secondary: "#ffffff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ffffff",
            secondary: "#d87d4a",
          },
        },
      }}
    />
  );
};

export default Toaster;
