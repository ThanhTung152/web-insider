import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/CommonLayouts/Header/Index'), { ssr: true })
const Footer = dynamic(() => import('@/components/CommonLayouts/Footer/Index'), { ssr: true })

// Can be imported from a shared config
const locales = ['en', 'vn'];

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({ children, params: { locale } }: Props) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return (
    <html lang='en'>
      <body className={'font-jm font-medium text-base'}>
        <Header />
        {children}
        <Footer />
        <ToastContainer
          position='top-right'
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </body>
    </html>
  );
}
