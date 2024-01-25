import moment from 'moment';

export const formatDate = (date?: Date | string, format?: string) => {
  if (!date) {
    return '';
  }

  return moment(date).format(format || 'DD MMM YYYY');
};
