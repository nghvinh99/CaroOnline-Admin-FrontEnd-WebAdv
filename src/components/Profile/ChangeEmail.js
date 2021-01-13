import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import { changeEmail } from '../../features/admin/adminSlice';
import { useState } from 'react';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ChangPassword({ open, handleClose, userId }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [snack, setSnack] = useState(false);
  const [blank, setBlank] = useState(false);
  const [warn, setWarn] = useState(false);

  const validateEmail = (email) => {
    var re = /\S+@\S+/;
    return re.test(email);
  }

  const handleConfirm = () => {
    if (!email) {
      setBlank(true);
      return;
    }
    if (!validateEmail(email)) {
      setWarn(true);
      return;
    }
    const info = {
      email: email,
      id: userId
    }
    dispatch(changeEmail(info));
    handleDialogClose();
    handleSnackBarOpen();
  }

  const handleSnackBarOpen = () => {
    setSnack(true);
  }

  const handleSnackBarClose = () => {
    setSnack(false);
    setBlank(false);
    setWarn(false);
  }

  const handleDialogClose = () => {
    setEmail('');
    handleClose();
  }

  const handleInput = (event, setter) => {
    setter(event.target.value);
  }

  return (
    <div>
      <Snackbar open={snack} autoHideDuration={3000} onClose={handleSnackBarClose}>
        <Alert onClose={handleSnackBarClose} severity="success">
          Email changed successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={warn} autoHideDuration={3000} onClose={handleSnackBarClose}>
        <Alert onClose={handleSnackBarClose} severity="error">
          Invalid email format!
        </Alert>
      </Snackbar>
      <Snackbar open={blank} autoHideDuration={3000} onClose={handleSnackBarClose}>
        <Alert onClose={handleSnackBarClose} severity="error">
          Email must not blank!
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title">Change password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter new email
          </DialogContentText>
          <TextField
            autoFocus margin="dense"
            label="New email" type="email"
            onChange={(event) => handleInput(event, setEmail)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}