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
        backgroundColor: '#fff',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo on the left */}
        <Box
          component="img"
          src="https://cdn-ildgkmn.nitrocdn.com/lZCGdHsfFAURcutatXSuaOPaUFbGAGTa/assets/images/optimized/marga.biz/wp-content/uploads/2024/04/Marga-Logo-M.png"
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
