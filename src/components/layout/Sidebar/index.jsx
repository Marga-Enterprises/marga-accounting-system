// mui imports
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';

// options
import options from './options';

// styles
import styles from './styles';

// mui icons
import LogoutIcon from '@mui/icons-material/Logout';

// react router dom
import { Link } from 'react-router-dom';

// redux imports
import { useDispatch } from 'react-redux';
import { marga } from '@redux/combineActions';

const Sidebar = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(marga.user.logoutAction());
    onClose();
    window.location.href = '/login';
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: styles.drawerPaper,
      }}
    >
      <List>
        {options.map((option, index) => {
          const Icon = option.icon;
          return (
            <ListItem key={index} disablePadding>
              <ListItemButton component={Link} to={option.path} onClick={onClose}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={option.label} />
              </ListItemButton>
            </ListItem>
          );
        })}

        <Divider sx={styles.divider} />

        {/* Logout Item */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
