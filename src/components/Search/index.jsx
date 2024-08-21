import { CiSearch } from 'react-icons/ci';
import styles from './Search.module.scss';
import { IoClose } from 'react-icons/io5';
import { useCallback, useContext, useRef, useState } from 'react';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';

export const Search = () => {
  const [value, setValue] = useState('');
  const { setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 150),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <CiSearch className={styles.icon} />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && <IoClose onClick={onClickClear} className={styles.close} />}
    </div>
  );
};
