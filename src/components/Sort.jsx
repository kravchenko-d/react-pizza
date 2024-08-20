import { useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../redux/slices/filterSlice';

const list = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

function Sort({ sortType, setSortType, sortDirection, setSortDirection }) {
  const sort = useSelector((state) => state.filter.sort);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  // const list = ['популярности', 'цене', 'алфавиту'];  

  const onClickListItem = (obj) => {
    // setSortType(i);
    dispatch(setSort(obj));
    setOpen(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        {sortDirection ? (
          <AiFillCaretUp onClick={() => setSortDirection(!sortDirection)} />
        ) : (
          <AiFillCaretDown onClick={() => setSortDirection(!sortDirection)} />
        )}
        <b>Сортировка по:</b>
        {/* <span onClick={() => setOpen(!open)}>{list[sortType]}</span> */}
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, id) => (
              <li
                key={id}
                // onClick={() => onClickListItem(id)}
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
