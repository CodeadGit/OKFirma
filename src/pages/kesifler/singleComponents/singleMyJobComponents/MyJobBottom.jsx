import { Button, CircularProgress } from '@mui/material'
import React from 'react'
import { useApis } from '../../../../context/api.context';

const MyJobBottom = ({job,data,handleSubmit,uploading,showButton}) => {

    const {doviz} = useApis()

    const initialValue = 0;
    const sumWithInitial = data.reduce(
  (accumulator, currentValue) => accumulator + 
  (Number(currentValue.price)*Number(currentValue.adet)*Number(doviz?.[currentValue?.curr]?.satis)),
  initialValue
);
let TLLocale = Intl.NumberFormat('tr-TR');
let Dolar = Intl.NumberFormat("us-US");
// console.log(doviz);
    
  return (
    <div className="one-job-bottom">
    <div className="total-grand">Toplam (KDV Dahil) : {TLLocale.format(sumWithInitial)} ₺</div>
    <div className="one-job-buttons">
        {showButton&&<button
            disabled={uploading?true:false}
            onClick={handleSubmit}
            className='send-offer'
            style={{minWidth:150,marginTop:"1rem"}}
        >
            {uploading?<CircularProgress
                color="warning"
            />:"Teklifi Oluştur"}
        </button>}
    </div>
</div>
  )
}

export default MyJobBottom