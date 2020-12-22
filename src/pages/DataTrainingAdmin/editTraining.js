import React from 'react'
import {Button,Dialog, DialogTitle, TextField,DialogContent,DialogActions} from "@material-ui/core"

const EditTraining = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
      };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog classname="loginDialog" open={open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" id="penyakit" label="penyakit" type="text" fullWidth />
                    <TextField autoFocus margin="dense" id="gejala" label="gejala" type="text" fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleClose} color="primary">
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditTraining
