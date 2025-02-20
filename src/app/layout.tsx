import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/ui/styles/globals.css";

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: "My First Next App",
  description: "This App is for learning Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning
        className = {inter.className}
      >
        {children}
      </body>
    </html>
  );
}
