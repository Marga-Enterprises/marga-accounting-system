// imports
import dayjs from 'dayjs';


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

/**
 * convert month number to month name
 * 
 * @param {number} monthNumber - 0 for January, 1 for February,
 */
export const convertMonthToName = (monthNumber) => {
  if (typeof monthNumber !== 'number' || monthNumber < 0 || monthNumber > 11) {
    return '';
  }

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return months[monthNumber];
};


/**
 * check if a string is a valid email
 * 
 * @param {string} email
 * @return {boolean}
 * */
export const isValidEmail = (email) => {
  if (typeof email !== 'string') return false;
  email = email.trim();
  if (email.length === 0) return false;

  // Basic regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}



/**
 * Returns a mapping of age bucket keys to values based on the number of days old.
 * 
 * @param {string|Date} date - The reference date to check the age from (e.g., collection.collection_date)
 * @param {number|string} amount - The amount to insert in the matching bucket
 * @param {Array<{ label: string, key: string, min: number, max?: number }>} buckets - Age ranges
 * @returns {Object} - Key-value pairs per bucket (only one bucket has the amount, others are null)
 */
export const bucketByAge = (date, amount, buckets) => {
  const daysOld = dayjs().diff(dayjs(date), 'day');
  const parsedAmount = parseFloat(amount).toFixed(2);

  const result = {};

  for (const bucket of buckets) {
    const isInRange = bucket.max !== undefined
      ? daysOld >= bucket.min && daysOld <= bucket.max
      : daysOld >= bucket.min;

    result[bucket.key] = isInRange ? `₱${parsedAmount}` : null;
  }

  return result;
};

/**
 * Converts a number to PESO format with right commas and two decimal places.
 * @param {number} amount - The amount to format
 * @returns {string} - The formatted amount in PESO format
 */
export const formatPeso = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) return '₱0.00';

  return `₱${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}