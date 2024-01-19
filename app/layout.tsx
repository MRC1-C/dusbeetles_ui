import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import StoreProvider from './StoreProvider'

const inter = Quicksand({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dusbeetles',
  description: 'Loa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <StoreProvider>
          <div className='flex flex-col min-h-screen'>
            <Header />
            <div className='bg-gray-50 flex-auto'>
              <div className='container mx-auto'>
                {children}
              </div>
            </div>
            <div className='bg-black'>
              <Footer />
            </div>
          </div>
        </StoreProvider>
      </body>
    </html>
  )
}
