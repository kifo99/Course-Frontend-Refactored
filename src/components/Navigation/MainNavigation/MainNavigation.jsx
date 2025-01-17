import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import MobileToggle from "../MobileToggle/MobileToggle";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

import "./MainNavigation.css";

export default function MainNavigation({ isAuth, onOpenMobileNav, onLogout }) {
  return (
    <nav className="main-nav">
      <MobileToggle onOpen={onOpenMobileNav} />
      <div className="main-nav__logo">
        <NavLink to="/">
          <Logo />
        </NavLink>
      </div>
      <div className="spacer" />
      <ul className="main-nav__items">
        <NavigationItems isAuth={isAuth} onLogout={onLogout} />
      </ul>
    </nav>
  );
}

MainNavigation.propTypes = {
  isAuth: PropTypes.bool,
  onOpenMobileNav: PropTypes.func,
  onLogout: PropTypes.func,
};
