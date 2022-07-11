import  React,{useEffect,useState} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';

import { Input } from 'antd';
import Sidebar from '../Sidebar/Sidebar';
import { InputBase } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};



export default function Inventory() {
    const [category,setCategry] = useState([])
    const [company,setCompnyname] = useState([])
    const [age, setAge] = React.useState('');
    const [page, setPage] = React.useState(2);
    const [ismodelvisible,setIsmodelvisible]=useState(false)
    const [ismodelvisible1,setIsmodelvisible1]=useState(false)
    const [state,setState] = useState({
      name:'',
      comp:'',
      cat:''
  })
    const [lowstock,setLowstock]=useState({
      itemname:"",
      quantity:0
    })
    const [excessstock,setExcessstock]=useState({
      itemname:"",
      quantity:0
    })
    
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [total,setTotal]=useState(0);
  const [editdata,setEditdata]=useState({
    itemname:"",
    quantity:0,
    itemprice:0
  


})
  const [data,setData]=useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
const calcualateTotal=(data)=>{
  let totl=0
  console.log("data"+JSON.stringify(data))
    data.map((ele)=>{
        totl=totl+(parseInt(ele.quantity)*parseInt(ele.itemprice));
        if(ele.quantity<5)
        {
            setLowstock({
              itemname:ele.itemname,
              quantity:ele.quantity
            })
        }
        if(ele.quantity>100)
        {
          setExcessstock({
              itemname:ele.itemname,
              quantity:ele.quantity
          })
        }
    })
    console.log(totl)
    setTotal(totl)
    

}
const handleChange=(e)=>{
  setState({...state,[e.target.name]:e.target.value})
}
  useEffect( ()=>{
    axios.get(`http://localhost:4000/stock/getstock/?name=${state.name}&company=${state.comp}&category=${state.cat}`).then(response=>{
        console.log(response.data)
        setData(response["data"].data)
       calcualateTotal(data)
    }
    ).catch(err=>{
        console.log(err)
    })
},[state])
const handleEditChange=(event)=>{
  setEditdata({...editdata,[event.target.name]:event.target.value})
}
const EditData=(data)=>{
setEditdata({
  itemname:data.itemname,
  quantity:data.quantity,
  itemprice:data.itemprice,
  
  _id:data._id
})
showmodal()
}
const deletedata=(id)=>{
  axios.delete(`http://localhost:4000/stock/delete/${id}`).then(response=>{
    console.log("data deleted")
  }).catch(err=>{
    console.log(err)
  })
  
}
const handleok=()=>{
  axios.put(`http://localhost:4000/stock/edit`,editdata).then(response=>{
    console.log("updated")
    setIsmodelvisible1(!ismodelvisible1)
  }).catch(err=>{
    console.log(err)
  })
setIsmodelvisible(false)
}
const showmodal=()=>{
  setIsmodelvisible(true)
}
const handleCancel = () => {
  setIsmodelvisible(false);
};

useEffect(()=>{
  axios.get("http://localhost:4000/addlist/getcat").then(res=>{
console.log(res.data.data[0].category)
setCategry(res.data.data[0].category)
setCompnyname(res.data.data[0].companyname)

  }).catch(err=>{
    console.log(err)
  })
 },[])

  console.log(state)
  return (
    <>
       <Stack direction='row' spacing={2} justifyContent='space-between'>
        <Sidebar/>
        <Box sx={{backgroundColor:'white',marginTop:'20px',height:'660px'}} flex={4}> 
            <div style={{ height:'50px',display:'flex',flexDirection:'row',marginTop:'10px',marginLeft:'100px',justifyContent:'space-between'}}>
    <h2 style={{color:'blue'}}> INVENTORY</h2>  
    </div>
    <div style={{height:'50px',display:'flex',flexDirection:'row',justifyContent:'space-around',marginTop:'20px'}}>
     
    <Box sx={{width:'200px',height:'50px'}}>
      <FormControl fullWidth>
         <InputBase name='name' value={state.name} onChange={handleChange} sx={{border:'1px solid black'}} placeholder='Enter item name' />
      </FormControl>
    </Box>
    <Box sx={{width:'200px'}}>
    <FormControl sx={{ minWidth: 200 }} size="small">
               <InputLabel id="demo-simple-select-label">Category of Item</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        // label="Age"
                         name='cat'
                         value={state.cat}
                         onChange={handleChange}
                    >
                       {category.map((ele)=>{
                         return <MenuItem value={ele.category}>{ele.category}</MenuItem>
                      })}
                    </Select>
                    </FormControl>
    </Box>
    <Box sx={{width:'200px'}}>
    <FormControl sx={{ minWidth: 200 }} size="small">
               <InputLabel id="demo-simple-select-label">Company of Item</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        // label="Age"
                         name='comp'
                         value={state.comp}
                         onChange={handleChange}
                    >
                       {company.map((ele)=>{
                         return <MenuItem value={ele.companyname}>{ele.companyname}</MenuItem>
                      })}
                    </Select>
                    </FormControl>
    </Box>
    </div>
    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',marginTop:'20px'}}>
    <div style={{display:'flex',marginLeft:'100px',marginTop:'20px'}}>
    <Stack spacing={2} direction="row">
     
      <Button variant="contained">ADD ITEMS</Button>
      <Button variant="contained">UPDATE STOCK</Button>
      
     
    </Stack>
    </div>
    <div style={{marginLeft:'10px',height:'50px',color:'blue'}}>
    <Stack spacing={0} direction="row">
     
    <Button variant="outlined" >STOCK VALUE<br/>{total}</Button>
    <Button variant="outlined" >{lowstock.itemname}<br/>{lowstock.quantity}</Button>
    <Button variant="outlined" >{excessstock.itemname}<br/>{excessstock.quantity}</Button>
    <Button variant="outlined" disabled>INVENTORY<br/>DASHBOARD</Button>
      
     
    </Stack>
    </div>
    </div>
    
    <Modal
        open={ismodelvisible}
        onClose={handleCancel}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
        <p><Input placeholder="Name" name='itemname' value={editdata.itemname}  onChange={handleEditChange} /></p>
        <p><Input placeholder="price"   name='itemprice' value={editdata.itemprice} onChange={handleEditChange} /></p>
        <p><Input placeholder="quantity" name='quantity' value={editdata.quantity}  onChange={handleEditChange} /></p>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleok}>Ok</Button>
        </Box>
       
      </Modal>
    <div style={{marginTop:'20px'}}>
    <TableContainer component={Paper}>
    
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          
          <TableRow>
            <StyledTableCell>ITEM ID</StyledTableCell>
            <StyledTableCell align="right">ITEM NAME</StyledTableCell>
            <StyledTableCell align="right">CATEGORY</StyledTableCell>
            <StyledTableCell align="right">CURRENT STOCK</StyledTableCell>
            <StyledTableCell align="right">UNIT</StyledTableCell>
            <StyledTableCell align="right">PRICE</StyledTableCell>
            <StyledTableCell align="right">TYPE</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">delete</StyledTableCell>
            
          </TableRow>
         
        </TableHead>
        <TableBody>
          {data.map((row) => (
            // <StyledTableRow key={row.itemid}>
                    <TableRow>
              <StyledTableCell align="right">{row.itemid}</StyledTableCell>
              <StyledTableCell align="right">{row.itemname}</StyledTableCell>
              <StyledTableCell align="right">{row.category}</StyledTableCell>
              <StyledTableCell align="right">{row.quantity}</StyledTableCell>
              <StyledTableCell align="right">{row.unit}</StyledTableCell>
              <StyledTableCell align="right">{row.itemprice}</StyledTableCell>
              <StyledTableCell align="right">{row.itemtype}</StyledTableCell>
              <StyledTableCell align="right"> <Button  onClick={()=>EditData(row)}>Edit </Button></StyledTableCell>
              <StyledTableCell align="right"><Button  onClick={()=>deletedata(row._id)}>delete</Button></StyledTableCell>
              </TableRow>
                   ))}
            {/* </StyledTableRow> */}
     
        </TableBody>
      </Table>
      
    </TableContainer>
    <div style={{marginLeft:'70%'}}>
    <TablePagination
      component="div"
      count={100}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </div>
    </div>
        </Box>
        </Stack>
 
    </>
  );
}