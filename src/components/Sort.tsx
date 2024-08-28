import { FC, memo, useEffect, useRef, useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { setSort } from '../redux/filter/slice';
import { Sort } from '../redux/filter/types';

type SortItem = {
  name: string;
  sortProperty: 'rating' | 'title' | 'price';
};

type SortProps = {
  value: Sort;
  sortDirection: boolean;
  setSortDirection: any;
};

export const sortList: SortItem[] = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

const SortPopup: FC<SortProps> = memo(({ value, sortDirection, setSortDirection }) => {
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const onClickListItem = (obj: SortItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <div className='sort__direction'>
        {sortDirection ? (
          <AiFillCaretUp onClick={() => setSortDirection(!sortDirection)} />
        ) : (
          <AiFillCaretDown onClick={() => setSortDirection(!sortDirection)} />
        )}
        </div>        
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, id) => (
              <li
                key={id}
                onClick={() => onClickListItem(obj)}
                className={value.sortProperty === obj.name ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortPopup;
