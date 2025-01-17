import ReactDOM from "react-dom";
import PropTypes from "prop-types"; // Optional for prop validation
import "./Backdrop.css";

export default function Backdrop({ open, onClick }) {
  const content = (
    <div className={`backdrop ${open ? "open" : ""}`} onClick={onClick} />
  );

  const rootElement = document.getElementById("backdrop-root");

  return rootElement ? ReactDOM.createPortal(content, rootElement) : null;
}

Backdrop.propTypes = {
  open: PropTypes.bool,
  onClick: PropTypes.func,
};
