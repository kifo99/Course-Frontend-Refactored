import PropTypes from "prop-types";
import "./Paginator.css";

export default function Paginator({
  currentPage,
  lastPage,
  onPrevious,
  onNext,
  children,
}) {
  return (
    <div className="paginator">
      {children}
      <div className="paginator__controls">
        {currentPage > 1 && (
          <button className="paginator__control" onClick={onPrevious}>
            Previous
          </button>
        )}
        {currentPage < lastPage && (
          <button className="paginator__control" onClick={onNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

Paginator.propTypes = {
  currentPage: PropTypes.number,
  lastPage: PropTypes.number,
  onPrevious: PropTypes.func,
  onNext: PropTypes.func,
  children: PropTypes.node,
};
