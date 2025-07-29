const styles = {
  modalWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  },
  title: {
    mb: 2,
    fontWeight: 600,
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 2,
  },
  formField: {
    flex: "1 1 calc(50% - 8px)",
    minWidth: "calc(50% - 8px)",
  },
  fullWidthField: {
    flex: "1 1 100%",
  },
  buttonGroup: {
    mt: 3,
  },
};

export default styles;
