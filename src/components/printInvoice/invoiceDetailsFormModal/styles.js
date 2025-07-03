const styles = {
  modalWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700, // ⬅️ wider to fit 2 columns
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
    flexWrap: "wrap",     // ⬅️ Allow wrapping
    flexDirection: "row", // ⬅️ Row layout
    gap: 2,
  },
  formField: {
    flex: "1 1 calc(50% - 8px)", // Two columns with spacing
    minWidth: "calc(50% - 8px)",
  },
  fullWidthField: {
    flex: "1 1 100%", // Span full width
  },
  buttonGroup: {
    mt: 3,
  },
};

export default styles;
