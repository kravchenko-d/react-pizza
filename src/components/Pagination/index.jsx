import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

export const Pagination = ({ pageCount, handlePageClick }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel="Следующая >"
      onPageChange={(event) => handlePageClick(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="< Предыдущая"
      renderOnZeroPageCount={null}
    />
  );
};
