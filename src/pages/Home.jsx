import { useContext, useEffect, useRef, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router';
import { sortList } from '../components/Sort';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortDirection, setSortDirection] = useState(false);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = async () => {
    setIsLoading(true);

    const category = categoryId === 0 ? '' : `&category=${categoryId}`;
    const sortItems = `&sortBy=${sortDirection ? '' : '-'}${sort.sortProperty}`;
    const search = searchValue ? `&title=*${searchValue}` : '';

    try {
      const res = await axios.get(
        `https://2e28a9697dc27353.mokky.dev/items?page=${currentPage}&limit=4${category}${sortItems}${search}`,
      );
      setItems(res.data);
    } catch (error) {
      console.log(error, 'AXIOS ERROR');
      alert('Ошибка при получении пицц');
    } finally {      
      setIsLoading(false);
    }

    window.scrollTo(0, 0);
  };

  // если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, sortDirection, currentPage]);

  // Если был первый рендер, то проверяем url-параметры и сохраняем в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current || window.location.search) {
      fetchPizzas();

      isSearch.current = false;
    }
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
