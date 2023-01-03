
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import React,{useState} from 'react'
import { db } from '../../firebase/firebase.config'

function PriceInput({params,
    state,
    setIndexes,
    indexes,
    rows,setRows
}) {
    const [editted,setEditted]=useState(true)
    const [row,setRow]=useState({
        id:params.row.id,
        name:params.row.label,
        amount:params.row.amount,
        price:"",
        unitPrice:"",
    })
    const oldRow={id:params.row.id,name:params.row.label,amount:params.row.amount,price:"",unitPrice:""}
    const [uploading,setUploading]=useState(false)
    
    const handlePrice=(e)=>{
        var indexOfItem=state.relatedProducts.indexOf(params.row)
        var num=Number(e.target.value.replace(/\D/,'.'))
        var oldArray=rows.filter(i=>i.id!==params.row.id)
        //setRow({...row,price:num,unitPrice:row.amount*num})
        setRows([...oldArray,{...row,price:row.amount*num,unitPrice:num}])
        setIndexes({...indexes,[indexOfItem]:row.amount*num})
        
      }

      const handleEditProducts = async (item) => {
        setUploading(true)
        const docRef = doc(db, "Jobs", item.postId);
      
          
          await updateDoc(docRef, {
            relatedProducts:arrayUnion(row), 
      
        }).then(()=>updateDoc(docRef,{
            relatedProducts:arrayRemove(oldRow)
        }))
        .then(()=>setUploading(false))
        .then(()=>setEditted(false))
        .finally(()=>alert("İlgili Ürün Fiyatı Güncellendi"))
          .catch(err=>alert(err+"Bir hata meydana geldi."))
        
        
      }
      const handleProducts = () => {
        setUploading(true)
        setRows([...rows,row])
      }
    return(
        <>
            <input
            id='innerInput'
            placeholder='fiyat giriniz'
            className='priceInput'
            onFocus={()=>setEditted(true)}
            //onSubmit={()=>handleEditProducts(state)}
            //type="number"
            onChange={(e)=>handlePrice(e)}
            />
            {/* {row.price!==""&&editted&&<div 
            onClick={()=>
                {handleProducts()
                }
            }
            id='innerSave'>{uploading?"...":"Kaydet"}</div>}
            {row.price!==""&&editted&&<div 
            onClick={()=>setRow({...row,price:""})}
            id='innerCancel'>Vazgeç</div>} */}
        </>
        
    )
}

export default PriceInput