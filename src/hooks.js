import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const useAction = (action) => {
  const dispatch = useDispatch();
  return useCallback(
    (...args) => {
      dispatch(action(...args));
    },
    [action, dispatch]
  );
};

// eslint-disable-next-line import/prefer-default-export
export { useAction };
