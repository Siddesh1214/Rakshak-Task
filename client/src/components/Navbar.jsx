import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated, setLoading, setUser } from '../redux/slices/profileSlice';
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';


function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = async() => {
    dispatch(setLoading(true));
    await localStorage.removeItem('token');
    await localStorage.removeItem('user');
    await localStorage.removeItem('isAuthenticated');
    await localStorage.removeItem('testAttempted');
    await localStorage.removeItem('marks');
    dispatch(setUser(null));
    dispatch(setIsAuthenticated(false));
    window.location.reload();

    toast.success("Logout Successfull");
    await navigate('/login');
    


  }
  return (
  
    <div className='h-20 max-w-[1300px] mx-auto'>
      <nav className="flex items-center   justify-between h-full text-xl font-medium">
        <div className=''>
          <a href="/">LOGO</a>
        </div>
        <div className='flex items-center'>
          <Link to="/profile" className='mr-6 hover:text-gray-500 dark:hover:text-red-400 transition duration-300 ease-in-out'>Proflie</Link>
          <Link to="/quiz" className='mr-6 hover:text-gray-500 dark:hover:text-red-400 transition duration-300 ease-in-out'>Quiz</Link>
          <Link to="/liscence" className='mr-6 hover:text-gray-500 dark:hover:text-red-400 transition duration-300 ease-in-out'>Liscence</Link>
          <Link to="/editprofile" className='mr-6 hover:text-gray-500 dark:hover:text-red-400 transition duration-300 ease-in-out'>Edit Profile</Link>
          <Link to="/uploadDocs" className='mr-6 hover:text-gray-500 dark:hover:text-red-400 transition duration-300 ease-in-out'>Upload Docs</Link>
          {isAuthenticated?(<Link to="/" onClick={logoutUser} className='mr-6 hover:text-gray-500 dark:hover:text-red-400 transition duration-300 ease-in-out'>Log out</Link>):(<div></div>)}
        </div>
        
      </nav>
    </div>
  )
}

export default Navbar