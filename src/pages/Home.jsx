import { useContext, useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';

export const Home = () => {
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState(false);
  const sortTypeNames = ['rating', 'price', 'title'];

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId === 0 ? '' : `&category=${categoryId}`;
    const sort = `&sortBy=${sortDirection ? '' : '-'}${sortTypeNames[sortType]}`;
    const search = searchValue ? `&title=*${searchValue}` : '';

    fetch(
      `https://2e28a9697dc27353.mokky.dev/items?page=${currentPage}&limit=4` +
        category +
        sort +
        search,
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortDirection, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={setCategoryId} />
        <Sort
          sortType={sortType}
          setSortType={setSortType}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
      </div>
      <h2 className="content__title">
        {searchValue ? `Результаты поиска: "${searchValue}"` : 'Все пиццы'}
      </h2>
      <div className="content__items">
        {isLoading
          ? [...Array(6).fill(null)].map((_, index) => <Skeleton key={index} />)
          : items.items // при добавлении пагинации от mokky.dev возвращается не массив, а объект со свойствами meta и items
              // .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
              .map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination
        handlePageClick={(number) => setCurrentPage(number)}
        pageCount={!isLoading && items.meta.total_pages} // без !isLoading попадает undefined
      />
    </div>
  );
};
