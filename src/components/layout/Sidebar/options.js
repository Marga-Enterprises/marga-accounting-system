// pages/HomePage/options.js
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PrintIcon from '@mui/icons-material/Print';
import ReceiptIcon from '@mui/icons-material/Receipt'; // 📄 For billing

const options = [
  { label: 'Home', icon: HomeIcon, path: '/' },
  { label: 'Clients', icon: PeopleIcon, path: '/clients' },
  { label: 'Print Invoice', icon: PrintIcon, path: '/print-invoice' },
  { label: 'Billing', icon: ReceiptIcon, path: '/billings' }, // ✅ New route
];

export default options;
