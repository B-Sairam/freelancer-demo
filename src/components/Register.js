import { useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { DataState } from '../context/Provider';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constant';
import axios from 'axios';


const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  

 // =========states==========
  const [name,setName] = useState();
  const [email,setEmail]=useState();
  const[userType,setUserType] = useState();
  const [password,setPassword]=useState();
  const [rePassword,setRepassword]=useState();
  const [loading,setLoading]=useState(false);


  let loginHandler=async()=>{
    
    setLoading(true)
     if(!email||!password||!rePassword||!name||!userType){
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
    setLoading(false)
     }else if(password!==rePassword){
      toast({
        title:"Password not matched",
        status:"warning",
        duration:3000,
        isClosable:true,
        position:"top"
    });
    setLoading(false)
     }else{
      try {
         const config = {
           headers :{
            "Content-type":"application/json",
           }
         }
         const {data}= await axios.post(`${BASE_URL}users/register`,{name,email,userType,password},config);
         toast({
          title:"Account created successfull",
          status:"success",
          duration:3000,
          isClosable:true,
          position:"top"
         });
        
        console.log(data);
        setLoading(false)
        navigate('/')

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
    <input type={'email'} value={name} className="form-control" id="floatingName"onChange={(e)=>setName(e.target.value)} placeholder="Name" />
    <label for="floatingName">Name</label>
    </div>
    <div className="form-floating mb-3">
    <input type={'email'} value={email} className="form-control" id="floatingInput"onChange={(e)=>setEmail(e.target.value)} placeholder="Email address" />
    <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating mb-3">
    <input type={"text"} value={password} className="form-control" id="floatingPassword" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
    <label for="floatingPassword">Password</label>
    </div>
    <div class="form-floating mb-3">
    <input type={"text"} value={rePassword} className="form-control" id="floatingrPassword" onChange={(e)=>setRepassword(e.target.value)}placeholder="Confirm Password" />
    <label for="floatingrPassword">Confirm Password</label>
    </div>
    
    <div className="check-box">
    <div class="form-check">
      <input class="form-check-input" type="radio" name="flexRadioDefault" onChange={()=>setUserType("seller")} id="flexRadioDefault1"/>
      <label class="form-check-label" for="flexRadioDefault1">
       Seller
      </label>
    </div>
    <div>OR</div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="flexRadioDefault" onChange={()=>setUserType("customer")} id="flexRadioDefault2"/>
      <label class="form-check-label" for="flexRadioDefault2">
       Customer
       </label>
    </div>
      
      
   </div>
   <div className='d-grid col-5 mx-auto mt-4'>
      <button className='btn btn-primary'onClick={()=>loginHandler()}>
      {loading? "Loading...":"Register"}
    </button>
      </div>
      <Link to='/'><p className='mt-3 text-primary'>Already Have an account?</p></Link>
    </div>
  </div>
  </>
}

export default Register;