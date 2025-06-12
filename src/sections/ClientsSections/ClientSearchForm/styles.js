const styles = {
  root: {
    p: { xs: 2, sm: 3 },
  },

  header: {
    mb: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: { xs: 'column', sm: 'row' },
  },

  tableContainer: {
    mb: 2,
    boxShadow: 3,
    borderRadius: 2,
  },

  tableHeadCell: {
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
  },

  pagination: {
    display: 'flex',
    justifyContent: 'center',
    mt: 2,
  },

  searchForm: {
    mb: 3,
    display: 'flex',
    justifyContent: 'center',
  },

  searchStack: {
    marginTop: '1rem',
    width: '100%',
    maxWidth: 600,
  },

  searchInput: {
    flexGrow: 1,
    maxWidth: 400,
  },

  searchButton: {
    minWidth: 90,
  },
};

export default styles;
