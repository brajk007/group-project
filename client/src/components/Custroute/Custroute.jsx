import React from 'react'
import {Routes,Route} from 'react-router-dom'
import BuyersNSupliers from '../BuyersNSpuliers/BuyersNSUpliers'
import Cart from '../Cart/Cart'
import HisTory from '../History/History'

const Custroute = () => {
  return (
    <Routes>
        <Route path='/buyers' element={<BuyersNSupliers />} />
        <Route path='/cart' element={< Cart />} />
        <Route path='/history' element={<HisTory />} />
    </Routes>
  )
}

export default Custroute
