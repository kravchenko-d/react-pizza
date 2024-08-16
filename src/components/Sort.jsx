import { useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

function Sort({ sortType, setSortType, sortDirection, setSortDirection }) {
  const [open, setOpen] = useState(false);
  const list = ['популярности', 'цене', 'алфавиту'];

  const onClickListItem = (i) => {
    setSortType(i);
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
        <span onClick={() => setOpen(!open)}>{list[sortType]}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((name, id) => (
              <li
                key={id}
                onClick={() => onClickListItem(id)}
                className={sortType === id ? 'active' : ''}>
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
