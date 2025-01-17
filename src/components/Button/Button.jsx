import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Button.css";

export default function Button({
  design = "default", // Default styles
  mode = "default", // Default mode
  link,
  onClick,
  disabled = false,
  type = "button", // Default button type
  loading = false,
  children,
}) {
  const classNames = `button button--${design} button--${mode}`;

  if (link) {
    return (
      <Link className={classNames} to={link}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classNames}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

Button.propTypes = {
  design: PropTypes.string,
  mode: PropTypes.string,
  link: PropTypes.string, // URL for navigation
  onClick: PropTypes.func, // Click handler
  disabled: PropTypes.bool, // Disabled state
  type: PropTypes.string, // Button type: "button", "submit", etc.
  loading: PropTypes.bool, // Loading indicator
  children: PropTypes.node.isRequired, // Children content
};
