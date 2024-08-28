import { FC, useCallback, useEffect, useRef, useState } from 'react';

import { Skeleton, Categories, PizzaBlock, Pagination, SortPopup } from '../components';

import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { sortList } from '../components/Sort';

export const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const [sortDirection, setSortDirection] = useState(false);

  const onChangeCategory = useCallback((id: number) => dispatch(setCategoryId(id)), []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const category = categoryId === 0 ? '' : `&category=${categoryId}`;
    const sortItems = `&sortBy=${sortDirection ? '' : '-'}${sort.sortProperty}`;
    const search = searchValue ? `&title=*${searchValue}` : '';

    dispatch(
      fetchPizzas({
        category,
        sortItems,
        search,
        currentPage,
      }),
    );

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
          searchValue,
          categoryId,
          currentPage,
          sort: sort || sortList[0],
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
        <Categories categoryId={categoryId} setCategoryId={onChangeCategory} />
        <SortPopup value={sort} sortDirection={sortDirection} setSortDirection={setSortDirection} />
      </div>
      <h2 className="content__title">
        {searchValue ? `Результаты поиска: "${searchValue}"` : 'Все пиццы'}
      </h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось загрузить пиццы.
            <br />
            Попробуйте повторить попытку позже.
          </p>
        </div>
      ) : (
        <>
          <div className="content__items">
            {status === 'loading'
              ? [...Array(6).fill(null)].map((_, index) => <Skeleton key={index} />)
              : items.items // при добавлении пагинации от mokky.dev возвращается не массив, а объект со свойствами meta и items
                  .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)}
          </div>
          <Pagination
            currentPage={currentPage}
            handlePageClick={onChangePage}
            pageCount={status === 'loading' ? 1 : items.meta.total_pages} // без !isLoading попадает undefined
          />
        </>
      )}
    </div>
  );
};
