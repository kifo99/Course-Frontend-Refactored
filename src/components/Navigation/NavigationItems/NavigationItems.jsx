import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "./NavigationItems.css";

const navItems = [
  { id: "feed", text: "Feed", link: "/", auth: true },
  { id: "login", text: "Login", link: "/", auth: false },
  { id: "signup", text: "Signup", link: "/signup", auth: false },
];

export default function NavigationItems({
  isAuth,
  mobile,
  onChoose,
  onLogout,
}) {
  return (
    <ul className="navigation-items">
      {navItems
        .filter((item) => item.auth === isAuth)
        .map((item) => (
          <li
            key={item.id}
            className={["navigation-item", mobile ? "mobile" : ""].join(" ")}
          >
            <NavLink to={item.link} exact onClick={onChoose}>
              {item.text}
            </NavLink>
          </li>
        ))}
      {isAuth && (
        <li className="navigation-item">
          <button onClick={onLogout}>Logout</button>
        </li>
      )}
    </ul>
  );
}

NavigationItems.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  mobile: PropTypes.bool,
  onChoose: PropTypes.func,
  onLogout: PropTypes.func,
};
