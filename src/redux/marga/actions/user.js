// API
import { loginService } from '@services/api/user';
import Cookies from 'js-cookie';
import axios from 'axios';

// JWT Decode
import { jwtDecode } from 'jwt-decode';

// Types
import * as types from '@redux/types';


// Set axios header and cookies
export const setAuthorizationHeader = (token) => {
  const bearerToken = `Bearer ${token}`;

  Cookies.set('token', token, { expires: 365, secure: true, sameSite: 'Strict' });
  axios.defaults.headers.common.Authorization = bearerToken;
};


// Store user info in cookies and redux
export const setUserDetails = (userDetails) => {
  Cookies.set('account', JSON.stringify(userDetails), { expires: 365, secure: true, sameSite: 'Strict' });
  Cookies.set('authenticated', true, { expires: 365, secure: true, sameSite: 'Strict' });
  Cookies.set('role', userDetails.user_role, { expires: 365, secure: true, sameSite: 'Strict' });

  return {
    type: types.SET_USER_DETAILS,
    payload: userDetails,
  };
};


// Login Function
export const loginAction = (payload) => async (dispatch) => {
  try {
    const res = await loginService(payload);

    const { success, data } = res;

    if (success) {
      if (data) {
        const account = jwtDecode(data); 

        setAuthorizationHeader(data);
        dispatch(setUserDetails(account));
      }
    }

    return res;
  } catch (err) {
    return dispatch({
      type: types.LOGIN_FAIL,
      payload: err.response?.data?.msg || 'Login failed.',
    });
  }
};


// Logout
export const logoutAction = () => (dispatch) => {
  try {
    ['token', 'account', 'role', 'authenticated'].forEach(Cookies.remove);

    // Reset user state
    dispatch({ type: 'USER_LOGOUT' });
  } catch (err) {
    console.error('Logout error:', err);
  }
};
