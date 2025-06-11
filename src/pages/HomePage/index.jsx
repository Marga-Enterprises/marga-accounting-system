
// mui
import { Box, Typography } from '@mui/material';

// react router dom
import { Link } from 'react-router-dom';

// options
import options from './options';

// mui stylings
import styles from './styles';

const Page = () => (
  <Box sx={styles.outerBox}>
    <Box sx={styles.wrapperBox}>
      {options.map((option, index) => {
        const Icon = option.icon;
        return (
          <Box
            key={index}
            component={Link}
            to={option.path}
            sx={styles.cardBox(option.color)}
          >
            <Icon sx={{ fontSize: 60 }} />
            <Typography variant="h6" mt={2}>
              {option.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  </Box>
);

export default Page;
