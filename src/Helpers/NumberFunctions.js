export function numberWithCommas(num) {
  if (num >= 1000) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return num;
  }
} 

export function numFormatter(num) {
  if(num > 999 && num < 1000000){
      return (num/1000).toFixed(2) + 'K'; 
  } else if(num > 999999 && num < 1000000000){
      return (num/1000000).toFixed(2) + 'M'; 
  } else if(num > 1000000000){
      return (num/1000000000).toFixed(2) + 'B' 
  }
}
