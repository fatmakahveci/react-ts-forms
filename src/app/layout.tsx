import { ReactNode } from 'react'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className="{body}">
      <div id="backdrop-root"></div>
      <div id="overlay-root"></div>
      {children}</body>
    </html>
  )
}