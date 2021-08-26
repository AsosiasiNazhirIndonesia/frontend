import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Pagination.scss";

export default ({ currentPage, itemsPerPage, totalItem, paginate, reloadFunction, setCurrentPage }) => {
  const reload = async (type) => {
    let newCurrentPage = currentPage;
    switch(type) {
      case 'prev':
        if (currentPage - 1 >= 1) {
          newCurrentPage = currentPage - 1;
        }
        break;
      case 'next':
        if (totalItem >= itemsPerPage) {
          newCurrentPage = currentPage + 1;
        }
        break;
    }

    await reloadFunction(newCurrentPage - 1, itemsPerPage);
    setCurrentPage(newCurrentPage);
  }

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item" onClick={() => reload('prev')}>
          <div  className="page-link">
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
        </li>
        <li className="page-item" onClick={() => reload('next')}>
          <div  className="page-link">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </li>
      </ul>
    </nav>
  );
};
