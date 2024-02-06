import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/layout/nav/Navigation";
import { AuthContextProvider } from "@/context/authContext";


export const metadata: Metadata = {
  title: "Todo App",
  description: "App to todo test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <Navigation />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
