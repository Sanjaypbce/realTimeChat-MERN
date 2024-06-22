import {
  USER_DATA_REQUEST,
  USER_DATA_SUCCESS,
  USER_DATA_FAILURE,
} from "../actions/userActions";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA_REQUEST:
      return { ...state, loading: true };
    case USER_DATA_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case USER_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
