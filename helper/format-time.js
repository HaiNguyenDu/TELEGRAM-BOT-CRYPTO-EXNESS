import moment from 'moment-timezone';
export const formatTime = () => {
return moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm');
};
  

