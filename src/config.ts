import { Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'vn'] as const;

export const pathnames = {
  '/': '/',
  '/pathnames': {
    en: '/pathnames',
    vn: '/pfadnamen',
  },
} satisfies Pathnames<typeof locales>;

export type AppPathnames = keyof typeof pathnames;
