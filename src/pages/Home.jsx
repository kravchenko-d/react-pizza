import { useContext, useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

export const Home = () => {
  // const categoryId = useSelector((state) => state.filter.categoryId);
  // const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const { categoryId, sort } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  console.log(dispatch, 'appDispatch');

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [categoryId, setCategoryId] = useState(0);
  // const [sortType, setSortType] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState(false);
  const sortTypeNames = ['rating', 'price', 'title'];

  console.log('redux-state', categoryId);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId === 0 ? '' : `&category=${categoryId}`;
    const sortItems = `&sortBy=${sortDirection ? '' : '-'}${sort.sortProperty}`;
    const search = searchValue ? `&title=*${searchValue}` : '';

    fetch(
      `https://2e28a9697dc27353.mokky.dev/items?page=${currentPage}&limit=4` +
        category +
        sortItems +
        search,
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort, sortDirection, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        {/* <Categories categoryId={categoryId} setCategoryId={setCategoryId} /> */}
        <Categories categoryId={categoryId} setCategoryId={(id) => dispatch(setCategoryId(id))} />
        <Sort
          // sortType={sortType}
          // setSortType={setSortType}
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
              // .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase())) // эта фильтрация было до фильтрации в mokky
              .map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination
        handlePageClick={(number) => setCurrentPage(number)}
        pageCount={!isLoading && items.meta.total_pages} // без !isLoading попадает undefined
      />
    </div>
  );
};
