"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { CiDark, CiLight } from 'react-icons/ci';
import { FaBars, FaChevronDown, FaTimes, FaSearch } from 'react-icons/fa';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';

const Header = () => {
  const [theme, setTheme] = useState('light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activitiesOpen, setActivitiesOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const mobileMenuRef = useRef(null);
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        setTheme(storedTheme);
        document.documentElement.classList.add(storedTheme);
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.add(newTheme);
    document.documentElement.classList.remove(theme);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setActivitiesOpen(false); // Close activities dropdown when menu is toggled
  };

  const toggleActivities = () => {
    setActivitiesOpen(!activitiesOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(!!localStorage.getItem('accessToken'));
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search logic here
      console.log('Search Query:', searchQuery);
      setSearchQuery('');
    }
  };

  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-blue-500 shadow-md shadow-blue-400 dark:shadow-green-400">
      <nav className="relative px-4 flex justify-between items-center bg-white dark:bg-gray-800">
        <Link href="/" legacyBehavior>
          <a className="text-3xl font-bold leading-none">
            <img src='/logo.png' alt='logo' className='h-[80px] rounded-[50%]' />
          </a>
        </Link>
        <div className="lg:hidden flex">
          <div className="flex items-center">
            {isSearchVisible ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button type="submit" className="ml-2 text-sm text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">
                  <FaSearch />
                </button>
                <button type="button" className="ml-2 text-sm text-gray-800 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400" onClick={toggleSearchBar}>
                  <FaTimes />
                </button>
              </form>
            ) : (
              <button type="button" className="text-sm text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400" onClick={toggleSearchBar}>
                <FaSearch />
              </button>
            )}
          </div>

          <button onClick={toggleTheme} className="mr-4 text-gray-900 dark:text-gray-100">
            {theme === 'light' ? <CiDark size={24} /> : <CiLight size={24} />}
          </button>

          <button className="navbar-burger flex items-center text-blue-600 p-3" onClick={toggleMenu}>
            <FaBars className="block h-4 w-4 fill-current text-gray-900 dark:text-gray-100" />
          </button>
        </div>

        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
          <li><Link href="/" legacyBehavior><a className="text-sm text-gray-800 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-300 whitespace-nowrap">Home</a></Link></li>
          <li className="text-gray-300"></li>
          <li><Link href="/market" legacyBehavior><a className="text-sm text-gray-800 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-300 whitespace-nowrap">Market</a></Link></li>
          <li className="text-gray-300"></li>
          <li><Link href="/depositbonous" legacyBehavior><a className="text-sm text-gray-800 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-300 whitespace-nowrap">Deposit Bonus</a></Link></li>
          <li className="text-gray-300"></li>
          <li><Link href="/investmenthall" legacyBehavior><a className="text-sm text-gray-800 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-300 whitespace-nowrap">Investment Hall</a></Link></li>
          <li className="text-gray-300"></li>
          <li className="relative text-sm text-gray-800 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-300">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="text" className="flex items-center text-sm text-gray-800 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-300">
                  Activities<FaChevronDown className="ml-1" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Activities" className="top-full p-4 bg-white dark:text-white dark:bg-gray-800 border rounded shadow-lg">
                <DropdownItem key="deposit" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => window.location.href = '/deposit'}>
                  Deposit
                </DropdownItem>
                <DropdownItem key="withdraw" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => window.location.href = '/withdraw'}>
                  Withdraw
                </DropdownItem>
                <DropdownItem key="history" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => window.location.href = '/history'}>
                  History
                </DropdownItem>
                <DropdownItem key="profit" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => window.location.href = '/profit'}>
                  Personal Data
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
          <li className="text-gray-300"></li>
          <li><Link href="/about" legacyBehavior><a className="text-sm text-gray-800 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-300">About</a></Link></li>
          <li className="text-gray-300"></li>
          <li>
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <input
                type="text"
                className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type="submit" className="ml-2 text-sm text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">
                <FaSearch />
              </button>
            </form>
          </li>
          <li className="text-gray-300"></li>
          <button onClick={toggleTheme} className="ml-4 text-gray-900 dark:text-gray-100">
            {theme === 'light' ? <CiDark size={24} /> : <CiLight size={24} />}
          </button>
        </ul>

        {isLoggedIn ? (
          <div className='hidden lg:flex lg:items-center lg:ml-auto mr-20 cursor-pointer relative' ref={profileDropdownRef}>
            <div onClick={toggleProfileDropdown}>
              <img src='/profile.png' className='w-10 h-10 rounded' alt="profile" />
              {profileDropdownOpen && (
                <ul className="absolute top-full p-2 bg-white dark:text-white dark:bg-gray-800 border rounded shadow-lg">
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"><Link href="/profile" legacyBehavior><a onClick={toggleProfileDropdown}>Profile</a></Link></li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"><Link href="/logout" legacyBehavior><a onClick={toggleProfileDropdown}>Logout</a></Link></li>
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex lg:items-center lg:ml-auto mr-3">
            <Link href="/login" legacyBehavior>
              <a className="py-2 px-6 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm text-gray-900 dark:text-gray-100 font-bold rounded-xl transition duration-200 mr-3" onClick={toggleMenu}>Sign In</a>
            </Link>
            <Link href="/register" legacyBehavior>
              <a className="py-2 px-6 bg-[#6f6cee] hover:bg-[#8e7979] text-sm text-white font-bold rounded-xl transition duration-200" onClick={toggleMenu}>Sign Up</a>
            </Link>
          </div>
        )}
      </nav>

      <div ref={mobileMenuRef} className={`${menuOpen ? 'translate-x-0' : 'translate-x-full'} navbar-menu fixed top-0 right-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white dark:bg-gray-800 border-l transition-transform duration-300 z-50`}>
        <div className="flex items-center mb-8">
          {isLoggedIn ? (
            <Link href="/profile" legacyBehavior>
              <a className="mr-auto text-3xl font-bold leading-none">
                <img src='/profile.png' alt='profile' className='h-12' />
              </a>
            </Link>
          ) : (
            <Link href="/" legacyBehavior>
              <a className="mr-auto text-3xl font-bold leading-none">
                <img src='/logo.png' alt='logo' className='h-12' />
              </a>
            </Link>
          )}
          <button className="navbar-close" onClick={toggleMenu}>
            <FaTimes className="h-6 w-6 text-gray-400 dark:text-gray-100 cursor-pointer hover:text-gray-500 dark:hover:text-gray-300" />
          </button>
        </div>
        <div>
          <ul>
            <li className="mb-1">
              <Link href="/" legacyBehavior>
                <a className="block p-4 text-sm font-semibold text-gray-400 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-gray-300 rounded" onClick={toggleMenu}>Home</a>
              </Link>
            </li>
            <li className="mb-1">
              <Link href="/market" legacyBehavior>
                <a className="block p-4 text-sm font-semibold text-gray-400 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-gray-300 rounded" onClick={toggleMenu}>Market</a>
              </Link>
            </li>
            <li className="mb-1">
              <Link href="/depositbonous" legacyBehavior>
                <a className="block p-4 text-sm font-semibold text-gray-400 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-gray-300 rounded" onClick={toggleMenu}>Deposit Bonus</a>
              </Link>
            </li>
            <li className="mb-1">
              <Link href="/investmenthall" legacyBehavior>
                <a className="block p-4 text-sm font-semibold text-gray-400 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-gray-300 rounded" onClick={toggleMenu}>Investment Hall</a>
              </Link>
            </li>
            <li className="mb-1">
              <button onClick={toggleActivities} className="flex items-center w-full p-4 text-sm font-semibold text-gray-400 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-gray-300 rounded">
                Activities <FaChevronDown className={`ml-1 transition-transform ${activitiesOpen ? 'rotate-180' : ''}`} />
              </button>
              {activitiesOpen && (
                <ul className="ml-4">
                  <li className="mb-1">
                    <Link href="/deposit" legacyBehavior>
                      <a className="block p-2 text-sm font-semibold text-gray-400 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-gray-300 rounded" onClick={toggleMenu}>Deposit</a>
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link href="/withdraw" legacyBehavior>
                      <a className="block p-2 text-sm font-semibold text-gray-400 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-gray-300 rounded" onClick={toggleMenu}>Withdraw</a>
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link href="/history" legacyBehavior>
                      <a className="block p-2 text-sm font-semibold text-gray-400 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-gray-300 rounded" onClick={toggleMenu}>History</a>
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link href="/profit" legacyBehavior>
                      <a className="block p-2 text-sm font-semibold text-gray-400 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-gray-300 rounded" onClick={toggleMenu}>Personal Data</a>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="mb-1">
              <Link href="/about" legacyBehavior>
                <a className="block p-4 text-sm font-semibold text-gray-400 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-gray-300 rounded" onClick={toggleMenu}>About</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-auto">
          {isLoggedIn ? (
            <div className="pt-6">
              <Link href="/logout" legacyBehavior>
                <a className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 rounded-xl" onClick={toggleMenu}>Log out</a>
              </Link>
            </div>
          ) : (
            <div className="pt-6">
              <Link href="/login" legacyBehavior>
                <a className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl" onClick={toggleMenu}>Sign In</a>
              </Link>
              <Link href="/register" legacyBehavior>
                <a className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-[#6f6cee] hover:bg-[#8e7979] rounded-xl" onClick={toggleMenu}>Sign Up</a>
              </Link>
            </div>
          )}
          <p className="my-4 text-xs text-center text-gray-400 dark:text-gray-100">
            <span>Copyright © 2021</span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
