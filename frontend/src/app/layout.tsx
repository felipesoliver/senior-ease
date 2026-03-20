import type { Metadata } from "next";
import { Nunito, Source_Sans_3 } from "next/font/google";

import "./globals.css";
import Providers from "./providers";

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
});

const display = Nunito({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Senior Ease",
  description: "Senior Ease: um portal acessível para pessoas idosas acompanharem tarefas, lembretes e preferências.",
  openGraph: {
    title: "Senior Ease",
    description: "Portal acessível com login, painel, tarefas e preferências para usuários idosos.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Senior Ease",
    description: "Portal acessível com login, painel, tarefas e preferências para usuários idosos.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}