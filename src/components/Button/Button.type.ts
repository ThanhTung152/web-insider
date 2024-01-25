import { ReactNode, MouseEventHandler } from 'react';

export type IButtonProps = {
  type?: 'primary' | 'default';
  children: ReactNode;
  onClick?: MouseEventHandler;
  classProps?: string;
};
