
import './App.css';

import React, { useEffect, useState } from 'react'
import UserTable from './components/UserTable';
import { Oval } from 'react-loader-spinner'
import Pagination from './components/Pagination';


function App() {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [pageNo, setPageNo] = useState(0)
  const [patchData, setPatchData] = useState({})
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [id, setId] = useState(0)

  useEffect(() => {
    try {
      fetch(`http://localhost:3005/?page=${pageNo}`)
        .then(response => response.json())
        .then(data => {
          setData(data.users)
          setLoading(false)
        })
    } catch (e) {
      console.log(`error in client fetching data : ${e}`)
    }

  }, [pageNo])

  useEffect(() => {
    if (id !== 0) {
      const { value, updated_at } = patchData

      updateToDataBase(id, value, updated_at)
    }
  }, [id])

  const onPageChange = (pageNo) => {
    setPageNo(pageNo)
  }


  const updateToDataBase = (id, value, updated_at) => {
    console.log(`in updateToDataBase _id :  ${id}`)
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ "email": value, "updated_at": updated_at })
    }
    fetch(`http://localhost:3005/:${id}`, requestOptions)
      .then(response => console.log("updated to database"))
      .catch(error => console.log(`Error in updateToDataBase ${error}`))
  }

  const updateMyData = (rowIndex, columnId, value) => {

    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index, old) => {
        if (index === rowIndex) {
          // setting the id of edited user email
          setId(old[rowIndex]._id)


          const d = new Date()
          // could be made as a separate function
          var date_format_str = d.getFullYear().toString() + "-" + ((d.getMonth() + 1).toString().length === 2 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1).toString()) + "-" + (d.getDate().toString().length === 2 ? d.getDate().toString() : "0" + d.getDate().toString()) + " " + (d.getHours().toString().length === 2 ? d.getHours().toString() : "0" + d.getHours().toString()) + ":" + ((parseInt(d.getMinutes() / 5) * 5).toString().length === 2 ? (parseInt(d.getMinutes() / 5) * 5).toString() : "0" + (parseInt(d.getMinutes() / 5) * 5).toString()) + ":00";

          setPatchData({ "email": value, "updated_at": date_format_str })

          return {

            ...old[rowIndex],

            [columnId]: value,

            updated_at: date_format_str,

          };
        }
        return row;
      })
    );
  };


  return (
    <div className="App">
      {isLoading ? <Oval height={100} width={100} color="grey" ariaLabel='Loading' /> :
        <div>
          <UserTable
            data={data}
            setData={setData}
            updateMyData={updateMyData}
            skipPageReset={skipPageReset}
          />
          <Pagination itemsPerPage={8} totalItemsCount={100} onPageClick={onPageChange} />
        </div>

      }
    </div>
  );
}

export default App;
