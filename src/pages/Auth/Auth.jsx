import PropTypes from "prop-types";
import "./Auth.css";

export default function Auth({ children }) {
  return <section className="auth-form">{children}</section>;
}

Auth.propTypes = {
  children: PropTypes.node,
};
