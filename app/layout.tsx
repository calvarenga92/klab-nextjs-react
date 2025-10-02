import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="border-b bg-white shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
             <Link href="/" className="text-xl font-semibold">
              <img src="https://klab.com.br/wp-content/uploads/2023/02/KLAB_Transparente-1-2048x1152.png"
                alt="Logo"
                style={{ maxWidth: '200px', height: '64px' }}
              />
            </Link>
            <nav className="space-x-4">
              <a href="/" className="hover:text-blue-600">Home</a>
              <a href="/historico" className="hover:text-blue-600">Histórico</a>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
        <footer className="max-w-5xl mx-auto px-4 py-0 flex items-center justify-between">
          <div className="text-xs text-gray-500">
             KLAB-004 - Estilização e responsividade — TailwindCSS
          </div>
          <div className="text-xs text-gray-500">
             Desenvolvido por Claudio Alvarenga
          </div>
        </footer>
      </body>
    </html>
  );
}
