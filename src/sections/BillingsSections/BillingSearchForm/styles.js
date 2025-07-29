const styles = {
  searchForm: {
    width: '100%',
  },

  searchStack: {
    alignItems: 'stretch',
    flexWrap: 'wrap',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
    },
  },

  searchInput: {
    flexGrow: 1,
    minWidth: { xs: '100%', sm: '300px' },
  },

  searchButton: {
    minWidth: { xs: '100%', sm: 'auto' },
  },
};

export default styles;
