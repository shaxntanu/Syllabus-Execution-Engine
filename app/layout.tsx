import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Exam War Engine",
  description: "Strategic exam preparation dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
