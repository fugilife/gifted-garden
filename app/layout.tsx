import type { Metadata } from 'next'
import { Noto_Sans_TC, Nunito } from 'next/font/google'
import './globals.css'

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-tc',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: '吉福種樹花園 · Gifted Garden',
  description: '專為 Gisele 與 Fiona 設計的中文學習激勵遊戲',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className={`${notoSansTC.variable} ${nunito.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
