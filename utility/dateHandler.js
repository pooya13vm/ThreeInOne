export const dateStringMaker = (date, clock = false) => {
  const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  let year = date.getFullYear();
  let month = MONTHS[date.getMonth()];
  let weekday = WEEK_DAYS[date.getDay()];
  let monthDay = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (!clock) {
    return `${weekday} ${monthDay} - ${month} - ${year}`;
  } else {
    return `${hours} : ${minutes}    ${weekday} ${monthDay} - ${month} - ${year}`;
  }
};
