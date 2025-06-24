/**
 * convert object to query string
 * @param {*} params
 */
export const convertQueryString = (params) => {
  if (!params || typeof params !== 'object') return '';

  return Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
};

/**
 * capitalize the first letter of a string
 * @param {string} str
 */
export const capitalizeFirstLetter = (str) => {
  if (typeof str !== 'string' || str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * convert to date string in format DD/MM/YYYY
 * supports native Date or Excel serial number
 * @param {string|number|Date} input
 */
export const convertDate = (input) => {
  if (!input) return '';

  let date;
  if (typeof input === 'number') {
    // Handle Excel serial date
    date = new Date((input - 25569) * 86400 * 1000);
  } else {
    date = new Date(input);
    if (isNaN(date)) return ''; // invalid date
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${month}/${day}/${year}`; // → e.g. 15/03/2025
};
