import dynamic from 'next/dynamic';

const HeaderDesktop = dynamic(() => import('./HeaderDesktop/HeaderDesktop'), { ssr: false })
const HeaderMobile = dynamic(() => import('./HeaderMobile/HeaderMobile'), { ssr: false })

const Header = () => {
  return (
    <header className='header relative z-[999] bg-grey-100 border border-grey-300'>
      <HeaderDesktop />
      <HeaderMobile />
    </header>
  );
};

export default Header;
