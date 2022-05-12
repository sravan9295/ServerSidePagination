
import './App.css';

import React, { useEffect, useState } from 'react'
import PaginatedItems from './components/Pagination';
import { UserTable } from './components/UserTable';
import { Oval } from 'react-loader-spinner'

//  
function App() {
  const [isLoading, setLoading] = useState(true)
  const [results, setResults] = useState({})
  const [pageNo, setPageNo] = useState(0)

  // function fetchData() {
  //   const url = `http://localhost:3005/?page=${pageNo}`
  //   fetch(url)
  //     .then(response => response.json())
  //     .then()
  //   const data = await response.json()
  //   return data.userData
  // }

  // useEffect(async () => {
  //   const data = await fetchData()
  //   setResults(data)
  // }, [pageNo])

  useEffect(() => {
    fetch(`http://localhost:3005/?page=${pageNo}`)
      .then(response => response.json())
      .then(data => {
        //console.log(typeof data)
        setResults(data.usersData)
        setLoading(false)
        console.log(`userData : ${data.usersData}`)
      })
  }, [pageNo])


  const onPageChange = (pageNo) => {
    setPageNo(pageNo)
    console.log(`page no clicked ${pageNo}`)

  }

  return (
    <div className="App">
      { }

      {/*results.data.map(each => <p>each.first_name</p>) */}
      {/* {results.totalUsers}
      {results.data}
      {results.data ? <UserTable tableData={results.data} /> : null} */}
      {isLoading ? <Oval height={100} width={100} color="grey" ariaLabel='Loading' /> :
        <div>
          <UserTable tableData={results} />
          <PaginatedItems itemsPerPage={10} totalItemsCount={100} onPageClick={onPageChange} />
        </div>

      }
    </div>
  );
}

export default App;
