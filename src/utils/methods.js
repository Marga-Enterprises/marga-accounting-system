/**
 * convert object to query string
 * @param {*} params
 */
export const convertQueryString = (params) => {
  // Check if params is a valid object
  if (!params || typeof params !== 'object') {
    return ''; // Return an empty string if params is invalid
  }

  // Convert the object to a query string
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
}

