// HomePage/style.js

const styles = {
  outerBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    px: 2,
    padding: '1rem'
  },
  wrapperBox: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 3,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 1200,
  },
  cardBox: (color) => ({
    backgroundColor: color,
    color: '#fff',
    flex: '1 1 300px',
    minWidth: 280,
    maxWidth: 380,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    boxShadow: 4,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#115293',
      transform: 'scale(1.02)',
    },
  }),
};

export default styles;
