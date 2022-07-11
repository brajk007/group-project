import './App.css';
import { Routes, Route } from 'react-router-dom'
import Setting from './components/Setting/Setting';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import BuyersNSupliers from './components/BuyersNSpuliers/BuyersNSUpliers'
import Cart from './components/Cart/Cart'
import { useSelector } from 'react-redux';
import HisTory from './components/History/History';
import Inventory from './components/Inventory/Inventory';
 import NavBar from './components/NavBar/NavBar';
 import AddItems from './components/AddItems/AddItems'
import { useEffect,useState } from 'react';
import Adminroute from './components/Adminroute/Adminroute';
import Custroute from './components/Custroute/Custroute';

function App() {
  const userInfo = useSelector(state => state)
  console.log(userInfo)
  const [token,setToken] = useState(null)
  
  useEffect(()=>{
    setToken(JSON.parse(localStorage.getItem('token')))
  },[])

  return (
    <>
    <NavBar/>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        {/* <Route path='/settings' element={<Setting />} />
         <Route path='/additems' element={<AddItems/>} /> 
        <Route path='/buyers' element={<BuyersNSupliers />} />
        <Route path='/cart' element={< Cart />} />
        <Route path='/history' element={<HisTory />} />
        <Route path='/inventory' element={<Inventory />} /> */}
      </Routes>
      {token ?.isAdmin ? <Adminroute/> :<></> }
      {!token ?.isAdmin ? <Custroute/> :<></> }

    </>
  );
}

export default App;
