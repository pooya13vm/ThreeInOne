export const dateStringMaker = date => {
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
  return `${weekday} ${monthDay} - ${month} - ${year}`;
};
