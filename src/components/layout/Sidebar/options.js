import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PrintIcon from '@mui/icons-material/Print';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BuildIcon from '@mui/icons-material/Build';
import PaymentsIcon from '@mui/icons-material/Payments'; 

const options = [
  { label: 'Home', icon: HomeIcon, path: '/' },
  { label: 'Clients', icon: PeopleIcon, path: '/clients' },
  { label: 'Collections', icon: PaymentsIcon, path: '/collections' },
  { label: 'Print Invoice', icon: PrintIcon, path: '/print-invoice' },
  { label: 'Billing', icon: ReceiptIcon, path: '/billings' },
  { label: 'Services', icon: BuildIcon, path: '/services' },
];

export default options;
