import "./Layout.css";
import PropTypes from "prop-types";

export default function Layout({ header, mobileNav, children }) {
  return (
    <>
      <header className="main-header">{header}</header>
      {mobileNav}
      <main className="content">{children}</main>
    </>
  );
}

Layout.propTypes = {
  header: PropTypes.node,
  mobileNav: PropTypes.node,
  children: PropTypes.node,
};
