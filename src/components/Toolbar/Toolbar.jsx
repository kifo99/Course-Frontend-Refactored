import PropTypes from "prop-types";
import "./Toolbar.css";

export default function Toolbar({ children }) {
  return <div className="toolbar">{children}</div>;
}

Toolbar.propTypes = {
  children: PropTypes.node,
};
