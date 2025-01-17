import PropTypes from "prop-types";
import NavigationItems from "../NavigationItems/NavigationItems";
import "./MobileNavigation.css";

export default function MobileNavigation({
  open,
  mobile,
  isAuth,
  onChooseItem,
  onLogout,
}) {
  return (
    <nav className={["mobile-nav", open ? "open" : ""].join(" ")}>
      <ul className={["mobile-nav__items", mobile ? "mobile" : ""].join(" ")}>
        <NavigationItems
          mobile
          onChoose={onChooseItem}
          isAuth={isAuth}
          onLogout={onLogout}
        />
      </ul>
    </nav>
  );
}

MobileNavigation.propTypes = {
  open: PropTypes.bool,
  mobile: PropTypes.bool,
  isAuth: PropTypes.bool,
  onChooseItem: PropTypes.func,
  onLogout: PropTypes.func,
};
