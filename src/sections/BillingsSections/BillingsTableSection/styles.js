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
    overflow: 'hidden',
    boxShadow: 2,
  },

  tableHeadCell: {
    fontWeight: 'bold',
    backgroundColor: '#f4f6f8',
    fontSize: 14,
  },

  selectStatus: {
    minWidth: 120,
    textTransform: 'capitalize',
  },

  pagination: {
    mt: 3,
    display: 'flex',
    justifyContent: 'center',
  },
  selectStatus: {
    minWidth: 120,
    textTransform: 'capitalize',
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

  totalBillingsBox: {
    mb: 2,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 1,
  },

  totalBillingsLabel: {
    fontWeight: 500,
    color: 'text.secondary',
  },

  totalBillingsValue: {
    fontWeight: 'bold',
    color: 'success.main',
  },
};

export default styles;
