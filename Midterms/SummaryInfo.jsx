import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

export default function SummaryInfo() {
    let navigate = useNavigate();

    // Load saved data from localStorage
    const personalInfo = JSON.parse(localStorage.getItem('personalInfoData')) || {}; 
    const educationData = JSON.parse(localStorage.getItem('formData')) || {}; 
    const skillsData = JSON.parse(localStorage.getItem('skillsData')) || {};

    return (
        <>
            <Grid container spacing={3} sx={{ textAlign: 'left' }}>
                <FormGrid item xs={12}>
                    <h2>Personal Information</h2>
                </FormGrid>
                <FormGrid item xs={12}>
                    <Typography variant="body1">First Name: {personalInfo.firstName || 'N/A'}</Typography>
                    <Typography variant="body1">Last Name: {personalInfo.lastName || 'N/A'}</Typography>
                    <Typography variant="body1">Gender: {personalInfo.gender || 'N/A'}</Typography>
                    <Typography variant="body1">Birthday: {personalInfo.birthday || 'N/A'}</Typography>
                    <Typography variant="body1">Address: {personalInfo.address || 'N/A'}</Typography>
                    <Typography variant="body1">City: {personalInfo.city || 'N/A'}</Typography>
                    <Typography variant="body1">Province: {personalInfo.province || 'N/A'}</Typography>
                    <Typography variant="body1">Zip: {personalInfo.zip || 'N/A'}</Typography>
                    <Typography variant="body1">Country: {personalInfo.country || 'N/A'}</Typography>
                </FormGrid>

                <FormGrid item xs={12}>
                    <h2>Educational Background</h2>
                </FormGrid>
                <FormGrid item xs={12}>
                    <Typography variant="body1">Elementary School: {educationData.elementary || 'N/A'}</Typography>
                    <Typography variant="body1">Elementary Address: {educationData.elemAddress || 'N/A'}</Typography>
                    <Typography variant="body1">High School: {educationData.highSchool || 'N/A'}</Typography>
                    <Typography variant="body1">High School Address: {educationData.hsAddress || 'N/A'}</Typography>
                    <Typography variant="body1">College: {educationData.college || 'N/A'}</Typography>
                    <Typography variant="body1">College Address: {educationData.collegeAddress || 'N/A'}</Typography>
                </FormGrid>

                <FormGrid item xs={12}>
                    <h2>Skills and Trainings</h2>
                </FormGrid>
                <FormGrid item xs={12}>
                    <Typography variant="body1">Skill 1: {skillsData.skill1 || 'N/A'}</Typography>
                    <Typography variant="body1">Skill 2: {skillsData.skill2 || 'N/A'}</Typography>
                    <Typography variant="body1">Skill 3: {skillsData.skill3 || 'N/A'}</Typography>
                    <Typography variant="body1">Training 1: {skillsData.training1 || 'N/A'}</Typography>
                    <Typography variant="body1">Training 2: {skillsData.training2 || 'N/A'}</Typography>
                    <Typography variant="body1">Training 3: {skillsData.training3 || 'N/A'}</Typography>
                </FormGrid>
            </Grid>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 1,
                    mt: 4,
                }}
            >
                <Button
                    variant="outlined"
                    onClick={() => navigate(-1)} // Navigate to the previous page
                >
                    Previous
                </Button>
            </Box>
        </>
    );
}
