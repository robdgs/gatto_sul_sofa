import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scopri il tuo gatto",
  description: "Scopri quale gatto sul sofà sei — un test di personalità in 37 domande",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
