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
import { fetchPizzas } from '../redux/slices/pizzaSlice';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { items, meta } = useSelector((state) => state.pizza.items);
  const { status } = useSelector((state) => state.pizza);

  const { searchValue } = useContext(SearchContext);
  // const [isLoading, setIsLoading] = useState(true);
  const [sortDirection, setSortDirection] = useState(false);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    // setIsLoading(true);

    const category = categoryId === 0 ? '' : `&category=${categoryId}`;
    const sortItems = `&sortBy=${sortDirection ? '' : '-'}${sort.sortProperty}`;
    const search = searchValue ? `&title=*${searchValue}` : '';

    // try {
      // const res = await axios.get(
      //   `https://2e28a9697dc27353.mokky.dev/items?page=${currentPage}&limit=4${category}${sortItems}${search}`,
      // );
      dispatch(
        fetchPizzas({
          category,
          sortItems,
          search,
          currentPage,
        }),
      );
    // }
    //  catch (error) {
    //   console.log(error, 'AXIOS ERROR');
    //   alert('Ошибка при получении пицц');
    // }
    //  finally {
    //   setIsLoading(false);
    // }

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
      getPizzas();

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
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось загрузить пиццы.<br />Попробуйте повторить попытку позже.</p>
        </div>
        
      ) : 
      <>
      <div className="content__items">
      {/* {isLoading */}
      {status === 'loading'
        ? [...Array(6).fill(null)].map((_, index) => <Skeleton key={index} />)
        : items // при добавлении пагинации от mokky.dev возвращается не массив, а объект со свойствами meta и items
            .map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
    </div>
    <Pagination
        currentPage={currentPage}
        handlePageClick={onChangePage}
        // pageCount={!isLoading && meta.total_pages} // без !isLoading попадает undefined
        pageCount={status !== 'loading' && meta.total_pages} // без !isLoading попадает undefined
      />
      </>
      
    
    }
      
      
    </div>
  );
};
