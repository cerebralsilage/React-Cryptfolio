
export const convertTimeStamp = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);
  const d = new Date(unixTimestamp)
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // 👇️ Format as hh:mm:ss
  const time = `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds,
  )}`;

  const year = d.getFullYear();
  const month = padTo2Digits(date.getMonth() + 1);
  const day = padTo2Digits(date.getDate());

  const dateTime = `${year}-${month}-${day} ${time}`;

  console.log(dateTime); // 👉️ 2022-09-24 09:25:32

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
};