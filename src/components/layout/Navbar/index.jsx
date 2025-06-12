// mui imports
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';

// mui icons
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ onMenuClick }) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#f0f0f0',
        borderBottom: '1px solid rgb(199, 199, 199)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo on the left */}
        <Box
          component="img"
          src="https://wotg.sgp1.cdn.digitaloceanspaces.com/marga/images/Marga-Logo-M-removebg-preview.png"
          alt="Marga Logo"
          sx={{
            height: 60,
            objectFit: 'contain',
          }}
        />

        {/* Menu icon on the right */}
        <IconButton
          edge="end"
          onClick={onMenuClick}
          sx={{ color: '#1976d2' }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
