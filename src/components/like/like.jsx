import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import cls from './like.module.scss';

export default function Like(props) {
  const { counter, checked, onChange } = props;
  const isLogged = useSelector((state) => state.userSession.isLogged);
  return (
    <label className={cls.container}>
      <input
        className={cls.input}
        disabled={!isLogged}
        checked={checked}
        onChange={() => {
          onChange(!checked);
        }}
        type="checkbox"
      />
      <span className={cn(cls.box, { [cls.checked]: checked, [cls.active]: isLogged })} />
      {counter || ''}
    </label>
  );
}

Like.propTypes = {
  counter: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
