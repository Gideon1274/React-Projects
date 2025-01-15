import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Snackbar,
  Autocomplete,
  Fade,
  CircularProgress,
} from "@mui/material";
import { keyframes } from "@mui/system";


const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(144, 202, 249, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(144, 202, 249, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(144, 202, 249, 0);
  }
`;

const colorTransition = keyframes`
  0% { background-color: #121212; }
  50% { background-color: #1c1c1c; }
  100% { background-color: #121212; }
`;

const routeHighlight = keyframes`
  0% { opacity: 0.5; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
`;

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    primary: {
      main: "#90CAF9",
    },
    secondary: {
      main: "#F48FB1",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0BEC5",
    },
  },
});

const routePlaces = [
  "Alpha",
  "Bravo",
  "Charlie",
  "Delta",
  "Echo",
  "Foxtrot",
  "Golf",
  "Hotel",
  "India",
  "Juliet",
  "Kilo",
  "Lima",
  "Mike",
  "November",
  "Oscar",
  "Papa",
  "Quebec",
  "Romeo",
];

const jeepCodeRoute = {
  "01A": [0, 1, 2, 4, 6],
  "02B": [0, 3, 4, 5, 6],
  "03C": [2, 3, 5, 7, 8],
  "04A": [2, 3, 4, 5, 6],
  "04D": [2, 4, 5, 6, 8],
  "06B": [3, 7, 9, 10, 11],
  "06D": [3, 5, 6, 8, 10],
  "10C": [5, 6, 7, 8, 9],
  "10H": [5, 7, 9, 11, 13],
  "11A": [5, 6, 10, 12, 13],
  "11B": [5, 6, 11, 14, 15],
  "20A": [8, 2, 13, 15, 17],
  "20C": [8, 10, 11, 12, 17],
  "42C": [9, 10, 11, 12, 14],
  "42D": [9, 13, 14, 16, 17],
};

const colorPalette = [
  "#FF5733",
  "#33B5E5",
  "#FFEB3B",
  "#8BC34A",
  "#9C27B0",
  "#FF9800",
  "#03A9F4",
  "#E91E63",
  "#4CAF50",
  "#FFC107",
  "#673AB7",
  "#F44336",
  "#3F51B5",
  "#00BCD4",
  "#CDDC39",
];

const jeepCodesList = Object.keys(jeepCodeRoute);

const JeepCodes = () => {
  const [input, setInput] = useState("");
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateInput = (input) => {
    const regex = /^(\d{2}[A-Z])(,\d{2}[A-Z])*$/;
    return regex.test(input);
  };

  const processJeepCodes = (input) => {
    const jeepCodes = input.split(",");
    const newRoutes = jeepCodes.map((code) => ({
      code,
      places: jeepCodeRoute[code]
        ? jeepCodeRoute[code].map((index) => routePlaces[index])
        : [],
    }));

    const commonPlaces = {};
    newRoutes.forEach((route, i) => {
      route.places.forEach((place) => {
        if (!commonPlaces[place]) commonPlaces[place] = new Set();
        commonPlaces[place].add(i);
      });
    });

    let colorIndex = 0;
    Object.entries(commonPlaces).forEach(([place, routeIndices]) => {
      if (routeIndices.size > 1) {
        commonPlaces[place] = {
          routes: Array.from(routeIndices),
          color: colorPalette[colorIndex % colorPalette.length],
        };
        colorIndex++;
      } else {
        delete commonPlaces[place];
      }
    });

    newRoutes.forEach((route) => {
      route.places = route.places.map((place) => ({
        name: place,
        color: commonPlaces[place] ? commonPlaces[place].color : null,
      }));
    });

    return newRoutes;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (validateInput(input)) {
        const jeepCodes = input.split(",");
        const invalidCodes = jeepCodes.filter((code) => !jeepCodeRoute[code]);

        if (invalidCodes.length > 0) {
          setError(
            `Invalid code(s) entered: ${invalidCodes.join(
              ", "
            )}. Please enter valid Jeep Codes from the list.`
          );
          setRoutes([]);
        } else {
          setError("");
          setRoutes(processJeepCodes(input));
          setSnackbarOpen(true);
        }
      } else {
        setError(
          'Invalid input. Please enter Jeep Codes in the format "01A" or "01A,03C,06B".'
        );
        setRoutes([]);
      }
      setLoading(false);
    }, 1000);
  };

  const handleClear = () => {
    setInput("");
    setRoutes([]);
    setError("");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ animation: `${colorTransition} 10s infinite` }}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Jeep Code Route Finder
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Autocomplete
              multiple
              options={jeepCodesList}
              getOptionLabel={(option) => option}
              onChange={(event, value) => setInput(value.join(","))}
              value={input.split(",").filter(Boolean)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Enter Jeep Code(s)"
                  placeholder=" "
                  margin="normal"
                  variant="outlined"
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                animation: `${pulse} 2s infinite`,
              }}
            >
              Show Routes
            </Button>
            <Button fullWidth variant="outlined" color="secondary" onClick={handleClear}>
              Clear Routes
            </Button>
          </Box>

          {loading && <CircularProgress sx={{ mt: 2, display: "block", margin: "auto" }} />}

          {error && (
            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
              {error}
            </Alert>
          )}

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={4000}
            onClose={handleSnackbarClose}
            message="Routes calculated successfully!"
          />

          {routes.length > 0 && (
            <Fade in={routes.length > 0}>
              <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Jeep Code</TableCell>
                      <TableCell>Route</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {routes.map((route, index) => (
                      <TableRow key={index} sx={{ animation: `${routeHighlight} 0.5s ease-in-out` }}>
                        <TableCell>{route.code}</TableCell>
                        <TableCell>
                          {route.places.map((place, placeIndex) => (
                            <React.Fragment key={placeIndex}>
                              <Typography
                                component="span"
                                sx={{
                                  color: place.color || "inherit",
                                  fontWeight: place.color ? "bold" : "regular",
                                }}
                              >
                                {place.name}
                              </Typography>
                              {placeIndex < route.places.length - 1 && (
                                <Typography component="span" sx={{ mx: 0.5 }}>
                                  &lt;-&gt;
                                </Typography>
                              )}
                            </React.Fragment>
                          ))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Fade>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default JeepCodes;
