import axios from "axios"
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const[empdata , setEmpData]= useState([]);
  const[paginationvalue , setPaginationValue] = useState(1);
  const[pagedata , setPageData]= useState([]);
  

  useEffect(()=>{
    performApiCall()
    .then((data)=>{
      if(data){
       
        setEmpData(data);

        const arr =data.filter((item)=>{
            return item.id <=10;
        })
        setPageData(arr);

      }
    })
    .catch((e) => {
      console.log(e.message);
    });

    

  },[]);


  const performApiCall =async()=>{
    try{
      const apidata = await axios.get(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)

      // console.log(apidata.data);
      return apidata.data;
    }
    catch(e){
        console.log(e)
        alert(e.message)
    }
    
  }

  const handlePagination=(e)=>{

    if(e.target.textContent ==="Next" && paginationvalue <5){
      const arrnext =empdata.filter((item)=>{
        return item.id > paginationvalue *10  && item.id <= (paginationvalue+1) *10;
    })
    // console.log(arrnext);
    setPageData(arrnext);
    setPaginationValue(paginationvalue+1)

    }

    if(e.target.textContent ==="Previous" && paginationvalue >1){
      const arrprevious =empdata.filter((item)=>{
        return item.id > (paginationvalue-2) *10  && item.id <= (paginationvalue-1) *10;
    })
    // console.log(arrprevious );
    setPageData(arrprevious );
    setPaginationValue(paginationvalue-1)

    }
  }

  return (
    <div className="App">
      <h2>Employee Data Table</h2>
      <table className="emptable">
      <thead>
        <tr className="tableheader">
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
        </thead>
        <tbody>
        {
          pagedata.map((item)=>{
            return(
              <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
            )
            
          })
        }
       </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePagination} >Previous</button>
        <p>{paginationvalue}</p>
        <button onClick={handlePagination}>Next</button>
      </div>

      
    </div>
  );
}

export default App;
