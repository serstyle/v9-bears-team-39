import {
  GET_WIKIS,
  ADD_WIKI,
  DELETE_WIKI,
  WIKI_ERROR,
  SET_CURRENT,
  UPDATE_WIKI,
  CLEAR_CURRENT,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_WIKIS:
      return {
        ...state,
        wikis: action.payload,
        isLoading: false,
      };
    case ADD_WIKI:
      return {
        ...state,
        wikis: [action.payload, ...state.wikis],
        isLoading: false,
      };
    case UPDATE_WIKI:
      return {
        ...state,
        wikis: state.wikis.map(wiki =>
          wiki._id === action.payload._id ? action.payload : wiki
        ),
        isLoading: false,
      };
    case DELETE_WIKI:
      return {
        ...state,
        wikis: state.wikis.filter(wiki => wiki._id !== action.payload),
        isLoading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case WIKI_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
