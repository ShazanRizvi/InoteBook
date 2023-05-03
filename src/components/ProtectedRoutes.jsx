import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = (props) => {
     const {Component}=props;
     const navigate = useNavigate()

     useEffect(()=>{
          let authToken = localStorage.getItem('token');
          console.log(authToken)
          if(!authToken){
               navigate('/login')
          }
     })
  return (
    <div>
      <Component/> 
    </div>
  )
}

export default ProtectedRoutes
