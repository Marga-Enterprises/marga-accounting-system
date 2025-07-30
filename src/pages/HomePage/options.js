import GroupIcon from '@mui/icons-material/Group';
import PaymentsIcon from '@mui/icons-material/Payments';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PrintIcon from '@mui/icons-material/Print';
import BuildIcon from '@mui/icons-material/Build';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const options = [
  {
    label: 'Clients',
    icon: GroupIcon,
    color: '#1976d2',
    path: '/clients',
  },
  {
    label: 'Collections',
    icon: PaymentsIcon,
    color: '#1976d2',
    path: '/collections',
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
  {
    label: 'Payments',
    icon: AccountBalanceWalletIcon,
    color: '#1976d2',
    path: '/payments',
  },
];

export default options;
