import { useContext, useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import axios from 'axios';

export const Home = () => {
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState(false);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId === 0 ? '' : `&category=${categoryId}`;
    const sortItems = `&sortBy=${sortDirection ? '' : '-'}${sort.sortProperty}`;
    const search = searchValue ? `&title=*${searchValue}` : '';

    // fetch(
    //   `https://2e28a9697dc27353.mokky.dev/items?page=${currentPage}&limit=4` +
    //     category +
    //     sortItems +
    //     search,
    // )
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setItems(json);
    //     setIsLoading(false);
    //   });

    axios
      .get(
        `https://2e28a9697dc27353.mokky.dev/items?page=${currentPage}&limit=4${category}${sortItems}${search}`,
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sort, sortDirection, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={(id) => dispatch(setCategoryId(id))} />
        <Sort sortDirection={sortDirection} setSortDirection={setSortDirection} />
      </div>
      <h2 className="content__title">
        {searchValue ? `Результаты поиска: "${searchValue}"` : 'Все пиццы'}
      </h2>
      <div className="content__items">
        {isLoading
          ? [...Array(6).fill(null)].map((_, index) => <Skeleton key={index} />)
          : items.items // при добавлении пагинации от mokky.dev возвращается не массив, а объект со свойствами meta и items
              .map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination
        currentPage={currentPage}
        handlePageClick={onChangePage}
        pageCount={!isLoading && items.meta.total_pages} // без !isLoading попадает undefined
      />
    </div>
  );
};
