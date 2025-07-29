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
    overflow: 'hidden',
    boxShadow: 2,
    width: '100%',
    overflowX: 'auto', // Optional: for scroll support
    '@media (max-width: 600px)': {
      boxShadow: 'none',
    },
  },

  tableHeadCell: {
    fontWeight: 'bold',
    backgroundColor: '#f4f6f8',
    fontSize: {
      xs: '12px',
      sm: '13px',
      md: '14px',
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

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
  },

  statusDotActive: {
    backgroundColor: 'success.main',
  },

  statusDotInactive: {
    backgroundColor: 'error.main',
  },
};

export default styles;
