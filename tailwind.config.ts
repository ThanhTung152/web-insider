import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          '400': '#6B79FF',
          '500': '#5766FF',
        },
        'red-500': '#FA3363',
        'gradients-blue': 'linear-gradient(180deg, #547aff 0%, #4551de 100%)',
        'grey-100': '#FCFCFD',
        'grey-200': '#EEF2F6',
        'grey-300': '#E5E6EB',
        'grey-400': '#D1D2DC',
        'grey-500': '#9FA4B7',
        'grey-600': '#4F556E',
        'grey-700': '#333747',
        'sp-green-500': '#1AB369',
        'blue-500': '#547AFF',
        'indigo-900': '#4551DE',
        orange: {
          '400': '#F89152',
          '500': '#F7931A',
        },
      },
      maxWidth: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1408px',
      },
      boxShadow: {
        primary: '0px 0px 16px 0px rgba(51, 55, 71, 0.08)',
      },
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    fontFamily: {
      jm: ['Plus Jakarta Sans Medium'],
      jeb: ['Plus Jakarta Sans ExtraBold'],
      jbi: ['Plus Jakarta Sans BoldItalic'],
      jebi: ['Plus Jakarta Sans ExtraBoldItalic'],
      jel: ['Plus Jakarta Sans ExtraLight'],
      jeli: ['Plus Jakarta Sans ExtraLightItalic'],
      ji: ['Plus Jakarta Sans Italic'],
      jl: ['Plus Jakarta Sans Light'],
      jli: ['Plus Jakarta Sans LightItalic'],
      jmi: ['Plus Jakarta Sans MediumItalic'],
      jr: ['Plus Jakarta Sans Regular'],
      jsb: ['Plus Jakarta Sans SemiBold'],
      jb: ['Plus Jakarta Sans Bold'],
      jsbi: ['Plus Jakarta Sans SemiBoldItalic'],
    },
  },
  plugins: [],
};
export default config;
