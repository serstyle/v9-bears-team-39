import { REGISTER_SUCCESS, REGISTER_FAIL } from '../types';

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case REGISTER_FAIL:
    default:
      return state;
  }
};
