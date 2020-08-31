import { IS_SUBMITED_FORM } from '../actionTypes';

const formsReducer = (state = { isSubmited: false, isSubmitError: false }, action) => {
  switch (action.type) {
    case IS_SUBMITED_FORM:
      return { ...state, isSubmited: action.payload };
    default:
      return state;
  }
};

export default formsReducer;
