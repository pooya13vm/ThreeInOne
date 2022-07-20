export const differentCal = num => {
  console.log(num);
  let second = Math.trunc(num / 1000);
  let min = Math.trunc(second / 60);
  let minRes = Math.floor(min % 60);
  let hour = Math.trunc(min / 60);
  let hourRes = Math.trunc(hour % 24);
  let day = Math.trunc(hour / 24);
  let dayRes = Math.trunc(day % 30);
  let month = Math.trunc(day / 30);
  return {month, dayRes, hourRes, minRes};
};
