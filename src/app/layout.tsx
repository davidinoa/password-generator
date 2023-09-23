import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Contrail_One, Roboto_Mono } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Password Generator',
  description: 'Secure random passwords and passphrases',
}

const contrailOne = Contrail_One({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-contrail-one',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${contrailOne.variable} ${robotoMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
