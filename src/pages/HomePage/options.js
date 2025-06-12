// pages/HomePage/options.js
import GroupIcon from '@mui/icons-material/Group';
import PaymentsIcon from '@mui/icons-material/Payments';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const options = [
  {
    label: 'Clients',
    icon: GroupIcon, // just the component reference
    color: '#1976d2',
    path: '/clients',
  },
  {
    label: 'Collection',
    icon: PaymentsIcon,
    color: '#1976d2',
    path: '#',
  },
  {
    label: 'Billing',
    icon: ReceiptLongIcon,
    color: '#1976d2',
    path: '#',
  },
];

export default options;
