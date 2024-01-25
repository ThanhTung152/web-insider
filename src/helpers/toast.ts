import { toast } from 'react-toastify';

export const showToast = (
  type: 'info' | 'success' | 'warning' | 'error',
  message: string
) => {
  if (typeof window !== 'undefined') {
    toast.dismiss();
    toast[type](message);
  }
};
