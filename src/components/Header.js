import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { DataState } from '../context/Provider';

const Header = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [profileview,setProfileview] = useState(false);
    const {user,setUser} = DataState();

    function logout(){
        localStorage.removeItem('user');
        setUser('');        
        navigate('/')
        toast({
          title:"You were logout",
          status:"warning",
          duration:3000,
          isClosable:true,
          position:"top"
      });
    }
  return <>
    <div className='head'>
    <div>
        <h1 class="navbar-brand fs-2 text-dark">Freelancer</h1>
    </div>
    <div>

              <Menu>
                 <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                    <Avatar size="sm"
                     cursor="pointer"
                      src={user?user.img:""}
                      />  
                 </MenuButton>
                 <MenuList>
                   <MenuItem onClick={()=>setProfileview(true)}> My Profile</MenuItem>
                   {/* {
                     user.userType=="client"?<MenuItem onClick={()=>navigate('/admin')}>Project applied</MenuItem>:""
                   } */}
                    <MenuItem onClick={()=>logout()}>LogOut</MenuItem>
                 
                 {
                   
                 }
                 </MenuList>
                 </Menu>
    </div>
    </div>
    {/* popup */}
    <div className={profileview?'profile':"disable"}>
    <div style={{display:"flex",justifyContent:"space-between",width:"90%",margin:"auto",padding:"10px"}}>
    <h2 className='fs-4'>Profile</h2>
    <button onClick={()=>setProfileview(false)}><i class="fa-solid fa-x"></i></button>
    
    </div>
    <hr></hr>
        <div className='profile-body'>
        <img src={user.img} alt="profile"/>
        <h3 className='p-2 fw-bold fs-5 '>{user.name}</h3>
        <span ></span>
        <span className="badge bg-primary fs-6">{user.userType}</span>
        </div>
        
  </div>
  </>
}

export default Header;