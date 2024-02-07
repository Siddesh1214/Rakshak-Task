import React from 'react'
import { apiConnector } from '../services/apiConnector'
import { useSelector } from 'react-redux'

function Quiz() {
  const { token } = useSelector((state) => state.profile);
  console.log(token);
  
  const getAll = async() => {
    const data = await apiConnector('GET', 'http://localhost:4000/api/v1/quiz/allQuizData', { Authorization: `Bearer ${token}` });


    const res = await apiConnector('GET', 'http://localhost:4000/api/v1/quiz/allQuizData', {
      Authorization: `Bearer ${token}`
    });
    
    console.log("All quiz questions", res);
    
  }
  getAll();
  return (
    <div className='max-w-[1300px] mx-auto'>Quiz</div>
  )
}

export default Quiz