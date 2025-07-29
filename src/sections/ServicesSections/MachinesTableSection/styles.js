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
    borderRadius: 2,
    overflowX: 'auto', // Enable horizontal scroll on small screens
    boxShadow: 2,
    width: '100%',
    '@media (max-width: 600px)': {
      boxShadow: 'none', // Cleaner UI on mobile
    },
  },

  tableHeadCell: {
    fontWeight: 'bold',
    backgroundColor: '#f4f6f8',
    fontSize: {
      xs: '12px', // Mobile
      sm: '13px', // Tablet
      md: '14px', // Desktop
    },
  },

  pagination: {
    mt: 3,
    display: 'flex',
    justifyContent: 'center',
  },
};

export default styles;
