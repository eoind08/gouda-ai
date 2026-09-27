// app/layout.tsx
import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gouda AI',
  description: 'The worst ever AI LLM ever created, sometimes creates funny responses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <SpeedInsights />
      <Analytics />
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}