import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gwerdinary | Plataforma de almacenamiento de Gwerh',
  description: 'Api personal que retorna la URL de las imágenes guardada en la base de datos para ser renderizadas en apps.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
