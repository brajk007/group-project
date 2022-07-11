import React from 'react'
import {Routes,Route} from 'react-router-dom'
import AddItems from '../AddItems/AddItems'
import Inventory from '../Inventory/Inventory'
import Settings from '../Setting/Setting'

const Adminroute = () => {
  return (
    <Routes>
         <Route path='/inventory' element={<Inventory />} />
         <Route path='/settings' element={<Settings />} />
         <Route path='/additems' element={<AddItems/>} /> 
    </Routes>
  )
}

export default Adminroute
