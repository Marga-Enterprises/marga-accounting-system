// mui imports
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Page = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        bgcolor: '#f5f5f5',
        px: 2,
      }}
    >
      <Typography variant="h1" color="primary" fontWeight="bold">
        404
      </Typography>
      <Typography variant="h5" mt={1}>
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" mt={1} mb={3}>
        The page you’re looking for doesn’t exist or has been moved.
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          component={RouterLink}
          to="/"
          color="primary"
        >
          Go Home
        </Button>
        <Button
          variant="outlined"
          component={RouterLink}
          to="/login"
          color="primary"
        >
          Login
        </Button>
      </Stack>
    </Box>
  );
};

export default Page;
