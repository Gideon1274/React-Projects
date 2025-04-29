import React, { useState, useEffect } from 'react';
 import { Box, Typography, Button, Modal, TextField, IconButton, Tooltip, Fade } from '@mui/material';
 import { styled } from '@mui/material/styles';
 import FullCalendar from '@fullcalendar/react';
 import dayGridPlugin from '@fullcalendar/daygrid';
 import timeGridPlugin from '@fullcalendar/timegrid';
 import interactionPlugin from '@fullcalendar/interaction';
 import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, Close as CloseIcon } from '@mui/icons-material';
 import { ThemeProvider } from '@mui/material/styles';
 import { useNavigate } from 'react-router-dom';
 
 // Styled Components
 const StyledModal = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '90%',
   maxWidth: 400,
   backgroundColor: theme.palette.background.paper,
   boxShadow: theme.shadows[5],
   padding: theme.spacing(3),
   borderRadius: theme.shape.borderRadius,
   outline: 'none',
 }));
 
 const Calendar = ({ theme }) => {
   const navigate = useNavigate();
   const [events, setEvents] = useState([
     { id: '1', title: 'Math Study Group', start: new Date().toISOString().split('T')[0] + 'T15:00:00', end: new Date().toISOString().split('T')[0] + 'T16:30:00' },
     { id: '2', title: 'Project Deadline', start: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T23:59:00' },
   ]);
   const [openModal, setOpenModal] = useState(false);
   const [selectedDate, setSelectedDate] = useState(null);
   const [eventTitle, setEventTitle] = useState('');
   const [eventStart, setEventStart] = useState('');
   const [eventEnd, setEventEnd] = useState('');
   const [editingEvent, setEditingEvent] = useState(null);
 
   // Handle date click to open modal for adding event
   const handleDateClick = (info) => {
     setSelectedDate(info.dateStr);
     setEventStart(info.dateStr + 'T09:00'); // Default start time
     setEventEnd(info.dateStr + 'T10:00'); // Default end time
     setEventTitle('');
     setEditingEvent(null);
     setOpenModal(true);
   };
 
   // Handle event click to edit or delete
   const handleEventClick = (info) => {
     const event = events.find((e) => e.id === info.event.id);
     setEditingEvent(event);
     setEventTitle(event.title);
     setEventStart(event.start);
     setEventEnd(event.end || event.start);
     setOpenModal(true);
   };
 
   // Handle saving event
   const handleSaveEvento = () => {
     if (!eventTitle.trim()) {
       alert('Event title is required');
       return;
     }
     const newEvent = {
       id: editingEvent ? editingEvent.id : Date.now().toString(),
       title: eventTitle,
       start: eventStart,
       end: eventEnd || eventStart,
     };
 
     if (editingEvent) {
       setEvents(events.map((e) => (e.id === editingEvent.id ? newEvent : e)));
     } else {
       setEvents([...events, newEvent]);
     }
     setOpenModal(false);
     setEventTitle('');
     setEventStart('');
     setEventEnd('');
     setEditingEvent(null);
   };
 
   // Handle deleting event
   const handleDeleteEvent = () => {
     if (editingEvent) {
       setEvents(events.filter((e) => e.id !== editingEvent.id));
       setOpenModal(false);
       setEventTitle('');
       setEventStart('');
       setEventEnd('');
       setEditingEvent(null);
     }
   };
 
   // Handle modal close
   const handleCloseModal = () => {
     setOpenModal(false);
     setEventTitle('');
     setEventStart('');
     setEventEnd('');
     setEditingEvent(null);
   };
 
   return (
     <ThemeProvider theme={theme}>
       <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
           <Typography variant="h4" sx={{ fontWeight: 600, color: 'text.primary' }}>
             Calendar
           </Typography>
           <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenModal(true)}>
             Add Event
           </Button>
         </Box>
 
         <Fade in={true} timeout={500}>
           <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 2 }}>
             <FullCalendar
               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
               initialView="dayGridMonth"
               events={events}
               dateClick={handleDateClick}
               eventClick={handleEventClick}
               headerToolbar={{
                 left: 'prev,next today',
                 center: 'title',
                 right: 'dayGridMonth,timeGridWeek,timeGridDay',
               }}
               eventContent={(eventInfo) => (
                 <Tooltip title={eventInfo.event.title}>
                   <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 1, borderRadius: 1, fontSize: '0.8rem' }}>
                     {eventInfo.event.title}
                   </Box>
                 </Tooltip>
               )}
               height="auto"
               eventColor="transparent"
               eventTextColor="white"
             />
           </Box>
         </Fade>
 
         {/* Event Modal */}
         <Modal open={openModal} onClose={handleCloseModal}>
           <StyledModal>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
               <Typography variant="h6" sx={{ fontWeight: 600 }}>
                 {editingEvent ? 'Edit Event' : 'Add Event'}
               </Typography>
               <IconButton onClick={handleCloseModal}>
                 <CloseIcon />
               </IconButton>
             </Box>
             <TextField
               fullWidth
               label="Event Title"
               value={eventTitle}
               onChange={(e) => setEventTitle(e.target.value)}
               sx={{ mb: 2 }}
               size="small"
             />
             <TextField
               fullWidth
               label="Start Time"
               type="datetime-local"
               value={eventStart}
               onChange={(e) => setEventStart(e.target.value)}
               sx={{ mb: 2 }}
               size="small"
               InputLabelProps={{ shrink: true }}
             />
             <TextField
               fullWidth
               label="End Time"
               type="datetime-local"
               value={eventEnd}
               onChange={(e) => setEventEnd(e.target.value)}
               sx={{ mb: 2 }}
               size="small"
               InputLabelProps={{ shrink: true }}
             />
             <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
               {editingEvent && (
                 <Button
                   variant="outlined"
                   color="error"
                   startIcon={<DeleteIcon />}
                   onClick={handleDeleteEvent}
                 >
                   Delete
                 </Button>
               )}
               <Box>
                 <Button variant="outlined" onClick={handleCloseModal} sx={{ mr: 1 }}>
                   Cancel
                 </Button>
                 <Button variant="contained" onClick={handleSaveEvento}>
                   {editingEvent ? 'Save' : 'Add'}
                 </Button>
               </Box>
             </Box>
           </StyledModal>
         </Modal>
       </Box>
     </ThemeProvider>
   );
 };
 
 export default Calendar;
