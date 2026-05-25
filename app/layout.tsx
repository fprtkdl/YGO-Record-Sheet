import Header from "@/components/header";
import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "듀얼 전적 기록",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="container">
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
