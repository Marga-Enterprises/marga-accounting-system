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
    overflowX: 'auto', // ✅ Enable horizontal scroll for small screens
    boxShadow: 2,
    width: '100%',
    '@media (max-width: 600px)': {
      boxShadow: 'none', // Optional: cleaner look on mobile
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

  pagination: {
    mt: 3,
    display: 'flex',
    justifyContent: 'center',
  },
};

export default styles;
