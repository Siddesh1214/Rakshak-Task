import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { generateLiscenceNo } from '../services/authAPIs';


function Liscence() {
  const { user, token } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);



  


  
  
  const liscNo = crypto.randomUUID(10).toUpperCase().split('-').join('');
  console.log("liscNo----", user)
  

  return (
    <div className='flex flex-col items-center text-2xl font-semibold '>
      {user.attempted === true ? ( user.marks>=5 && 
        <div className='flex flex-col items-center'>
          <span>You score is {user.marks} out of 10.</span>
          <span>Congratulations! You have passed the licensing test.</span><br />
          {
            user.attempted && <button className="px-6 py-4 text-xl bg-blue-300 rounded-xl " onClick={()=>setShow(true)}>Generate liscence</button>
          }
          {
            user.attempted && <div>
              {show && <div>Your Licence Number: {user?._id}</div>}
              
            </div>
          }
          



        </div>
      ) : (<div>Attempt the test in Quiz section</div>)}
      {user.attempted === true ? ( user.marks<5 && 
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