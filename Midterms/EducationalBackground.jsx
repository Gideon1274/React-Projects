import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const steps = ['Shipping address', 'Payment details', 'Review your order'];

export default function EducationalBackground() {
  let navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);

  
  const [formData, setFormData] = useState({
    elementary: '',
    elemAddress: '',
    highSchool: '',
    hsAddress: '',
    college: '',
    collegeAddress: '',
  });

  
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
      setFormData(savedData);  
      console.log("Loaded data from localStorage:", savedData);
    }
  }, []);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  
  const handleNext = () => {
    if (validateForm()) {
      console.log("Saving data to localStorage before navigating:", formData);
      localStorage.setItem('formData', JSON.stringify(formData));  
      navigate("/skilltr");  
    } else {
      alert('Please fill out all required fields.');
    }
  };

  
  const validateForm = () => {
    return (
      formData.elementary &&
      formData.elemAddress &&
      formData.highSchool &&
      formData.hsAddress &&
      formData.college &&
      formData.collegeAddress
    );
  };

  return (
    <>
      <Grid container spacing={3} sx={{ textAlign: 'left' }}>
        <FormGrid size={{ xs: 12 }}>
          <h1>Educational Background</h1>
        </FormGrid>

        {}
        <FormGrid size={{ xs: 12, md: 12 }}>
          <h2>Elementary</h2>
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="elementary" required>
            School Name
          </FormLabel>
          <OutlinedInput
            id="elementary"
            name="elementary"
            type="text"
            placeholder="School Name"
            required
            size="small"
            value={formData.elementary}
            onChange={handleInputChange}
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="elemAddress" required>
            Address
          </FormLabel>
          <OutlinedInput
            id="elemAddress"
            name="elemAddress"
            type="text"
            placeholder="Address"
            required
            size="small"
            value={formData.elemAddress}
            onChange={handleInputChange}
          />
        </FormGrid>

        {/* High School Section */}
        <FormGrid size={{ xs: 12, md: 12 }}>
          <h2>High School</h2>
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="highSchool" required>
            School Name
          </FormLabel>
          <OutlinedInput
            id="highSchool"
            name="highSchool"
            type="text"
            placeholder="School Name"
            required
            size="small"
            value={formData.highSchool}
            onChange={handleInputChange}
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="hsAddress" required>
            Address
          </FormLabel>
          <OutlinedInput
            id="hsAddress"
            name="hsAddress"
            type="text"
            placeholder="Address"
            required
            size="small"
            value={formData.hsAddress}
            onChange={handleInputChange}
          />
        </FormGrid>

        {/* College Section */}
        <FormGrid size={{ xs: 12, md: 12 }}>
          <h2>College</h2>
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="college" required>
            School Name
          </FormLabel>
          <OutlinedInput
            id="college"
            name="college"
            type="text"
            placeholder="School Name"
            required
            size="small"
            value={formData.college}
            onChange={handleInputChange}
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="collegeAddress" required>
            Address
          </FormLabel>
          <OutlinedInput
            id="collegeAddress"
            name="collegeAddress"
            type="text"
            placeholder="Address"
            required
            size="small"
            value={formData.collegeAddress}
            onChange={handleInputChange}
          />
        </FormGrid>
      </Grid>

      <br />
      <br />
      <Box
        sx={[
          {
            display: 'flex',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            alignItems: 'end',
            flexGrow: 1,
            gap: 1,
            pb: { xs: 12, sm: 0 },
            mt: { xs: 2, sm: 0 },
            mb: '60px',
          },
          activeStep !== 0
            ? { justifyContent: 'space-between' }
            : { justifyContent: 'flex-end' },
        ]}
      >
        {activeStep !== 0 && (
          <Button
            variant="text"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
            onClick={() => {
              console.log("Navigating to previous page with data:", formData);
              navigate("/perinfo");  
            }}
          >
            Previous
          </Button>
        )}
        <Button
          variant="contained"
          sx={{ width: { xs: '50%' } }}
          onClick={handleNext}
        >
          {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
        </Button>
      </Box>
    </>
  );
}