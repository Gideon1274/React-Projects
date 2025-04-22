import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Container,
  Fade,
  Slide,
  Avatar,
  Divider,
  Link as MuiLink,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Event as EventIcon,
  ListAlt as ListIcon,
  Timer as TimerIcon,
  Group as GroupIcon,
  BarChart as ProgressIcon,
  History as HistoryIcon,
  Link as LinkIcon,
  FormatQuote as QuoteIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(12, 4),
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius * 2,
  marginBottom: theme.spacing(6),
  boxShadow: theme.shadows[6],
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
    opacity: 0.5,
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[6],
  },
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  padding: theme.spacing(3),
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const Footer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: theme.spacing(8),
}));

const LandingPage = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <EventIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Event Calendar',
      description: 'Keep track of your study sessions, meetings, and deadlines with an integrated calendar.',
    },
    {
      icon: <ListIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'To-Do List',
      description: 'Organize your tasks with priorities and due dates for efficient planning.',
    },
    {
      icon: <TimerIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Pomodoro Timer',
      description: 'Boost productivity with focused study sessions using the Pomodoro technique.',
    },
    {
      icon: <ProgressIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Progress Tracker',
      description: 'Monitor your progress on assignments and projects with visual trackers.',
    },
    {
      icon: <GroupIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Collaboration',
      description: 'Collaborate with peers on group projects and share schedules seamlessly.',
    },
    {
      icon: <HistoryIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Recent Activity',
      description: 'Stay updated with your latest actions and completed tasks.',
    },
    {
      icon: <LinkIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Quick Links',
      description: 'Access your favorite tools like Google Drive and Notion with one click.',
    },
    {
      icon: <QuoteIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Motivational Quotes',
      description: 'Get inspired daily with motivational quotes to keep you going.',
    },
  ];

  const testimonials = [
    {
      name: 'Alex Johnson',
      role: 'Student',
      quote: 'Study Planner has transformed how I manage my study schedule. The Pomodoro Timer is a game-changer!',
      avatar: 'AJ',
    },
    {
      name: 'Sarah Lee',
      role: 'College Senior',
      quote: 'The collaboration feature makes group projects so much easier. Highly recommend!',
      avatar: 'SL',
    },
    {
      name: 'Michael Brown',
      role: 'Graduate Student',
      quote: 'I love the motivational quotes—they keep me inspired every day.',
      avatar: 'MB',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <HeroSection>
        <Slide direction="down" in={true} timeout={800}>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, mb: 2 }}>
            Your Ultimate Study Planner
          </Typography>
        </Slide>
        <Fade in={true} timeout={1200}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 400, opacity: 0.9 }}>
            Organize, Focus, and Succeed with Ease
          </Typography>
        </Fade>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              fontWeight: 600,
              px: 4,
              py: 1.5,
              '&:hover': { bgcolor: 'grey.100', transform: 'scale(1.05)', transition: 'transform 0.3s' },
            }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/login')}
            sx={{
              borderColor: 'white',
              color: 'white',
              fontWeight: 600,
              px: 4,
              py: 1.5,
              '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)', transform: 'scale(1.05)', transition: 'transform 0.3s' },
            }}
          >
            Log In
          </Button>
        </Box>
      </HeroSection>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Fade in={true} timeout={1000}>
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, color: 'text.primary' }}>
            Powerful Features to Boost Your Productivity
          </Typography>
        </Fade>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <Slide direction="up" in={true} timeout={500 + index * 200}>
                <FeatureCard>
                  <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Button
                      variant="text"
                      endIcon={<ArrowForwardIcon />}
                      sx={{ color: 'primary.main' }}
                      onClick={() => navigate('/register')}
                    >
                      Learn More
                    </Button>
                  </Box>
                </FeatureCard>
              </Slide>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Fade in={true} timeout={1000}>
            <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, color: 'text.primary' }}>
              What Our Users Say
            </Typography>
          </Fade>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={testimonial.name}>
                <Slide direction="up" in={true} timeout={500 + index * 200}>
                  <TestimonialCard>
                    <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2 }}>{testimonial.avatar}</Avatar>
                    <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2, color: 'text.primary' }}>
                      "{testimonial.quote}"
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </TestimonialCard>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Footer>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Study Planner
              </Typography>
              <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} All Rights Reserved
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'center' }, gap: 2 }}>
                <MuiLink href="#" color="text.secondary" underline="hover">
                  About
                </MuiLink>
                <MuiLink href="#" color="text.secondary" underline="hover">
                  Contact
                </MuiLink>
                <MuiLink href="#" color="text.secondary" underline="hover">
                  Privacy Policy
                </MuiLink>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <IconButton onClick={() => setDarkMode(!darkMode)} sx={{ bgcolor: 'background.default', '&:hover': { bgcolor: 'action.hover' } }}>
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </Footer>
    </Box>
  );
};

export default LandingPage;
