// pages/HomePage/options.js
import GroupIcon from '@mui/icons-material/Group';
import PaymentsIcon from '@mui/icons-material/Payments';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PrintIcon from '@mui/icons-material/Print';
import BuildIcon from '@mui/icons-material/Build'; // Icon for Services

const options = [
  {
    label: 'Clients',
    icon: GroupIcon,
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
    path: '/billings',
  },
  {
    label: 'Print Invoice',
    icon: PrintIcon,
    color: '#1976d2',
    path: '/print-invoice',
  },
  {
    label: 'Services',
    icon: BuildIcon,
    color: '#1976d2',
    path: '/services',
  },
];

export default options;
