import { Link, NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { logout } from "../services/authService";

export const Header = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
      
      logout();
      navigate("/login");
    
    }

    return (
        <header>
          <nav className="bg-white border-b-2 border-gray-200 py-2 dark:bg-gray-900 dark:border-b-1 dark:border-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              
              <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                  
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Customer APP</span>
              </Link>
              <div className="flex md:order-2">
                
                
                <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
              </div>
    
              <div className={` items-center justify-between w-full md:flex md:w-auto md:order-1`} id="navbar-search">
                  
    
                  <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                      <NavLink to="/" className="" end>Home</NavLink>
                    </li>
                    <li>
                      <NavLink to="/" className="">Customer List</NavLink>
                    </li>
                    <li>
                      <NavLink to="/add" className="">Add Customer</NavLink>
                    </li>

                    <li>
                      <NavLink onClick={ handleLogout } to="/login" className="">Logout</NavLink>
                    </li>
                    
                  </ul>
                </div>
              </div>
          </nav>
        </header>
      )
}
