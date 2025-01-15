import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

const steps = ['Shipping address', 'Payment details', 'Review your order'];

export default function PersonalInformation() {
    let navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);

    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        birthday: '',
        address: '',
        city: '',
        province: '',
        zip: '',
        country: '',
    });

    
    const [errors, setErrors] = useState({});

    
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('personalInfoData'));
        if (savedData) {
            setFormData(savedData); 
        }
    }, []);

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); 
    };

    
    const handleGenderChange = (e) => {
        setFormData((prevData) => ({ ...prevData, gender: e.target.value }));
        setErrors((prevErrors) => ({ ...prevErrors, gender: '' })); 
    };

    const validateForm = () => {
        let newErrors = {};
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
            localStorage.setItem('personalInfoData', JSON.stringify(formData)); 
            navigate("/educbg"); 
        }
    };

    return (
        <>
            <Grid container spacing={3} sx={{ textAlign: 'left' }}>
                <FormGrid size={{ xs: 12 }}>
                    <h1>Personal Information</h1>
                </FormGrid>

                {/* First Name */}
                <FormGrid size={{ xs: 12, md: 6 }}>
                    <FormLabel htmlFor="first-name" required>
                        First name
                    </FormLabel>
                    <OutlinedInput
                        id="first-name"
                        name="firstName"
                        type="text"
                        placeholder="Eugene"
                        required
                        size="small"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                    {errors.firstName && (
                        <Typography color="error" sx={{ fontSize: '0.75rem' }}>
                            {errors.firstName}
                        </Typography>
                    )}
                </FormGrid>

                {/* Last Name */}
                <FormGrid size={{ xs: 12, md: 6 }}>
                    <FormLabel htmlFor="last-name" required>
                        Last name
                    </FormLabel>
                    <OutlinedInput
                        id="last-name"
                        name="lastName"
                        type="text"
                        placeholder="Busico"
                        required
                        size="small"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                    {errors.lastName && (
                        <Typography color="error" sx={{ fontSize: '0.75rem' }}>
                            {errors.lastName}
                        </Typography>
                    )}
                </FormGrid>

                {/* Gender */}
                <FormGrid size={{ xs: 12, md: 6 }}>
                    <FormLabel htmlFor="gender" required>
                        Gender
                    </FormLabel>
                    <RadioGroup
                        sx={{ marginLeft: '2rem' }}
                        row
                        aria-labelledby="gender-label"
                        name="gender"
                        value={formData.gender}
                        onChange={handleGenderChange}
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                    {errors.gender && (
                        <Typography color="error" sx={{ fontSize: '0.75rem' }}>
                            {errors.gender}
                        </Typography>
                    )}
                </FormGrid>

                {/* Birthday */}
                <FormGrid size={{ xs: 12, md: 6 }}>
                    <FormLabel htmlFor="birthday" required>
                        Birthday
                    </FormLabel>
                    <OutlinedInput
                        id="birthday"
                        name="birthday"
                        type="text"
                        placeholder="mm/dd/yyyy"
                        required
                        size="small"
                        value={formData.birthday}
                        onChange={handleInputChange}
                    />
                    {errors.birthday && (
                        <Typography color="error" sx={{ fontSize: '0.75rem' }}>
                            {errors.birthday}
                        </Typography>
                    )}
                </FormGrid>

                {/* Address */}
                <FormGrid size={{ xs: 12 }}>
                    <FormLabel htmlFor="address" required>
                        Address
                    </FormLabel>
                    <OutlinedInput
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Street/Sitio and Number"
                        required
                        size="small"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                    {errors.address && (
                        <Typography color="error" sx={{ fontSize: '0.75rem' }}>
                            {errors.address}
                        </Typography>
                    )}
                </FormGrid>

                {/* City */}
                <FormGrid size={{ xs: 6 }}>
                    <FormLabel htmlFor="city" required>
                        City
                    </FormLabel>
                    <OutlinedInput
                        id="city"
                        name="city"
                        type="text"
                        placeholder="Cebu"
                        required
                        size="small"
                        value={formData.city}
                        onChange={handleInputChange}
                    />
                    {errors.city && (
                        <Typography color="error" sx={{ fontSize: '0.75rem' }}>
                            {errors.city}
                        </Typography>
                    )}
                </FormGrid>

                {/* Province */}
                <FormGrid size={{ xs: 6 }}>
                    <FormLabel htmlFor="province" required>
                        Province
                    </FormLabel>
                    <OutlinedInput
                        id="province"
                        name="province"
                        type="text"
                        placeholder="Cebu"
                        required
                        size="small"
                        value={formData.province}
                        onChange={handleInputChange}
                    />
                    {errors.province && (
                        <Typography color="error" sx={{ fontSize: '0.75rem' }}>
                            {errors.province}
                        </Typography>
                    )}
                </FormGrid>

                {/* Zip */}
                <FormGrid size={{ xs: 6 }}>
                    <FormLabel htmlFor="zip" required>
                        Zip / Postal code
                    </FormLabel>
                    <OutlinedInput
                        id="zip"
                        name="zip"
                        type="text"
                        placeholder="6000"
                        required
                        size="small"
                        value={formData.zip}
                        onChange={handleInputChange}
                    />
                    {errors.zip && (
                        <Typography color="error" sx={{ fontSize: '0.75rem' }}>
                            {errors.zip}
                        </Typography>
                    )}
                </FormGrid>

                {/* Country */}
                <FormGrid size={{ xs: 6 }}>
                    <FormLabel htmlFor="country" required>
                        Country
                    </FormLabel>
                    <OutlinedInput
                        id="country"
                        name="country"
                        type="text"
                        placeholder="Philippines"
                        required
                        size="small"
                        value={formData.country}
                        onChange={handleInputChange}
                    />
                    {errors.country && (
                        <Typography color="error" sx={{ fontSize: '0.75rem' }}>
                            {errors.country}
                        </Typography>
                    )}
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