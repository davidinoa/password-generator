import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Password Generator',
  description: 'A secure password/passphrase generator built with React',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
