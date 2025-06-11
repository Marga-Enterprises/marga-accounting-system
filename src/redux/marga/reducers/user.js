import * as types from '@redux/types';

const initialState = {
  authenticated: false,
  error: null,
  user: {},
  users: [], // This is where we'll store the list of users
  loading: false, // This will be used to track loading state for the users fetch
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.LOGIN_REQUEST:
      return { ...state, loading: true };

    case types.LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload };

    case types.SET_USER_DETAILS:
      return { ...state, ...action.payload, authenticated: true };

    case types.LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export default reducer;
