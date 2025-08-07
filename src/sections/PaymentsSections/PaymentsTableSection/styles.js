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
    whiteSpace: 'nowrap',
  },

  pagination: {
    mt: 3,
    display: 'flex',
    justifyContent: 'center',
  },

  totalCollectionsBox: {
    mb: 2,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 1,
  },

  totalCollectionsLabel: {
    fontWeight: 500,
    color: 'text.secondary',
    fontSize: {
      xs: '12px',
      sm: '13px',
      md: '14px',
    },
  },

  totalCollectionsValue: {
    fontWeight: 'bold',
    color: 'success.main',
    fontSize: {
      xs: '13px',
      sm: '15px',
      md: '16px',
    },
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
};

export default styles;
