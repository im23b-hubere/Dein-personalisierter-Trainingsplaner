import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dein personalisierter Trainingsplaner',
  description: 'Erstelle deinen individuellen Trainingsplan basierend auf deinen Zielen und deinem Fitnesslevel',
  keywords: 'Trainingsplan, Fitness, Muskelaufbau, Fettabbau, Workout',
  authors: [{ name: 'Eric Huber' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={`${inter.className} bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
