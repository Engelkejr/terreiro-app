import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Terreiro Gestão',
  description: 'Sistema de gestão comunitária para Terreiro de Umbanda — Projeto de Extensão',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-terreiro-50">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="text-center text-xs text-terreiro-400 py-6 mt-12 border-t border-terreiro-100">
          Terreiro Gestão · Projeto de Extensão Universitária · ODS 10 — Redução das Desigualdades
        </footer>
      </body>
    </html>
  )
}
