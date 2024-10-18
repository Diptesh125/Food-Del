import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({url}) => {


  const [ list,setList ] = useState([])

  const fetchList = async () => {
    //api call
    const response = await axios.get(`${url}/api/food/list`)
    // console.log(response.data); it is just for checking
    if (response.data.success) {
      //Our response data will be saved in the setList variable
      setList(response.data.data)
    }else {
      toast.error("Error")
    }
  }

  // Removing the food
  const removeFood = async(foodId) =>{
    // console.log(foodId); it is just for checking

    //removing from the database using axios
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)
    }else {
      toast.error("Error")
    }
  }


  //we have to run the fechList function whenever the page is loaded
  useEffect(() => {
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
        <p>All Foods List</p>
        <div className='list-table'>
            <div className="list-table-format title">
              <b>Image</b>
              <b>Name</b>
              <b>Category</b>
              <b>Price</b>
              <b>Action</b>
            </div>
            {/* here we will pass the individual item and index of them */}
            {list.map((item,index)=>{
                return (
                  <div key={index} className='list-table-format'> 
                      <img src={`${url}/images/`+item.image} alt="" />
                      <p>{item.name}</p>
                      <p>{item.category}</p>
                      <p>${item.price}</p>
                      <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
                  </div>
                )
            })}
        </div>
    </div>
  )
}

export default List