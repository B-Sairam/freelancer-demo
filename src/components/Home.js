import React, { useEffect, useState } from 'react'
import { DataState } from '../context/Provider';
import axios from 'axios';
import Header from './Header';
import { BASE_URL } from '../constant';
import { useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
  const {user}= DataState();
  const [pop,setPop] = useState(false);
  const [title,setTitle]=useState('');
  const [descrip,setDescrip]=useState('');
  const [tech,setTech]=useState('');
  const [price,setPrice] = useState();
  const [dedline,setDedline]=useState('');
  const [loading,setLoading]=useState(false);
  const [project,setProject] = useState([]);
  const [task,setTask]   = useState([]);
  const toast = useToast();


  useEffect(()=>{
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const getData = async()=>{
    try {
      let {data} = await axios.get(`${BASE_URL}getProject`)
      let temp = data.message.filter((e)=>e.clientId===user._id);
      setProject(temp);
      setTask(data.message);
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


  const postHandeler = async()=>{
    let clientId = user._id;
    setLoading(true)
    if(!title||!descrip||!tech||!price||!dedline){
      toast({
        title:"Fill all the Requirements",
        status:"warning",
        duration:3000,
        isClosable:true,
        position:"top"
    });
    }else{
      try {
        const config = {
          headers:{
            "Content-type":"application/json",
          }
        }
        await axios.post(`${BASE_URL}createProject`,{title,descrip,tech,price,dedline,clientId},config)
        toast({
          title:"Project posted successfully",
          status:"success",
          duration:3000,
          isClosable:true,
          position:"top"
      });
      getData();
      setLoading(false)
      setPop(false)
      } catch (error) {
        setLoading(false)
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

  const apply = async(e)=>{
    let project,clientId,freelancerId,freelancerName;
    project = e.title;
    clientId = e.clientId;
    freelancerId= user._id;
    freelancerName= user.name;
    setLoading(true);
    try {
      const config = {
        headers:{
          "Content-type":"application/json",
        }
      }
      await axios.post(`${BASE_URL}apply`,{project,clientId,freelancerId,freelancerName},config)
      toast({
        title:"Project Apply successfully",
        status:"success",
        duration:3000,
        isClosable:true,
        position:"top"
    });
    setLoading(false)
    setPop(false)
    } catch (error) {
      setLoading(false)
      toast({
        title:error.response.data,
        status:"error",
        duration:3000,
        isClosable:true,
        position:"top"
    });
    }
    
  }
  return <>
  <Header/>
  {
    user.userType==="customer"?<div className='client'>
    <div className='d-flex justify-content-between'>
      <button className='btn btn-primary m-2'onClick={()=>setPop(true)}>Create project   <i class="fa-solid fa-plus"></i></button>
      <Link to="/applies" className='btn btn-warning m-2'>View Applied</Link>

    </div>
   
    <div className='project-list '>
    {
      project.length?project.map((e)=>{
        return <div key={e._id} className="card ">
        <div className="card-body">
           <h5 className="card-title fs-5 pb-2 fw-bold">{e.title}</h5>
           <p className="card-text"><b>Description:</b> <span className=' text-secondary'>{e.descrip}</span></p>
           <p className="card-text"><b>Technology: </b><span className='badge bg-danger'>{e.tech}</span></p>
           <p className="card-text"><span className='fw-bold'>Price: </span>Rs.{e.price}</p>
         </div>
         <div className="card-foot">
           <p className="bg-primary p-2 text-white text-center">Delivery In {e.dedline}</p>
         </div>
        </div>
        
      }):<h1 className='display-6 text-center pt-5'>Projects not Found</h1>
     }
    </div>
  </div> 
  :
  <div className='freelancer'>
     <h1 className='display-6 p-3 text-secondary'>Projects to work ({task.length})</h1>
     <div className='project-list'>
    {
      task.length?task.map((e)=>{
        return <div key={e._id} className="card ">
        <div className="card-body">
           <h5 className="card-title fs-5 pb-2 fw-bold">{e.title}</h5>
           <p className="card-text"><b>Description:</b> <span className=' text-secondary'>{e.descrip}</span></p>
           <p className="card-text"><b>Technology: </b><span className='badge bg-danger'>{e.tech}</span></p>
           <p className="card-text"><span className='fw-bold'>Price: </span>Rs.{e.price}</p>          
           <p className="card-text"><span className='fw-bold'>Delivery In: </span>{e.dedline}</p>
         </div>
         <div className="card-foot">
         <button className='btn btn-primary bg-primary text-center' onClick={()=>window.confirm(`Are you confirm for appling ${e.title}`)?apply(e):""}>
          Apply
         </button>
         </div>
        </div>
        
      }):<h1 className='display-5 text-center'>No job assinged to work</h1>
     }
    </div>
  </div>
  }
    

  {/* popup */}
  <div className={pop?'form-box':"disable"}>
    <div style={{display:"flex",justifyContent:"space-between",width:"90%",margin:"auto",padding:"10px"}}>
      <h2 className='fs-4'>Requirements for the Project</h2>
      <button onClick={()=>setPop(false)}><i class="fa-solid fa-x"></i></button>
    </div>
    <hr></hr>
    <div className='form-body'>
    <div class="m-2">
      <label for="exampleFormControlInput1" class="form-label">Project Title</label>
      <input type="text" class="form-control" onChange={(e)=>setTitle(e.target.value)} id="exampleFormControlInput1" placeholder="Project Title"/>
    </div>
    <div class="m-2">
      <label for="exampleFormControlTextarea1" class="form-label">Project decription </label>
      <textarea class="form-control" onChange={(e)=>setDescrip(e.target.value)}  placeholder='Texe here' id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
    <div class="m-2">
      <label for="exampleFormControlInput1" class="form-label">Technology</label>
      <input type="text" class="form-control" onChange={(e)=>setTech(e.target.value)}  id="exampleFormControlInput1" placeholder="Technology like 'React','Angular' .."/>
    </div>
    <div class="m-2">
      <label for="exampleFormControlInput1" class="form-label">Price:</label>
      <input type={'number'} class="form-control"onChange={(e)=>setPrice(e.target.value)}  id="exampleFormControlInput1" placeholder="Price for this Project"/>
    </div>
    <div class="m-2">
      <label for="exampleFormControlInput1" class="form-label">Expected Delivery</label>
      <input type={'date'} class="form-control" onChange={(e)=>setDedline(e.target.value)}  id="exampleFormControlInput1"/>
    </div>

    <div className='d-grid col-5 mx-auto mt-4'>
      <button className='btn btn-primary'onClick={()=>postHandeler()}>
      {loading? "Posting...":"Post"}
      </button>
    </div>
    </div>
  </div>
  </>
}

export default Home;