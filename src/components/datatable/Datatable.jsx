import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import "./datatable.scss"
import { async } from '@firebase/util';
import { getDoc, query, where } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase.config';
import userEvent from '@testing-library/user-event';
import { statues } from '../data/statues';



function Datatable({data}) {

  let TLLocale = Intl.NumberFormat('tr-TR');
  return (

    <div className='tableParent'>

    
 <TableContainer
    className='tableContainer'
    component={Paper}
    >
      <Table 
      
      sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead style={{backgroundColor:"black",}}>
          <TableRow>
            <TableCell 
            className='headerCell'
            width={'5%'}
            align="center">NO</TableCell>
            <TableCell
            width={"10%"}
            className='headerCell'
            align="center">Teklif ID</TableCell>
            <TableCell
            width={'10%'}
            className='headerCell'
            align="center">KATEGORİ</TableCell>
            <TableCell
            width={'10%'}
            className='headerCell'
            align="center">TARİH/ZAMAN</TableCell>
            <TableCell
            width={'10%'}
            className='headerCell'
            align="center">ADRES BİLGİLERİ</TableCell>
            <TableCell
            width={'10%'}
            className='headerCell'
            align="center">FİYAT</TableCell>
            <TableCell
            width={'8%'}
            className='headerCell'
            align="center">DURUM</TableCell>
            <TableCell
            width={'8%'}
            className='headerCell'
            align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,id) => {
            var array=row.Offers;
            var index=array.findIndex(i=>i.firm===auth.currentUser.uid)
            var priceelement=array[index]
    
    var otherAccepted=(row)=>{return row.interestedFirms.includes(auth.currentUser.uid)&&row.Offers.filter(i=>i.firm===auth.currentUser.uid).length<1}
           return(
          <TableRow
          className='tableRowDataContainer'
              key={id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell
              width={"5%"}
              className="textCell"
              align="center">{id+1}</TableCell>
              <TableCell 
               width={"10%"}
               className="textCell"
              align="center">{row.id}</TableCell>
              <TableCell 
              width={"10%"}
              className="textCell"
              align="center">{row.mainWish}</TableCell>
              <TableCell
              width={"10%"}
              className="textCell"
              align="center">{new Date(row.createdAt.seconds*1000).toLocaleDateString()}</TableCell>
              <TableCell 
              width={"10%"}
              className="textCell"
              align="center">{row.city} / {row.region}</TableCell>
              <TableCell
               width={"8%"}
              className='textCell dropdownable'
              align="center">
                <div>
                {priceelement?TLLocale.format(priceelement.totalPrice)+" ₺":<span>****₺</span>}
                 
                </div>
                

              </TableCell>
             
              <TableCell id='actionCell' align="center">
                
                {!otherAccepted(row)?<div className={`statue ${statues[row.statue].class}`}>{statues[row.statue].label}</div>:<h3>Başka Firma Onaylandı</h3>}
                
               </TableCell>
              <TableCell id='actionCell' align="right">
                
                
                    {!otherAccepted(row)&&<Link 
                    className='Link'
                    to={`/kesiflerim/${row.id}`} state={row}>
                      <div className='viewButton'>

                      </div>
                    Görüntüle
                    </Link>}
                
              </TableCell>
            </TableRow>
           ) 
            
          }
          
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default Datatable