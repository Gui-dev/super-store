import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'

import { AuthProvider } from '@/providers/auth'
import { Header } from '@/components/ui/header'
import { Footer } from '@/components/ui/footer'
import { CartProvider } from '@/providers/cart'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Super Store',
  description: 'Super Store',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} flex h-full flex-col`}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
