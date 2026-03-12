import type { Metadata } from "next";
import { Geist_Mono, Roboto } from "next/font/google"; // Limpiamos los imports
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navegation from "@/components/navegation";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configurate Roboto
const fontRoboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});


export const metadata: Metadata = {
  title: "TaskFlow - Gestión de Proyectos",
  description: "Sistema de gestión de tareas desarrollado con Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontRoboto.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navegation />
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
