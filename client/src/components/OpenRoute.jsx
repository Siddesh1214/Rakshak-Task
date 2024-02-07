import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

function OpenRoute({ children }) {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.profile);

  if (token === null) {
    return children
  } else {
    return(<Navigate to='/login'/>)
  }
  
}

export default OpenRoute