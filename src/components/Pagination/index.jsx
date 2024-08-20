import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

export const Pagination = ({ currentPage, pageCount, handlePageClick }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel="Следующая >"
      onPageChange={(event) => handlePageClick(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={pageCount}
      forcePage={currentPage - 1}
      previousLabel="< Предыдущая"
      renderOnZeroPageCount={null}
    />
  );
};
