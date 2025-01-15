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

export default function SkillsAndTrainings() {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    skill1: '',
    skill2: '',
    skill3: '',
    training1: '',
    training2: '',
    training3: '',
  });
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();

  
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('skillsData'));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

 
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  
  const handleNext = () => {
    if (validateForm()) {
      localStorage.setItem('skillsData', JSON.stringify(formData)); 
      navigate("/summaryinfo"); 
    } else {
      alert('Please fill out all required fields.');
    }
  };

  return (
    <>
      <Grid container spacing={3} sx={{ textAlign: 'left' }}>
        <FormGrid size={{ xs: 12 }}>
          <h1>Skills and Trainings</h1>
        </FormGrid>

        <FormGrid size={{ xs: 12, md: 12 }}>
          <h2>Skills (Max of 3)</h2>
        </FormGrid>
        {['skill1', 'skill2', 'skill3'].map((skill, index) => (
          <FormGrid key={skill} size={{ xs: 12 }}>
            <FormLabel htmlFor={skill} required>
              Skill {index + 1}
            </FormLabel>
            <OutlinedInput
              id={skill}
              name={skill}
              type="text"
              placeholder={`Skill ${index + 1}`}
              required
              size="small"
              value={formData[skill]}
              onChange={handleInputChange}
              error={!!errors[skill]}
            />
            {errors[skill] && <span style={{ color: 'red' }}>{errors[skill]}</span>}
          </FormGrid>
        ))}

        <FormGrid size={{ xs: 12, md: 12 }}>
          <h2>Trainings (Max of 3)</h2>
        </FormGrid>
        {['training1', 'training2', 'training3'].map((training, index) => (
          <FormGrid key={training} size={{ xs: 12 }}>
            <FormLabel htmlFor={training} required>
              Training {index + 1}
            </FormLabel>
            <OutlinedInput
              id={training}
              name={training}
              type="text"
              placeholder={`Training ${index + 1}`}
              required
              size="small"
              value={formData[training]}
              onChange={handleInputChange}
              error={!!errors[training]}
            />
            {errors[training] && <span style={{ color: 'red' }}>{errors[training]}</span>}
          </FormGrid>
        ))}
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
              navigate("/educbg");
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