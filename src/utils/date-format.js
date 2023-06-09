import moment from 'moment';

export function formatDateTime(dateTime) {
  moment.locale('ru');
  return moment(dateTime).format('D MMMM YYYY [в] HH:mm');
}
