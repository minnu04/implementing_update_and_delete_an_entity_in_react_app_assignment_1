import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function UpdateItem() {


    const navigate = useNavigate();

    const[Data,setData]=useState({
        name:"",
        status:""
    })
    const {id}=useParams();

    useEffect(()=>{

        const fetched=async()=>{
            
          await axios.get('http://localhost:8000/doors/'+id)
            .then((response) => setData({
                name:response.data.name,
                status:response.data.status
            }))
            .catch(error => console.error('Error fetching data:', error));

            

            
        }
        fetched();
       
        },[]);
    
    
    const handleChange=((e)=>{
            setData({...Data,[e.target.name]:e.target.value})
        })
    
    const handleSubmit =async(e)=>{
          e.preventDefault()
        
            try {
            await axios.put('http://localhost:8000/doors/'+id,Data)
                setData({name:'',status:''})
                alert('Data updated')
                navigate("/")
                } catch (error) {
                    console.log(error)
                    alert('Data not update')
                }
        
    }

  return (
    <>
    <form onSubmit={handleSubmit}>

    <label >Name:</label>
    <input type="text" value={Data.name} name='name' onChange={handleChange} required/>

    <label >status:</label>
    <input type="text" value={Data.status} name='status' onChange={handleChange} required/>
    
    <button type='Submit'>update</button>
    
    </form>
    
    </>
  )
}

export default UpdateItem