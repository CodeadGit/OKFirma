import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./modal.scss"
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '4px solid #F9D641',
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

export const ErrorModal=({
    open,
    setOpen,
    isInfo,
    title,
    infoText,
    handleFunction,
    functionText,
    route
    
})=>{
  const handleClose = () => {
    navigate(route)
    setOpen(false)};
let navigate=useNavigate()
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
              {title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {infoText}
            </Typography>
            {isInfo?
            <Box sx={buttonArea}>
            <Button 
            onClick={handleClose}>Tamam</Button>
            </Box>
            :<div
            className='button-area'>
                <Button onClick={handleClose}>Vazgeç</Button>
                <Button onClick={handleFunction}>{functionText}</Button>
            </div>
            }
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}