import React from 'react'
import "./widgets.scss"
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import GroupIcon from '@mui/icons-material/Group';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ExploreIcon from '@mui/icons-material/Explore';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Link } from 'react-router-dom';

function WidgetItem({type,list}) {
    const amount=100
    const diff=20
    let data;
        switch (type){
            case "user":
                data={
                    title:"KEŞİFLERİM",
                    to:"/kesiflerim",
                    isMoney:false,
                    link:"Hepsini gör",
                    icon:<GroupIcon className='icon'
                    style={{
                        color:"crimson",
                        backgroundColor:"rgba(255,0,0,0.2)"}}
                    />,
                    
                };
                break;
            case "firm":
                data={
                    title:"FİRMALARIM",
                    to:"/firmalarim",
                    isMoney:false,
                    link:"Hepsini gör",
                    icon:<GroupIcon className='icon'
                    style={{
                        color:"goldenrod",
                        backgroundColor:"rgba(218, 165, 32, 0.568)"}}
                    />,
                    
                };
                break;
           
            case "explore":
                data={
                    title:"KEŞİFLER",
                    to:"/kesifler",
                    isMoney:false,
                    link:"Hepsini gör",
                    icon:<ExploreIcon className='icon'
                    style={{
                        color:"purple",
                        backgroundColor:"rgba(128,0,128,0.2)"}}
                    />,
                };
                break;
            case "earning":
                data={
                    title:"CİRO",
                    isMoney:true,
                    to:"/kesiflerim",
                    link:"Hepsini gör",
                    icon:<AccountBalanceIcon className='icon'
                    style={{
                        color:"green",
                        backgroundColor:"rgba(0,128,0,0.2)"}}
                    
                    />,
                };
                break;
                default:
                    break;
        }
  return (
    
        <Link className='widget' to={data.to}>
        <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">{data.isMoney && "$"} {list.length}</span>
            <span className="link">{data.link}</span>
        </div>
        <div className="right">
            <div className="percentage positive">
                <ExpandLessIcon/>
                {diff}</div>
            {data.icon}
        </div>
        </Link>
        
    
  )
}

export default WidgetItem