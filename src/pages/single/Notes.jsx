import React from 'react'

const Notes = ({state}) => {

    const firmNotes=state.notes.filter(i=>!i.isForAdmin)
  return (
    <ul className='note-list'>
    
        {firmNotes.map((i,index)=>{
            return(
                <li
                
                key={index}
                >
                    {i.note}
                </li>
            )
        })}
    </ul>
  )
}

export default Notes