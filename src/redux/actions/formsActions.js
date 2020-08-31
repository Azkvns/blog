import { IS_SUBMITED_FORM } from '../actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const isSubmitedForm = (isSubmited) => {
  return {
    type: IS_SUBMITED_FORM,
    payload: isSubmited,
  };
};
