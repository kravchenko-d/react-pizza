import { CiSearch } from 'react-icons/ci';
import styles from './Search.module.scss';
import { IoClose } from 'react-icons/io5';
import { useContext } from 'react';
import { SearchContext } from '../../App';

export const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);

  return (
    <div className={styles.root}>
      <CiSearch className={styles.icon} />
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {searchValue && <IoClose onClick={() => setSearchValue('')} className={styles.close} />}
    </div>
  );
};
