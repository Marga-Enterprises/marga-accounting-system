// mui imports
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// styles
import notFoundStyles from './styles';

const Page = () => {
  return (
    <Box sx={notFoundStyles.root}>
      <Typography variant="h1" color="primary" sx={notFoundStyles.title}>
        404
      </Typography>
      <Typography variant="h5" sx={notFoundStyles.subtitle}>
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" sx={notFoundStyles.bodyText}>
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
