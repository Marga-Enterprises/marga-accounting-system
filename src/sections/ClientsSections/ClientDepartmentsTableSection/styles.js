const styles = {
  root: {
    p: { xs: 2, sm: 3 }, // Responsive padding
  },

  header: {
    direction: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
  },

  tableContainer: {
    border: '1px solid #e0e0e0', // Subtle border
    borderRadius: 2,
    overflow: 'hidden',
    boxShadow: 2,
    width: '100%',
    backgroundColor: '#fff',
    '@media (max-width: 600px)': {
      boxShadow: 'none', // Clean mobile look
    },
  },

  tableHeadCell: {
    fontWeight: 'bold',
    backgroundColor: '#f4f6f8',
    fontSize: {
      xs: 12,
      sm: 13,
      md: 14,
    },
    borderBottom: '1px solid #ddd',
  },

  selectStatus: {
    minWidth: 120,
    textTransform: 'capitalize',
    fontSize: {
      xs: 12,
      sm: 13,
      md: 14,
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
