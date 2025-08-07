const styles = {
  root: {
    p: { xs: 2, sm: 3 },
  },

  header: {
    direction: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // ✅ Add scroll support and mobile-friendly boxShadow
  tableContainer: {
    borderRadius: 2,
    overflowX: 'auto', // horizontal scroll on small screens
    boxShadow: 2,
    width: '100%',
    '@media (max-width: 600px)': {
      boxShadow: 'none',
    },
  },

  // ✅ Make table header text responsive
  tableHeadCell: {
    fontWeight: 'bold',
    backgroundColor: '#f4f6f8',
    fontSize: {
      xs: '12px',  // Mobile
      sm: '13px',  // Tablet
      md: '14px',  // Desktop
    },
  },

  pagination: {
    mt: 3,
    display: 'flex',
    justifyContent: 'center',
  },
};

export default styles;
