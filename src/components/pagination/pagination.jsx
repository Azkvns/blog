import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import cls from './pagination.module.scss';

const renderPagItems = (current, pagesCount, onChange) => {
  if (!pagesCount) {
    return null;
  }
  const firstItem = current >= 3 && pagesCount >= 5 ? current - 2 : 1;
  let lastItem = pagesCount;
  if (pagesCount >= 5) {
    lastItem = current <= 3 ? 5 : current + 2;
    lastItem = current + 2 > pagesCount ? pagesCount : lastItem;
  }
  const items = [];
  for (let i = firstItem; i <= lastItem; i++) {
    items.push(
      <li className={cls.item} key={i}>
        <button type="button" className={cn(cls.btn, { [cls.active]: i === current })} onClick={() => onChange(i)}>
          {i}
        </button>
      </li>
    );
  }
  return items;
};

export default function Pagination(props) {
  const { current, pageSize, total, onChange } = props;
  const pagesCount = total / pageSize;
  return (
    <ul className={cls.container}>
      <li className={cls.item}>
        <button
          type="button"
          disabled={current < 2}
          className={cn(cls.btn, { [cls.disabled]: current < 2 })}
          onClick={() => onChange(Number(current) - 1)}
        >
          {'<'}
        </button>
      </li>
      {renderPagItems(Number(current), pagesCount, onChange)}
      <li className={cls.item}>
        <button
          type="button"
          disabled={current >= pagesCount}
          className={cn(cls.btn, { [cls.disabled]: current >= pagesCount })}
          onClick={() => onChange(Number(current) + 1)}
        >
          {'>'}
        </button>
      </li>
    </ul>
  );
}

Pagination.defaultProps = {
  current: 1,
  pageSize: 10,
  total: 10,
};

Pagination.propTypes = {
  current: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
