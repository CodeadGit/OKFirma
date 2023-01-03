import React, { useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import RelatedJobCard from '../home/relatedJobCard/RelatedJobCard'
import "./list.scss"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import RightSideBar from '../../components/RightSideBar/RightSideBar';



function List({data}) {
    
 
    const [showProduct,setShowProduct]=useState(false)
      

    return (
      <>
        <div className='list'>
        <Sidebar/>
        <div className="listContainer">
          <Navbar/>
            {data.length===0?
            <div className='empty_text'>Herhangi bir keşfiniz bulunmamaktadır.</div>
          :
          <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Talep ID</TableCell>
                      <TableCell align="right">Ana İstek</TableCell>
                      <TableCell align="right">İhitiyaç</TableCell>
                      <TableCell align="right">İstek Zamanı</TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >

                        <TableCell align="right">{row.id}</TableCell>
                        <TableCell align="right">{row.mainWish}</TableCell>
                        <TableCell align="right">{row.wishDetail.summary}</TableCell>
                        <TableCell align="right">{row.userid}</TableCell>
                        <TableCell 
                        className='dropdownable'
                        align="right">
                          <div 
                          onClick={()=>setShowProduct(pre=>!pre)}
                          className="dropdown">
                              bas
                          </div>
                          

                        </TableCell>
                      
                        <TableCell id='actionCell' align="right">
                          
                          <div className='viewButton'>
                              <Link to={`${row.id}`} state={row}>
                              Detay
                              </Link>
                          </div>
                          
                          <div className='viewButton'>
                              bAK
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
          </TableContainer>
      }
        
        
        </div>
        {/* <RightSideBar/> */}
        </div>
       
      </>
    
  )
}

export default List