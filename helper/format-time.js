

export const formatTime =(timestamp)=>
{

const date = new Date(timestamp);

// Lấy các thành phần thời gian
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); // Thêm 0 nếu tháng < 10
const day = String(date.getDate()).padStart(2, '0');        // Thêm 0 nếu ngày < 10
const hours = String(date.getHours()).padStart(2, '0');     // Thêm 0 nếu giờ < 10
const minutes = String(date.getMinutes()).padStart(2, '0'); // Thêm 0 nếu phút < 10

const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
return formattedDate
}