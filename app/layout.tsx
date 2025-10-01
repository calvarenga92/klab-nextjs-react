
import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen">
        <header className="border-b">
          <div className="max-w-3xl mx-auto px-4 py-4 text-lg font-semibold">
            <Link href="/" className="text-xl font-semibold">
              <img src="https://klab.com.br/wp-content/uploads/2023/02/KLAB_Transparente-1-2048x1152.png"
                alt="Logo"
                className="h-16 object-contain inline-block mr-2"
              />
            </Link>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
