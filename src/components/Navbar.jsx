import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../actions/loginAction";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const dispatch = useDispatch();

    const logout = (e) => {
        dispatch(logOut());
    };

  return (
        <nav>
            <div className="nav-wrapper blue">
                <span className="brand-logo">
                    <NavLink to="/home">Salary Calc</NavLink>
                </span>
                <ul className="right hide-on-med-and-down">
                    <li>
                        <NavLink 
                            className="nav-link" 
                            aria-current="page"
                            to="/home"
                        >
                        home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            className="nav-link" 
                            aria-current="page"
                            to="/calcsalary"
                        >
                        Calculadora
                        </NavLink>
                    </li>
                    <li>
                        <button 
                            className="waves-effect waves-light btn"
                            onClick={logout}
                        >
                        Finalizar Sessión
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
