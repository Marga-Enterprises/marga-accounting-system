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
    overflowX: 'auto',
    border: '1px solid #e0e0e0',
    '@media (max-width: 600px)': {
      boxShadow: 'none',
    },
  },

  tableHeadCell: {
    fontWeight: 'bold',
    backgroundColor: '#f4f6f8',
    border: '1px solid #e0e0e0',
    fontSize: {
      xs: '11px',
      sm: '12px',
      md: '13px',
    },
    whiteSpace: 'nowrap',
  },

  tableBodyCell: {
    fontSize: {
      xs: '11px',
      sm: '12px',
      md: '13px',
    },
    border: '1px solid #e0e0e0',
    whiteSpace: 'nowrap',
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
