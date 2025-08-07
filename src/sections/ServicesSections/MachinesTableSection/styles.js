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
    border: '1px solid #e0e0e0', // Add subtle border
    borderRadius: 2,
    overflowX: 'auto', // Enable horizontal scroll on small screens
    boxShadow: 2,
    width: '100%',
    backgroundColor: '#fff',
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
    borderBottom: '1px solid #ddd', // Optional: separates header visually
  },

  pagination: {
    mt: 3,
    display: 'flex',
    justifyContent: 'center',
  },
};

export default styles;
