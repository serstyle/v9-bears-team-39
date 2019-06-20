import { REGISTER_SUCCESS, REGISTER_FAIL, AUTH_ERROR } from '../types';

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case REGISTER_FAIL:
    case AUTH_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
