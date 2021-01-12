import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../features/admin/adminSlice';
import { useState } from 'react';

export default function ChangPassword({ open, handleClose, userId }) {
  const dispatch = useDispatch();
  const [pass, setPass] = useState('');
  const [conf, setConf] = useState('');
  const handleConfirm = () => {
    if (pass === conf) {
      const info = {
        pass: pass,
        id: userId
      }
      dispatch(changePassword(info));
    }
    handleClose();
    setPass('');
    setConf('');
  }

  const handleInput = (event, setter) => {
    setter(event.target.value);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Change password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter and confirm to change your password
          </DialogContentText>
          <TextField
            autoFocus margin="dense"
            label="New password" type="password"
            value={pass} onChange={(event) => handleInput(event, setPass)}
            fullWidth
          />
          <TextField
            margin="dense" label="Confirm password"
            type="password" value={conf} onChange={(event) => handleInput(event, setConf)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
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