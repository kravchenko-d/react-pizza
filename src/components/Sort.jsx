import { useEffect, useRef, useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { selectSort, setSort } from '../redux/slices/filterSlice';

export const sortList = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

function Sort({ sortDirection, setSortDirection }) {
  const sort = useSelector(selectSort);
  const dispatch = useDispatch();
  const sortRef = useRef();

  const [open, setOpen] = useState(false);

  const onClickListItem = (obj) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        {sortDirection ? (
          <AiFillCaretUp onClick={() => setSortDirection(!sortDirection)} />
        ) : (
          <AiFillCaretDown onClick={() => setSortDirection(!sortDirection)} />
        )}
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, id) => (
              <li
                key={id}
                onClick={() => onClickListItem(obj)}
                className={sort.sortProperty === id ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
