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
};

export default styles;
