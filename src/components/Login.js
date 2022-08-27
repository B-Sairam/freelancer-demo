import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constant';
import { DataState } from '../context/Provider';
 
const Login = () => {
  const {setUser} = DataState();
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      setUser(user);
      toast({
        title:`Welcome back ${user.name} !!`,
        status:"success",
        duration:3000,
        isClosable:true,
        position:"top"
    });
      navigate('/home');
      
    }
    // eslint-disable-next-line
  },[])

 // =========states==========
  const [email,setEmail]=useState();
  const [password,setPassword]=useState()
  const [showPass,setShowPass]=useState(false);
  const [loading,setLoading]=useState(false);

  function hidepassword(){
    if(showPass===true) setShowPass(false)
    else setShowPass(true)
  }

  let loginHandler=async()=>{
    
    setLoading(true)
     if(!email||!password){
      toast({
        title:"Fill all the Fields",
        status:"warning",
        duration:3000,
        isClosable:true,
        position:"top"
    });
    setLoading(false)
     }else if(!email.includes('@')){
      toast({
        title:"Enter valid email address",
        status:"warning",
        duration:3000,
        isClosable:true,
        position:"top"
    });
     }else{
      try {
         const config = {
           headers :{
            "Content-type":"application/json",
           }
         }
         const {data}= await axios.post(`${BASE_URL}users/login`,{email,password},config);
         toast({
          title:"Login Successfull",
          status:"success",
          duration:3000,
          isClosable:true,
          position:"top"
         });
         localStorage.setItem('user',JSON.stringify(data.user));
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
        console.log(data);
        setLoading(false)
        navigate('/home')

       } catch (error) {
        setLoading(false)
        console.log(error.response.data);
        toast({
          title:error.response.data,
          status:"error",
          duration:3000,
          isClosable:true,
          position:"top"
         });
         
       }
     }
  }
  return <>
  <div className='container'>
    <div className='login-box'>
      <p className='title'>Freelancer</p>
    <div className="form-floating mb-3">
    <input type={'email'} value={email} className="form-control" id="floatingInput"onChange={(e)=>setEmail(e.target.value)} placeholder="name@example.com"/>
    <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
    <input type={showPass?"text":"password"} value={password} className="form-control" id="floatingPassword" onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
    <label for="floatingPassword">Password</label>
    </div>
    <div className=" d-flex flexDirection-row justify-content-between  pt-2">
       <div className='form-check'> <input className="form-check-input" type="checkbox" onClick={()=>hidepassword()} id="flexCheckDefault"/>
        &nbsp;<label className="form-check-label" for="flexCheckDefault">
          Show Password 
      </label></div>
      <p  className="text-primary" onClick={()=>{
        navigate('/register')
      }}>Create new account</p>
      
   </div>
   <div className='d-grid col-5 mx-auto mt-4'>
      <button className='btn btn-primary'onClick={()=>loginHandler()}>
      {loading? "Loading...":"Login"}
    </button>
      </div>
    </div>
  </div>
  </>
}

export default Login;