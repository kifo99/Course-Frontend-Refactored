import PropTypes from "prop-types";
import "./MobileToggle.css";

export default function MobileToggle({ onOpen }) {
  return (
    <button className="mobile-toggle" onClick={onOpen}>
      <span className="mobile-toggle__bar" />
      <span className="mobile-toggle__bar" />
      <span className="mobile-toggle__bar" />
    </button>
  );
}

MobileToggle.propTypes = {
  onOpen: PropTypes.func,
};
