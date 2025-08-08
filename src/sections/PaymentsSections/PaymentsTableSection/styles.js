const styles = {
  root: {
    p: { xs: 2, sm: 3 },
  },

  tableContainer: {
    borderRadius: 2,
    overflowX: 'auto',
    boxShadow: 2,
    border: '1px solid #e0e0e0', // subtle outer border
    width: '100%',
    '@media (max-width: 600px)': {
      boxShadow: 'none',
    },
  },

  tableHeadCell: {
    fontWeight: 'bold',
    backgroundColor: '#f9fafb',
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
  },

  pagination: {
    mt: 3,
    display: 'flex',
    justifyContent: 'center',
  },

  exportButtonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    mb: 2,
  },

  exportButton: {
    fontWeight: 'bold',
    textTransform: 'none',
  },

  actionBox: {
    display: 'flex',
    height: '100%',
  }
};

export default styles;
