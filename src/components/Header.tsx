import React from "react";
import { NavLink, Link } from "react-router-dom";

const Header = (): JSX.Element => {
  let activeClassName =
    "cursor-pointer py-3 text-sm font-semibold text-black border-b-red-500 border-b-[3px]";

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div className="">
          <Link to="/">
            <img
              src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
              alt="logo"
              className="h-5"
            />
          </Link>
        </div>

        <div>
          <ul className="flex space-x-10">
            <li className="cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                Home
              </NavLink>
            </li>

            <li className="cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent">
              <NavLink
                to="/offers"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                Offers
              </NavLink>
            </li>

            <li className="cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent">
              <NavLink
                to="/sign-in"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                Sign-In
              </NavLink>
            </li>
          </ul>
        </div>
      </header>
    </nav>
  );
};

export default Header;
