import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BASE_URL } from '../constant';
import { DataState } from '../context/Provider';

const Applied = () => {
    const [applyList,setApplyList] = useState([]);
    const {user} = DataState();
    const toast = useToast();
    useEffect(()=>{
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
    const getData = async()=>{
        try {
          let {data} = await axios.get(`${BASE_URL}getapply`);
          let temp = data.message.filter((e)=>e.clientId===user._id);
          setApplyList(temp);
        
        } catch (error) {
          toast({
            title:error.response.data,
            status:"danger",
            duration:3000,
            isClosable:true,
            position:"top"
           });
        }
      }
  return <>
  <div className='apply-main p-3'>
    <Link to="/home" className='btn btn-primary'>back</Link>
    <h1 className='text-center display-6 fw-bold p-5'>Application Info</h1>
    {
        applyList.length?<table className='table table-hover text-center'>
        <thead>
            <tr >
                <th>Project Name</th>
                <th >freelancer Name</th>
               
            </tr>
        </thead>
        <tbody>
        {
      applyList.map((e)=>{
        return <tr key={e._id} className='apply-box'>
            <td>{e.project}</td>
            <td>{e.freelancerName}</td>
        </tr>
      }) 
    }
        </tbody>
    </table>:<h1 className='display-6 text-danger text-center pt-5'>No one applied for the work !!</h1>
    }
    
    

  </div>
  </>
}

export default Applied