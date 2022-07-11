import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch,Avatar,styled, Typography,Button } from '@mui/material'
import React, { useEffect,useState } from 'react'
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import {Link, useNavigate} from 'react-router-dom'
import HistoryIcon from '@mui/icons-material/History';
import {useSelector} from 'react-redux'

const Sidebar = () => {
  const navigate = useNavigate()
  const [user,setUser] = useState('')

 useEffect(()=>{
  setUser(JSON.parse(localStorage.getItem('token')))
 },[])

  const Search=styled('Box')({
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    margin:'20px'
})

const handleLogout=()=>{
     localStorage.removeItem('token')
     navigate('/')
}

  return (
    <Box  sx={{display:{xs:'none',sm:'block'}}} flex={1} >
      <Box position='fixed' sx={{backgroundColor:'darkblue',height:'1000px', width:'300px' ,color:'white'}}>
       <Search>
         <Typography sx={{fontFamily:'cursive',marginTop:'10px'}} >{user?.username}</Typography>
         <Typography sx={{fontFamily:'cursive',marginTop:'10px'}} >Email:{user?.email}</Typography>
         <Typography sx={{fontFamily:'cursive',marginTop:'10px',color:'yellow'}} >Type:{user?.isAdmin?"Admin":"Customer"}</Typography>
         <Box>
          <Button onClick={handleLogout} variant='contained' size='small' sx={{marginTop:'10px',marginLeft:'10px'}} color='error' >Sign Out</Button>
         </Box>
       </Search>
        {(
          ()=>{
            if(user?.isAdmin==true){
              return <>
               <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <AddCircleOutlineIcon sx={{color:'white'}} />
              </ListItemIcon>
              <Link to='/additems' className='nocss'>
               <ListItemText  primary="Add Stock" />
              </Link>   
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <Inventory2Icon sx={{color:'white'}} />
              </ListItemIcon>
              <Link  to='/inventory' className='nocss'>
               <ListItemText primary="Inventory" />
              </Link>  
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <SettingsIcon sx={{color:'white'}} />
              </ListItemIcon>
              <Link to="/settings" className='nocss'>
              <ListItemText primary="Settings" />
              </Link>
            </ListItemButton>
          </ListItem>
          
          
               </List>
                 </>
            }
            if(user?.isAdmin==false){
              return <>
               <List>
             <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <AddCircleOutlineIcon sx={{color:'white'}} />
              </ListItemIcon>
              <Link to='/buyers' className='nocss'>
               <ListItemText  primary="Home" />
              </Link>   
            </ListItemButton>
             </ListItem>
             <ListItem disablePadding>
                <ListItemButton>
              <ListItemIcon>
              <Inventory2Icon sx={{color:'white'}} />
              </ListItemIcon>
              <Link  to='/cart' className='nocss'>
               <ListItemText primary="Cart" />
              </Link>  
              </ListItemButton>
               </ListItem>
               <ListItem disablePadding>
                <ListItemButton>
              <ListItemIcon>
              <HistoryIcon sx={{color:'white'}} />
              </ListItemIcon>
              <Link  to='/history' className='nocss'>
               <ListItemText primary="Order History" />
              </Link>  
              </ListItemButton>
               </ListItem>
          
               </List>
                    </>
            }
          }
        )()}
      
         </Box>
    </Box>
  )
}

export default Sidebar
