const styles = {
  root: {
    p: { xs: 2, sm: 3 },
  },

  header: {
    direction: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
  },

  tableContainer: {
    borderRadius: 2,
    overflowX: 'auto',
    boxShadow: 2,
    width: '100%',
    '@media (max-width: 600px)': {
      boxShadow: 'none',
    },
  },

  tableHeadCell: {
    fontWeight: 'bold',
    backgroundColor: '#f4f6f8',
    fontSize: {
      xs: '12px',  // Mobile
      sm: '13px',  // Tablet
      md: '14px',  // Desktop
    },
  },

  selectStatus: {
    minWidth: 120,
    textTransform: 'capitalize',
    fontSize: {
      xs: '12px',
      sm: '13px',
      md: '14px',
    },
  },

  pagination: {
    mt: 3,
    display: 'flex',
    justifyContent: 'center',
  },

  totalBillingsBox: {
    mb: 2,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 1,
  },

  totalBillingsLabel: {
    fontWeight: 500,
    color: 'text.secondary',
    fontSize: {
      xs: '12px',
      sm: '13px',
      md: '14px',
    },
  },

  totalBillingsValue: {
    fontWeight: 'bold',
    color: 'success.main',
    fontSize: {
      xs: '13px',
      sm: '15px',
      md: '16px',
    },
  },
};

export default styles;
