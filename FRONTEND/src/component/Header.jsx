import { Button, Navbar, TextInput, Dropdown, Avatar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineHome } from "react-icons/ai"; // Import the AiOutlineHome icon
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { FaMoon } from "react-icons/fa";
import nasaLogo from "../assets/NASA_logo.png";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate('/sign-in');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar className="border-b-2 flex justify-between items-center px-4 py-2">
      <div className="flex items-center text-black">
        <img className="hover:animate-shake animate-once mr-3 h-11 sm:h-9" src={nasaLogo} />
        <span className="font-bold text-xl tracking-tight">
          <Link to="/">SPACE DISCOVERY HUB</Link>
        </span>
      </div>

      <div className="flex gap-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        {currentUser ? (
         <Dropdown
         arrowIcon={false}
         inline
         label={
           <Avatar alt='user' img={currentUser.profilePicture} rounded />
         }
         className="dropdown-custom"
       >
         <div className="dropdown-content border border-gray-300 rounded-md shadow-md">
           <div className="header p-4 bg-white rounded-t-md">
             <span className='username text-lg font-bold text-gray-800'>{currentUser.username}</span>
             <span className='email text-sm text-gray-600 block'>{currentUser.email}</span>
           </div>
           <div className="divider border-b border-gray-300"></div>
           <div className="items">
             <Dropdown.Item 
               className="text-black hover:text-white hover:bg-gradient-to-br from-blue-500 to-purple-500" 
               onClick={handleSignout}
             >
               Sign out
             </Dropdown.Item>
           </div>
         </div>
       </Dropdown>
       
        
        
        
        ) : (
          <>
            <Link to='/sign-in'>
              <Button gradientDuoTone='purpleToBlue' outline>
                Sign In
              </Button>
            </Link>
            <Link to='/sign-up'>
              <Button gradientDuoTone='purpleToBlue' outline>
                Sign Up
              </Button>
            </Link>
          </>
        )}
        <Link to='/' style={{ marginLeft: '1rem' }}>
  <Button gradientDuoTone='purpleToBlue' outline>
    <AiOutlineHome />
  </Button>
</Link>


      </div>
    </Navbar>
  );
}
