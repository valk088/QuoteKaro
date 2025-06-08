import React from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import MyEstimatesMainn from '../Components/MyEstimatesMainn'
function MyEstimates() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
     
      <div className="flex md:flex-row flex-col md:h-screen">
        <Sidebar />
        <MyEstimatesMainn/>
      </div>
    </div>
  )
}

export default MyEstimates
