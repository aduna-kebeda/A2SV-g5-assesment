'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar/page';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>

         <Navbar />
         <div className='pt-32'> {children}</div>
          
        </Provider>
      </body>
    </html>
  );
}
