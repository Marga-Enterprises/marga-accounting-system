const styles = {
  tableContainer: {
    mb: 4,
    p: { xs: 1, sm: 2 }, // Responsive padding: smaller on mobile
    width: '100%',
    overflowX: 'auto', // Enable horizontal scroll on small screens
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    mb: { xs: 1, sm: 2 }, // Responsive bottom margin
    gap: { xs: 1, sm: 2 }, // Optional: spacing between buttons if there are multiple
  },
};

export default styles;
