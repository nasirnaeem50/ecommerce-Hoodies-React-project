import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./Cart";
import SearchBar from "./SearchBar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { user, isAdmin, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { wishlist } = useContext(ProductContext);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const toggleMobileSearch = () => setMobileSearchOpen(!mobileSearchOpen);

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    setMobileSearchOpen(false);
  };

  const handleLogout = () => {
    logout();
    toast.info("You have been logged out.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    closeAllMenus();
  };

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/products", text: "Products" },
    { to: "/about", text: "About Us" },
    { to: "/contact", text: "Contact" },
    { to: "/track-order", text: "Track Order" }, // Added Track Order link
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-1"
          onClick={closeAllMenus}
        >
          <img src="/assets/images/hicon.png" alt="" className="w-8 sm:w-10" />
          <h3 className="text-xl font-bold tracking-tight hidden sm:inline bg-gradient-to-r from-blue-400 via-purple-500 to-red-600 bg-clip-text text-transparent">
            HOOD.IES
          </h3>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 mx-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-500"
                    : "text-gray-600 hover:text-blue-500"
                }`
              }
              onClick={closeAllMenus}
            >
              {link.text}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-purple-600 border-b-2 border-purple-500"
                    : "text-gray-600 hover:text-purple-500"
                }`
              }
              onClick={closeAllMenus}
            >
              Admin Panel
            </NavLink>
          )}
        </nav>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <SearchBar />
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Mobile Search Button */}
          <button
            onClick={toggleMobileSearch}
            className="md:hidden p-2 text-gray-600 hover:text-white rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-110 shadow-sm"
            aria-label="Search"
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>

          {/* Wishlist Button */}
          <Link 
            to="/wishlist" 
            className="p-2 text-gray-600 hover:text-white rounded-full hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-500 transition-all duration-300 transform hover:scale-110 shadow-sm relative"
            aria-label="Wishlist"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-md animate-bounce">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Button */}
          <button
            onClick={toggleCart}
            className="relative p-2 text-gray-600 hover:text-white rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-110 shadow-sm"
            aria-label="Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-md animate-bounce">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>

          {/* User Dropdown or Login */}
          {user ? (
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-1 group focus:outline-none transition-all duration-300 hover:scale-105"
                aria-label="User menu"
                aria-expanded={isUserMenuOpen}
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium shadow-md">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                  {user.name}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                    isUserMenuOpen ? "transform rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isUserMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-100 animate-fadeIn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:text-blue-700 transition-all"
                    onClick={closeAllMenus}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/wishlist"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:text-blue-700 transition-all"
                    onClick={closeAllMenus}
                  >
                    My Wishlist
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:text-blue-700 transition-all"
                    onClick={closeAllMenus}
                  >
                    My Orders
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:text-blue-700 transition-all"
                      onClick={closeAllMenus}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100 hover:text-red-600 transition-all"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-md transition-all duration-300 transform hover:scale-105"
                onClick={closeAllMenus}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-md shadow-md transition-all duration-300 transform hover:scale-105"
                onClick={closeAllMenus}
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {mobileSearchOpen && (
        <div className="md:hidden bg-white px-4 py-2 border-t border-gray-100">
          <SearchBar />
        </div>
      )}

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slideDown">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-3 text-gray-700 rounded-md transition-colors ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "hover:text-blue-600 hover:bg-blue-50"
                  }`
                }
                onClick={closeAllMenus}
              >
                {link.text}
              </NavLink>
            ))}
            <Link
              to="/wishlist"
              className="px-4 py-3 text-gray-700 rounded-md transition-colors hover:text-pink-600 hover:bg-pink-50 flex items-center gap-2"
              onClick={closeAllMenus}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              Wishlist
              {wishlist.length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `px-4 py-3 text-gray-700 rounded-md transition-colors ${
                    isActive
                      ? "text-purple-600 bg-purple-50"
                      : "hover:text-purple-600 hover:bg-purple-50"
                  }`
                }
                onClick={closeAllMenus}
              >
                Admin Panel
              </NavLink>
            )}
            {!user && (
              <div className="flex space-x-2 pt-2 border-t border-gray-100">
                <Link
                  to="/login"
                  className="flex-1 text-center px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  onClick={closeAllMenus}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex-1 text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors"
                  onClick={closeAllMenus}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cart sidebar */}
      {isCartOpen && <Cart onClose={toggleCart} />}
    </header>
  );
};

export default Header;