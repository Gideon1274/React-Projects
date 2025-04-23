
// AddEventDialog.js
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const AddEventDialog = ({ open, onClose, onAddEvent }) => {
  const [eventName, setEventName] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [deadline, setDeadline] = useState(new Date());

  const handleSave = () => {
    onAddEvent({
      name: eventName,
      dateTime: selectedDateTime,
      deadline: deadline,
    });
    setEventName('');
    setSelectedDateTime(new Date());
    setDeadline(new Date());
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Add New Event
        <IconButton aria-label="close" onClick={onClose} sx={{ padding: 0.5 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Event Name"
          type="text"
          fullWidth
          variant="outlined"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Date and Time"
            value={selectedDateTime}
            onChange={(newValue) => setSelectedDateTime(newValue)}
            renderInput={(params) => <TextField {...params} margin="dense" fullWidth variant="outlined" sx={{ mb: 2 }} />}
          />
          <DateTimePicker
            label="Deadline (Optional)"
            value={deadline}
            onChange={(newValue) => setDeadline(newValue)}
            renderInput={(params) => <TextField {...params} margin="dense" fullWidth variant="outlined" />}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Add Event
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEventDialog;