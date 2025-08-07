const styles = {
  tableContainer: {
    mb: 4,
    p: { xs: 1, sm: 2 },
    width: '100%',
    overflowX: 'auto',
    border: '1px solid #e0e0e0',
    borderRadius: 2,
    boxShadow: 2,
    backgroundColor: '#fff',
    '@media (max-width: 600px)': {
      boxShadow: 'none',
    },
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    mb: { xs: 1, sm: 2 },
    gap: { xs: 1, sm: 2 },
  },
};

export default styles;
