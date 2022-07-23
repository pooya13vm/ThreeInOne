export const differentCal = num => {
  let second = Math.trunc(num / 1000);
  let min = Math.trunc(second / 60);
  let minRes = Math.floor(min % 60);
  let hour = Math.trunc(min / 60);
  let hourRes = Math.trunc(hour % 24);
  let day = Math.trunc(hour / 24);
  let dayRes = Math.trunc(day % 30);
  let month = Math.trunc(day / 30);
  if (month >= 1) {
    return `${month} months & ${dayRes} days & ${hourRes} hours & ${minRes} minutes`;
  }
  if (month == 0 && dayRes >= 1) {
    return `${dayRes} days & ${hourRes} hours & ${minRes} minutes`;
  }
  if (month == 0 && dayRes == 0 && hourRes >= 0) {
    return `${hourRes} hours & ${minRes} minutes`;
  }
  if (month == 0 && dayRes == 0 && hourRes == 0 && minRes >= 0) {
    return `${minRes} minutes`;
  }
};
