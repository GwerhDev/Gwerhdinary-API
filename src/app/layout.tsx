import connectDB from '@/app/api/integrations/mongodb';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Gwerdinary | Plataforma de almacenamiento de Gwerh',
  description: 'App NextJs de uso personal que retorna la URL o ID de las imágenes guardadas en la base de datos para ser renderizadas en mis apps.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    await connectDB();
  } catch (error) {
    console.error(error);
  } finally {
    return (
      <html lang="es">
        <body className={inter.className}>{children}</body>
      </html>
    )
  }
}
