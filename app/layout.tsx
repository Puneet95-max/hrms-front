import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "HRMS Lite",
  description: "Human Resource Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#0f766e",
              color: "#f0fdfa",
              borderRadius: "12px",
              fontWeight: 500,
            },
            success: { iconTheme: { primary: "#5eead4", secondary: "#f0fdfa" } },
            error: {
              style: { background: "#9f1239", color: "#ffe4e6" },
              iconTheme: { primary: "#fda4af", secondary: "#ffe4e6" },
            },
          }}
        />
      </body>
    </html>
  );
}
