import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./modal.scss"
import { useNavigate } from 'react-router-dom';



export const PageModal=({
    open,
    state,
    setState,

    
})=>{
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: `4px solid ${state.isError?"red":"#F9D641"}`,
    borderRadius:5,
    boxShadow: 24,
    p: 4,
    boxSizing:"border-box"
  };
  const buttonArea = {
    boxSizing:"border-box",
    width: "100%",
    display:"flex",
    alignItems:"flex-end",
    bgcolor: 'background.paper',
    p: 0,
  };
  let navigate=useNavigate()
  const handleClose = () => {
    navigate(state.route)
    setState({...state,visible:false})};
  const handleCloseWithout = () => {
    
    setState({...state,visible:false})};

  const handleFunctionAll=(e)=>{
    setState({...state,visible:false})
    state.handleFunction(e,state)
  };
  

  return (
    <div className='modal'>
      
      <Modal
        className="area"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade 
        className='fade'
        in={open}>
          <Box 
          className='box'
          sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {state.title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {state.infoText}
            </Typography>
            {state.isInfo?
            <Box sx={buttonArea}>
            <Button 
            onClick={handleClose}>Tamam</Button>
            </Box>
            :<div
            className='button-area'>
                <Button onClick={handleCloseWithout}>Vazgeç</Button>
                <Button onClick={handleFunctionAll}>{state.functionText}</Button>
            </div>
            }
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}