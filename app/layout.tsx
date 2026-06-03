import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dima — Product Designer",
  description: "Portfolio of Dima, Product Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
