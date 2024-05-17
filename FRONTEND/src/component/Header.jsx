import { Button, Dropdown, Avatar, Navbar } from "flowbite-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import nasaLogo from "../assets/NASA_logo.png";
import Userlogo from "../assets/user.png";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img className="h-8 w-auto" src={nasaLogo} alt="NASA" />
              <span className="font-bold text-xl text-white tracking-tight ml-2">
                <Link to="/">SPACE DISCOVERY HUB</Link>
              </span>
            </div>
          </div>
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
              <FaMoon />
            </Button>
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.91V4a2 2 0 10-4 0v1.09A6 6 0 004 11v3.159c0 .538-.214 1.055-.595 1.436L2 17h5m0 0a3.009 3.009 0 006 0m-6 0H6"
                />
              </svg>
            </button>

            {currentUser ? (
              <Dropdown
                arrowIcon={false}
                inline
                label={<Avatar alt="user" img={Userlogo} rounded />}
                className="dropdown-custom"
              >
               <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center pr-20 pl-8 py-4 px-8">
                    {/* User Image */}
                    <img
                      src={Userlogo}
                      alt="User Profile"
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    {/* User Info */}
                    <div>
                      <span className="block font-semibold text-lg text-gray-800 mb-1">
                        {currentUser.username}
                      </span>
                      {/* <span className="block text-sm text-gray-600">
                        {currentUser.email}
                      </span> */}
                    </div>
                  </div>
                  {/* Divider */}
                  <div className="border-b border-gray-300"></div>
                  {/* Items */}
                  <div className="p-4">
                    <Dropdown.Item
                      className="text-black hover:text-white hover:bg-gradient-to-br from-blue-500 to-purple-500"
                      onClick={handleSignout}
                    >
                      Sign out
                    </Dropdown.Item>
                    {/* Add more dropdown items as needed */}
                  </div>
                </div>
              </Dropdown>
            ) : (
              <>
                <Link to="/sign-in">
                  <Button
                    gradientDuoTone="purpleToBlue"
                    outline
                    className="mr-2"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button gradientDuoTone="purpleToBlue" outline>
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
            <Link to="/" className="ml-4">
              <Button gradientDuoTone="purpleToBlue" outline>
                <AiOutlineHome />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      
    </nav>
  );
}
