/**
 * Associated Press Date Formatter
 * 
 * Used to format dates to match AP rules. 
 * 
 * @param {string} data - Date in string format.
 * @param {string|undefined} format - Optional. Change date formatting for other usages.
 * @returns {string} - Formatted date. Defaults to 'Date With Year' format.
 * 
 */


// Month formatting for when day is listed with the date.
const monthWdate = [
  "Jan.",
  "Feb.",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug.",
  "Sept.",
  "Oct.",
  "Nov.",
  "Dec."
]

// Month formatting for when the date is not used
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

module.exports = (data, format) => {
  const srcDate = new Date(data);
  const year = srcDate.getFullYear();
  const month = srcDate.getMonth();
  const dayOfMonth = srcDate.getDate();
  const hours = srcDate.getHours() > 12 ? srcDate.getHours() - 12 : srcDate.getHours();
  const minutes = srcDate.getMinutes() < 10 && srcDate.getMinutes() !== 0 ? `:0${srcDate.getMinutes()}` : srcDate.getMinutes() === 0 ? '' : `:${srcDate.getMinutes()}`;
  const ampm = srcDate.getHours() < 12 ? 'a.m.' : 'p.m.';
  let adjustedDate;
  switch (format) {
    case 'Month Year':
      adjustedDate = `${months[month]} ${year}`;
      break;
    case 'Date No Year':
      adjustedDate = `${hours}${minutes} ${ampm} ${monthWdate[month]} ${dayOfMonth}`;
      break;
    case 'Time':
      adjustedDate = `${hours}${minutes} ${ampm}`;
      break;
    case 'Date':
      adjustedDate = `${monthWdate[month]} ${dayOfMonth}`;
      break;
    case 'Date With Year':
      adjustedDate = `${monthWdate[month]} ${dayOfMonth}, ${year}`;
      break;
    case 'Full':
      adjustedDate = `${hours}${minutes} ${ampm} ${monthWdate[month]} ${dayOfMonth}, ${year}`;
      break;
    default:
      adjustedDate = `${monthWdate[month]} ${dayOfMonth}, ${year}`;
      break;
  }
  return adjustedDate;
}