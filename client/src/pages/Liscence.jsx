import React from 'react'
import { useSelector } from 'react-redux';


function Liscence() {
  const { user, token } = useSelector((state) => state.profile);


  
  return (
    <div className='flex flex-col items-center'>
      {user.attempted === true ? ( user.marks>=6 && 
        <div className='flex flex-col items-center'>
          <span>You score is {user.marks} out of 10 first.</span>
          <span>Congratulations! You have passed the licensing test.</span><br /><br />
          <button className="px-6 py-4 text-xl bg-blue-300">View liscence</button>



        </div>
      ) : (<div>Attempt the test in Quiz section</div>)}
      {user.attempted === true ? ( user.marks<6 && 
        <div className='flex flex-col items-center'>
          <span>You score is {user.marks} out of 10 first.</span>
          <span>Sorry! You have not passed  the licensing test.</span><br /><br />
          <span>better luck next time</span>
          {/* <button className="px-6 py-4 text-xl bg-blue-300">View liscence</button> */}



        </div>
      ) : (<div>Attempt the test in Quiz section</div>)}
      
      
    </div>
  )
}

export default Liscence