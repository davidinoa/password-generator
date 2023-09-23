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
      <link
        href="https://fonts.googleapis.com/css?family=Contrail+One|Roboto+Mono:400,700&display=swap"
        rel="stylesheet"
      />
    </html>
  )
}
