import { NavLink, Outlet } from "react-router-dom";
import PageThree from "./PageThree";

const NavBar = () => {
  const isActive = {
    color: "red",
  };
  return (
    <>
      <div className="navBar">
        <NavLink
          style={({ isActive }) => (isActive ? { color: "red" } : undefined)}
          to="/"
        >
          Page 1
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? { color: "red" } : undefined)}
          to="/pageTwo"
        >
          Page 2
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? { color: "red" } : undefined)}
          to="/pageThree"
        >
          Page 3
        </NavLink>
      </div>
      <div className="container">
        <Outlet />
      </div>
      <PageThree />
    </>
  );
};

export default NavBar;
